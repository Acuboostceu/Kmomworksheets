/* 이야기 데이터 — 이 파일만 고치면 이야기를 추가할 수 있어요.
   한글: {N:는} {N:가} {N:를} {N:와} {N:야} {N} 를 쓰면 아이 이름과 맞는 조사가 들어가요.
   영어: {name} 자리에 아이 이름이 들어가요.
   id는 겹치지 않게만 하면 돼요 (예: k1-11, k2-01, e-07). */

const KO_STORIES=[
{id:'k1-01',grade:1,title:'토끼와 거북이',lines:[
'{N:는} 숲속에 놀러 갔어요.','토끼와 거북이가 달리기 시합을 해요.','토끼는 깡충깡충 빨리 뛰었어요.','거북이는 엉금엉금 천천히 걸었어요.','토끼는 나무 밑에서 잠이 들었어요.','거북이는 쉬지 않고 걸었어요.','{N:는} 거북이를 응원했어요.','거북아, 힘내!','거북이가 먼저 도착했어요.','토끼는 깜짝 놀랐어요.','{N:는} 생각했어요.','천천히 가도 꾸준히 가면 돼.']},
{id:'k1-02',grade:1,title:'해님과 바람',lines:[
'{N:는} 언덕에 올라갔어요.','하늘에서 해님과 바람이 내기를 해요.','누가 나그네의 외투를 벗길까?','바람이 먼저 휘잉휘잉 불었어요.','나그네는 외투를 꼭 잡았어요.','바람이 더 세게 불었어요.','나그네는 외투를 더 꼭 여몄어요.','이번에는 해님 차례예요.','해님이 따뜻하게 웃었어요.','나그네는 땀을 닦았어요.','그리고 외투를 벗었어요.','{N:는} 손뼉을 쳤어요.','따뜻한 마음이 바람보다 힘이 세요.']},
{id:'k1-03',grade:1,title:'개미와 베짱이',lines:[
'여름이 되었어요.','{N:는} 들판에서 개미를 보았어요.','개미는 땀을 흘리며 먹이를 날랐어요.','베짱이는 나무 그늘에서 노래만 불렀어요.','개미야, 같이 놀자.','나는 겨울 준비를 해야 해.','가을이 가고 겨울이 왔어요.','눈이 펑펑 내렸어요.','베짱이는 춥고 배가 고팠어요.','베짱이가 개미네 문을 두드렸어요.','개미는 문을 열어 주었어요.','따뜻한 수프도 나누어 주었어요.','{N:는} 미리 준비하는 개미가 멋져 보였어요.']},
{id:'k1-04',grade:1,title:'금도끼 은도끼',lines:[
'옛날에 착한 나무꾼이 살았어요.','나무꾼은 연못가에서 나무를 했어요.','그런데 도끼가 퐁당 빠졌어요.','연못에서 산신령이 나왔어요.','이 금도끼가 네 도끼냐?','아니요, 제 도끼가 아니에요.','이 은도끼가 네 도끼냐?','아니요, 제 도끼는 쇠도끼예요.','산신령은 빙그레 웃었어요.','정직한 나무꾼에게 도끼를 모두 주었어요.','{N:는} 이 이야기를 듣고 말했어요.','나도 늘 정직하게 말할래요.']},
{id:'k1-05',grade:1,title:'사자와 생쥐',lines:[
'사자가 낮잠을 자고 있었어요.','생쥐가 사자 코 위를 지나갔어요.','사자가 눈을 번쩍 떴어요.','사자님, 살려 주세요.','언젠가 꼭 은혜를 갚을게요.','사자는 생쥐를 놓아주었어요.','며칠 뒤 사자가 그물에 걸렸어요.','생쥐가 달려와 그물을 갉았어요.','사자는 그물에서 나왔어요.','고마워, 작은 친구야.','{N:는} 그림책을 덮으며 웃었어요.','작은 친구도 큰 도움을 줄 수 있어요.']},
{id:'k1-06',grade:1,title:'시골 쥐와 도시 쥐',lines:[
'시골 쥐가 도시 쥐네 집에 갔어요.','도시 쥐네 집에는 맛있는 음식이 많았어요.','치즈도 있고 빵도 있었어요.','둘이 먹으려는데 고양이가 왔어요.','시골 쥐와 도시 쥐는 깜짝 놀라 숨었어요.','고양이가 가고 다시 먹으려는데 사람이 왔어요.','둘은 또 숨었어요.','시골 쥐는 집에 가기로 했어요.','나는 조용한 시골이 좋아.','{N:는} 이야기를 듣고 생각했어요.','우리 집이 제일 편해요.']},
{id:'k1-07',grade:1,title:'여우와 두루미',lines:[
'여우가 두루미를 집에 불렀어요.','여우는 넓은 접시에 수프를 주었어요.','두루미는 부리가 길어서 먹을 수 없었어요.','다음 날 두루미가 여우를 불렀어요.','두루미는 목이 긴 병에 음식을 주었어요.','이번에는 여우가 먹을 수 없었어요.','여우는 얼굴이 빨개졌어요.','미안해, 두루미야.','두루미도 웃으며 말했어요.','이제 같이 먹자.','{N:는} 친구를 생각했어요.','친구가 좋아하는 것을 준비할래요.']},
{id:'k1-08',grade:1,title:'목마른 까마귀',lines:[
'까마귀가 목이 말랐어요.','물병을 찾았지만 물이 조금밖에 없었어요.','부리가 물에 닿지 않았어요.','까마귀는 곰곰이 생각했어요.','작은 돌을 하나 물어 왔어요.','돌을 병에 퐁당 넣었어요.','하나, 둘, 셋, 넷.','물이 조금씩 올라왔어요.','드디어 물을 마셨어요.','{N:는} 손뼉을 쳤어요.','까마귀야, 정말 똑똑하구나!','어려울 때는 천천히 생각해 보면 돼요.']},
{id:'k1-09',grade:1,title:'견우와 직녀',lines:[
'하늘 나라에 직녀가 살았어요.','직녀는 옷감을 잘 짰어요.','소를 모는 견우도 살았어요.','견우와 직녀는 서로 좋아했어요.','그런데 둘은 일을 하지 않았어요.','임금님은 둘을 멀리 떨어뜨렸어요.','둘은 은하수 건너편에서 울었어요.','까치와 까마귀가 날아왔어요.','새들이 모여 다리를 만들었어요.','견우와 직녀는 일 년에 한 번 만나요.','{N:는} 밤하늘을 올려다보았어요.','반짝이는 은하수가 보였어요.']},
{id:'k1-10',grade:1,title:'흥부와 제비',lines:[
'흥부는 마음씨가 착했어요.','어느 날 제비가 다리를 다쳤어요.','흥부는 제비 다리를 정성껏 감아 주었어요.','제비는 다 나아서 남쪽으로 날아갔어요.','봄이 되자 제비가 돌아왔어요.','제비는 박씨 하나를 떨어뜨렸어요.','흥부는 박씨를 심었어요.','커다란 박이 주렁주렁 열렸어요.','박을 타니 쌀과 보물이 쏟아졌어요.','흥부네 가족은 기뻐서 춤을 추었어요.','{N:는} 다친 새를 보면 도와주기로 했어요.']}
];

const EN_STORIES=[
{id:'e-01',title:'The Tortoise and the Hare',lines:[
'{name} went to the park.','A hare and a tortoise had a race.','The hare ran very fast.','The tortoise walked slowly.','The hare took a nap under a tree.','The tortoise did not stop.','{name} cheered for the tortoise.','The tortoise won the race!','Slow and steady wins the race.']},
{id:'e-02',title:'The Lion and the Mouse',lines:[
'A big lion was sleeping.','A little mouse ran over his nose.','The lion woke up.','Please let me go, said the mouse.','I will help you one day.','The lion let the mouse go.','Later the lion was caught in a net.','The mouse chewed the net.','The lion was free!','{name} smiled at the end of the story.','Little friends can be big helpers.']},
{id:'e-03',title:'The Ant and the Grasshopper',lines:[
'It was a hot summer day.','{name} saw an ant carrying food.','A grasshopper sang and played all day.','The ant kept working.','Then winter came.','The grasshopper was cold and hungry.','The kind ant shared her food.','{name} wants to plan ahead like the ant.']},
{id:'e-04',title:'The Crow and the Pitcher',lines:[
'A crow was very thirsty.','She found a pitcher with a little water.','Her beak could not reach it.','The crow had an idea.','She dropped in one stone.','Then two, three, and four stones.','The water came up and up.','The crow got a big drink!','{name} clapped. What a smart bird!']},
{id:'e-05',title:'The Wind and the Sun',lines:[
'The wind and the sun had a contest.','Who can take off the coat of a man?','The wind blew and blew.','The man held his coat tight.','Then the sun smiled warm and bright.','The man felt hot.','He took off his coat.','{name} learned that kindness is strong.']},
{id:'e-06',title:'The Fox and the Stork',lines:[
'The fox asked the stork to lunch.','He gave her soup in a flat dish.','The stork could not eat it.','Then the stork asked the fox to lunch.','She gave him food in a tall jar.','The fox could not eat it.','The fox said sorry.','Now they share food that both can eat.','{name} thinks about what friends like.']}
];
