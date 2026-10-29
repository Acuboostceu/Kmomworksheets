# 우리 아이 학습지

무료 학습지 사이트예요. 탭 두 개로 되어 있어요.

- **수학 연산지** (`/#math`): 덧셈·뺄셈·곱셈·나눗셈 37레벨. 한국/미국 버전, Letter/A4 용지를 지원하고 PDF로 저장해요.
- **한글 글씨 연습** (`/#hangul`): 아이 이름이 들어간 이야기(전래동화·이솝 우화를 새로 쓴 10편)를 칸 노트에 한 줄씩 옮겨 써요. 조사(이/가, 은/는 등)는 이름 받침에 맞춰 자동으로 바뀌어요. AI 새 이야기는 선택 기능이에요.
- **English** (`/#english`): 3선 영어 노트(위선·점선 가운데선·기준선)에 짧은 영어 이야기를 따라 써요. 이름 자동 삽입, 줄 크기 3단계, 따라 쓰기 회색 글씨 지원.

## 파일 구성

```
index.html      사이트 전체 (세 탭, PDF 생성 포함)
stories.js      이야기 데이터 (한글·영어) — 이야기 추가는 이 파일만 고치면 돼요
api/story.js    이야기 생성 서버리스 함수 (API 키는 여기서만 사용)
.env.example    환경 변수 예시
```

세 탭 모두 서버 없이 브라우저에서 작동해요. 서버가 필요한 건 한글 탭의 'AI로 새 이야기 만들기'뿐이에요. API 키를 넣지 않아도 사이트는 전부 쓸 수 있어요.

이야기를 추가하려면 `stories.js`의 `KO_STORIES`(한글)나 `EN_STORIES`(영어) 배열에 항목을 더하면 돼요. 한글은 `{N:는}`, `{N:가}`, `{N:를}`, `{N:와}`, `{N:야}`처럼 쓰면 이름 받침에 맞는 조사가 붙고, 영어는 `{name}`을 쓰면 돼요.

## Vercel에 배포하기

1. 이 폴더를 GitHub 저장소에 올려요. `.env` 파일은 올리지 마세요. `.gitignore`에 이미 들어 있어요.
2. vercel.com에서 **Add New → Project**를 누르고 저장소를 가져와요. Framework Preset은 **Other**로 두면 돼요.
3. **Settings → Environment Variables**에 아래 값을 넣어요.

   Claude를 쓸 때:
   - `AI_PROVIDER` = `anthropic`
   - `ANTHROPIC_API_KEY` = 발급받은 키
   - `ANTHROPIC_MODEL` = 선택 사항, 기본값은 `claude-sonnet-5-5`

   ChatGPT를 쓸 때:
   - `AI_PROVIDER` = `openai`
   - `OPENAI_API_KEY` = 발급받은 키
   - `OPENAI_MODEL` = OpenAI 문서에서 현재 모델 이름을 확인해 넣어요. 이 값은 필수예요.

   공통 (권장):
   - `DAILY_LIMIT_PER_IP` = `20`
   - `ALLOWED_ORIGIN` = 배포된 주소. 예: `https://sheets.example.com`

4. **Deploy**를 누르면 끝나요. 도메인은 **Settings → Domains**에서 연결해요.

## 로컬에서 테스트하기

```bash
npm i -g vercel
cp .env.example .env.local   # 키를 채워 넣으세요
vercel dev
```

`index.html`을 파일로 바로 열어도 수학 탭과 직접 입력 방식의 한글 탭은 작동해요. 이야기 자동 생성만 안 돼요.

## 비용과 악용 방지

- 이야기 한 편은 짧아서 한 번 생성하는 비용은 아주 적어요. 정확한 금액은 각 회사의 현재 요금표를 확인하세요.
- `DAILY_LIMIT_PER_IP`는 서버리스 인스턴스마다 따로 세는 간이 제한이에요. 인스턴스가 재시작되면 초기화돼요.
- 그래서 **AI 회사 대시보드에서 월 사용 한도를 꼭 설정하세요.** 실제로 비용을 막아 주는 건 이 한도예요.
- 더 확실한 제한이 필요하면 Upstash Redis 같은 저장소로 바꾸면 돼요.

## 이야기 프롬프트 수정

`api/story.js`의 `LEVELS`와 `buildPrompt`를 고치면 돼요. 프롬프트가 서버에 있어서, 방문자가 이 API를 다른 용도로 쓸 수는 없어요.
