// Vercel serverless function: POST /api/story
// Generates a short Korean story for the handwriting tab.
// Env vars:
//   AI_PROVIDER        "anthropic" or "openai"            (required)
//   ANTHROPIC_API_KEY  required when AI_PROVIDER=anthropic
//   ANTHROPIC_MODEL    optional, default "claude-sonnet-5-5"
//   OPENAI_API_KEY     required when AI_PROVIDER=openai
//   OPENAI_MODEL       required when AI_PROVIDER=openai (exact model id from your OpenAI account)
//   DAILY_LIMIT_PER_IP optional, default 20
//   ALLOWED_ORIGIN     optional, e.g. "https://sheets.example.com" — blocks calls from other sites

const LEVELS = {
  1: '초등 1학년. 받침이 없거나 쉬운 받침(ㄴ, ㄹ, ㅁ, ㅇ)이 많은 쉬운 낱말 위주. 한 문장은 짧게(띄어쓰기 포함 6~12자). 겹받침, 어려운 한자어는 쓰지 마.',
  2: '초등 2학년. 일상적인 낱말, 받침 있는 낱말도 자연스럽게. 한 문장은 띄어쓰기 포함 8~16자.',
  3: '초등 3학년. 조금 더 다양한 낱말과 꾸며 주는 말. 한 문장은 띄어쓰기 포함 10~22자.'
};

// Best-effort, per-instance limiter. Serverless instances restart often,
// so also set a monthly spending cap in your AI provider's dashboard.
const hits = new Map();
const DAY = 24 * 60 * 60 * 1000;

function buildPrompt({ name, topic, lv, target }) {
  return [
    '어린이 한글 글씨 연습장에 들어갈 짧은 이야기를 써 줘.',
    '주인공 이름: ' + name,
    topic ? '주제: ' + topic : '주제: 아이가 좋아할 만한 일상 속 작은 모험 (자유롭게)',
    '수준: ' + LEVELS[lv],
    '길이: 띄어쓰기 포함 전체 약 ' + target + '자 (±10%). 이보다 길면 안 돼.',
    '규칙:',
    '- 맞춤법과 띄어쓰기를 정확히 지켜. 아이가 그대로 따라 쓰는 글이야.',
    '- 이름 뒤 조사(이/가, 은/는, 을/를, 와/과)를 받침에 맞게 정확히. 받침 있는 이름은 "서윤이는"처럼 자연스럽게 불러도 돼.',
    '- 문장 부호는 마침표(.), 쉼표(,), 느낌표(!), 물음표(?)만. 따옴표, 괄호, 줄임표, 이모지, 숫자는 쓰지 마.',
    '- 따뜻하고 밝은 내용. 무섭거나 슬픈 장면, 다툼은 넣지 마.',
    '- 마지막 문장은 기분 좋게 끝맺어.',
    'JSON으로만 답해. 다른 말은 쓰지 마: {"title":"짧은 제목(12자 이내)","sentences":["문장1","문장2"]}'
  ].join('\n');
}

async function callAnthropic(prompt) {
  if (!process.env.ANTHROPIC_API_KEY) { const e = new Error('no key'); e.detail = 'missing_ANTHROPIC_API_KEY'; throw e; }
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  if (!r.ok) throw providerError('anthropic', r.status, await r.text());
  const data = await r.json();
  return (data.content || []).filter(c => c.type === 'text').map(c => c.text).join('');
}

function providerError(provider, status, body) {
  const e = new Error(provider + ' ' + status + ' ' + String(body).slice(0, 300));
  if (status === 401) e.detail = provider + '_key_invalid';
  else if (status === 403) e.detail = provider + '_no_access';
  else if (status === 404) e.detail = provider + '_model_not_found';
  else if (status === 429) e.detail = provider + '_quota_or_rate_limit';
  else if (status === 400) e.detail = provider + '_bad_request';
  else e.detail = provider + '_error_' + status;
  return e;
}

// OpenAI: try the Responses API first (newer models), fall back to Chat Completions.
async function callOpenAI(prompt) {
  if (!process.env.OPENAI_API_KEY) { const e = new Error('no key'); e.detail = 'missing_OPENAI_API_KEY'; throw e; }
  if (!process.env.OPENAI_MODEL) { const e = new Error('no model'); e.detail = 'missing_OPENAI_MODEL'; throw e; }
  const headers = { 'content-type': 'application/json', authorization: 'Bearer ' + process.env.OPENAI_API_KEY };

  const r1 = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST', headers,
    body: JSON.stringify({ model: process.env.OPENAI_MODEL, input: prompt })
  });
  if (r1.ok) {
    const data = await r1.json();
    if (typeof data.output_text === 'string' && data.output_text) return data.output_text;
    const parts = [];
    for (const item of data.output || []) {
      for (const c of item.content || []) {
        if ((c.type === 'output_text' || c.type === 'text') && c.text) parts.push(c.text);
      }
    }
    return parts.join('');
  }
  const body1 = await r1.text();
  // Key or quota problems won't be fixed by the other endpoint.
  if (r1.status === 401 || r1.status === 429) throw providerError('openai', r1.status, body1);
  console.error('responses API failed, trying chat completions:', r1.status, body1.slice(0, 300));

  const r2 = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST', headers,
    body: JSON.stringify({ model: process.env.OPENAI_MODEL, messages: [{ role: 'user', content: prompt }] })
  });
  if (!r2.ok) throw providerError('openai', r2.status, await r2.text());
  const data2 = await r2.json();
  return data2.choices?.[0]?.message?.content || '';
}

function parseStory(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end <= start) { const e = new Error('no JSON in model output: ' + text.slice(0, 200)); e.detail = 'bad_model_output'; throw e; }
  let obj;
  try { obj = JSON.parse(text.slice(start, end + 1)); } catch (err) { err.detail = 'bad_model_output'; throw err; }
  const clean = s => String(s).replace(/["'“”‘’()…~]/g, '').trim();
  const sentences = (Array.isArray(obj.sentences) ? obj.sentences : []).map(clean).filter(Boolean).slice(0, 60);
  if (!sentences.length) { const e = new Error('empty story'); e.detail = 'bad_model_output'; throw e; }
  return { title: clean(obj.title || '').slice(0, 30), sentences };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const allowed = process.env.ALLOWED_ORIGIN;
  if (allowed && req.headers.origin && req.headers.origin !== allowed.replace(/\/$/, '')) {
    return res.status(403).json({ error: 'forbidden', detail: 'origin_not_allowed' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const limit = Number(process.env.DAILY_LIMIT_PER_IP) || 20;
  const recent = (hits.get(ip) || []).filter(t => now - t < DAY);
  if (recent.length >= limit) return res.status(429).json({ error: 'rate_limited' });
  recent.push(now);
  hits.set(ip, recent);

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};
  const name = String(body.name || '').trim().slice(0, 10);
  const topic = String(body.topic || '').trim().slice(0, 40);
  const lv = [1, 2, 3].includes(Number(body.lv)) ? Number(body.lv) : 1;
  const target = Math.max(40, Math.min(400, Math.round(Number(body.target) || 120)));
  if (!name) return res.status(400).json({ error: 'name_required' });

  try {
    const prompt = buildPrompt({ name, topic, lv, target });
    const provider = (process.env.AI_PROVIDER || '').toLowerCase();
    let text;
    if (provider === 'anthropic') text = await callAnthropic(prompt);
    else if (provider === 'openai') text = await callOpenAI(prompt);
    else { const e = new Error('AI_PROVIDER must be "anthropic" or "openai"'); e.detail = 'missing_AI_PROVIDER'; throw e; }
    return res.status(200).json(parseStory(text));
  } catch (err) {
    console.error(err);
    // detail is a short code only — never the provider's raw message or any key
    return res.status(502).json({ error: 'generation_failed', detail: err.detail || 'unknown' });
  }
};
