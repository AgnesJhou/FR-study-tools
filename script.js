const LEVEL_ORDER = {B1:1,B2:2,C1:3,C2:4};
const BASIC_STOP = new Set(`je tu il elle nous vous ils elles le la les un une des du de d au aux et ou mais donc or ni car en y à a est sont être avoir faire dire aller très plus moins dans sur avec pour par ce cette ces mon ma mes ton sa ses leur leurs qui que quoi dont où quand comment pourquoi ne pas se me te lui on tout tous toute bien bon bonne comme si aussi alors chez après avant sans sous entre depuis pendant`.split(/\s+/));
const LEXICON = [
{term:'scruter', type:'單字', cefr:'C1', freq:4, zh:'仔細觀察；仔細端詳；審視', literal:'像搜尋細節一樣仔細看', origin:'來自拉丁文 scrutari，有搜尋、翻找之意。', context:'新聞、藝術評論、政治分析、市場觀察。', collocations:'scruter les détails / scruter l’horizon / scruter un document', register:'新聞／書面／學術', example:'Le commissaire scrute l’accrochage de l’œuvre au centimètre près.'},
{term:'au centimètre près', type:'片語', cefr:'C1', freq:3, zh:'精準到公分；非常精確', literal:'精確到一公分之內', origin:'常用於描述測量、安排、布置非常精準。', context:'展覽布置、工程、設計、尺寸確認。', collocations:'mesurer au centimètre près / régler au centimètre près', register:'口語／職場／技術', example:'L’accrochage est prévu au centimètre près.'},
{term:'mise en dérision', type:'名詞片語', cefr:'C1', freq:3, zh:'嘲弄；戲謔化；把某事拿來開玩笑', literal:'放進嘲諷之中', origin:'dérision 指嘲笑、譏諷。', context:'藝術評論、政治評論、諷刺作品。', collocations:'une mise en dérision de / tourner en dérision', register:'新聞／書面／藝術評論', example:'C’est une mise en dérision de ce qu’on lui apprend.'},
{term:'tirer la langue', type:'片語', cefr:'B2', freq:4, zh:'吐舌頭；做鬼臉挑釁', literal:'拉出舌頭', origin:'法語常見身體動作表達。', context:'小孩做鬼臉、藝術形象、帶挑釁的幽默。', collocations:'tirer la langue à quelqu’un', register:'口語', example:'Le squelette vous tire la langue.'},
{term:'voyou', type:'單字', cefr:'B2', freq:3, zh:'流氓；小混混；不守規矩的人', literal:'無', origin:'常用於形容粗魯、叛逆或帶壞孩子氣的人。', context:'口語批評、藝術評論中可帶幽默感。', collocations:'une bande de voyous / un comportement de voyou', register:'口語／新聞', example:'C’est une peinture de voyous.'},
{term:'accrochage', type:'單字', cefr:'C1', freq:3, zh:'掛畫；展覽布置；懸掛方式', literal:'掛起來這件事', origin:'由 accrocher 派生，藝術展覽中常指作品懸掛與陳列。', context:'美術館、展覽、策展。', collocations:'l’accrochage d’une œuvre / un nouvel accrochage', register:'藝術／新聞', example:'Le commissaire vérifie l’accrochage de l’œuvre.'},
{term:'compenser', type:'單字', cefr:'B2', freq:4, zh:'補償；彌補；抵消', literal:'使兩邊平衡', origin:'常見於工作、經濟、心理與技術語境。', context:'彌補缺點、抵消影響、補償損失。', collocations:'compenser une perte / compenser un manque / compenser sa petite taille', register:'職場／新聞／日常', example:'La hauteur permet de compenser sa petite taille.'},
{term:'dominer', type:'單字', cefr:'B2', freq:4, zh:'高於；支配；主導；俯視', literal:'站在上方', origin:'可指物理高度，也可指權力或影響力。', context:'建築、政治、商業、藝術展示。', collocations:'dominer le marché / dominer les autres / dominer la situation', register:'新聞／商業／日常', example:'Le tableau est placé afin de dominer les autres.'},
{term:'fond rouge', type:'搭配', cefr:'B1', freq:4, zh:'紅色背景', literal:'紅色的底／背景', origin:'fond 在藝術與攝影中常指背景。', context:'描述畫作、照片、設計。', collocations:'sur un fond rouge / fond noir / fond uni', register:'藝術／日常', example:'Le tableau est sur un fond rouge.'},
{term:'prévu à', type:'搭配', cefr:'B2', freq:5, zh:'預定在；安排在', literal:'被預計於', origin:'prévoir 的被動/形容詞用法。', context:'時間、地點、高度、價格、計畫安排。', collocations:'prévu à 11h / prévu à une hauteur de / prévu pour demain', register:'職場／日常／新聞', example:'L’accrochage est prévu à une hauteur d’1m55.'},
{term:'d’une certaine façon', type:'片語', cefr:'B2', freq:5, zh:'某種程度上；可以說是', literal:'以某種方式', origin:'常用來緩和語氣，表示詮釋不是絕對。', context:'評論、解釋、口語補充。', collocations:'dire quelque chose d’une certaine façon', register:'口語／書面', example:'Il vous tire la langue, d’une certaine façon.'},
{term:'au premier étage', type:'搭配', cefr:'B1', freq:5, zh:'在二樓／一樓以上第一層（法式用法）', literal:'在第一層樓', origin:'法國 rez-de-chaussée 是地面層，premier étage 通常是台灣說的二樓。', context:'地點描述、展覽導覽、旅遊。', collocations:'monter au premier étage / situé au premier étage', register:'日常／旅遊', example:'L’œuvre est accrochée au premier étage.'},
{term:'co-commissaire', type:'單字', cefr:'C1', freq:2, zh:'共同策展人', literal:'共同委員／共同負責人', origin:'commissaire d’exposition 指策展人。', context:'展覽、博物館、藝術新聞。', collocations:'co-commissaire de l’exposition', register:'藝術／新聞', example:'Jean de Loisy est co-commissaire de l’exposition.'},
{term:'œuvre', type:'單字', cefr:'B2', freq:5, zh:'作品；藝術作品；著作', literal:'工作成果', origin:'藝術、文學與文化領域的高頻詞。', context:'畫作、雕塑、文學作品、藝術展。', collocations:'une œuvre d’art / l’œuvre de Picasso / exposer une œuvre', register:'藝術／新聞／學術', example:'L’accrochage de l’œuvre est très précis.'}
];

const sampleText = `Le plus petit, Crâne de squelette fumant une cigarette est accroché au premier étage de la Fondation, sur un fond rouge. "Avec ce tableau, il dit ’vous m’ennuyez avec vos cours d’anatomie, je peux dessiner un squelette, il vous tire la langue’ d’une certaine façon. Donc il fume, il le fait comme une mise en dérision de ce qu’on lui apprend. C’est une peinture de voyous", décrit Jean de Loisy, co-commissaire de l’exposition, qui scrute, au centimètre près, l’accrochage de l’œuvre, prévu à une hauteur d’1m55 afin de dominer les autres et de compenser sa petite taille.`;

let currentResults = [];
const el = id => document.getElementById(id);
function normalize(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,"'");}
function stars(n){return '★★★★★'.slice(0,n) + '☆☆☆☆☆'.slice(0,5-n)}
function score(item, text){
  const hits = (normalize(text).match(new RegExp(normalize(item.term).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'g'))||[]).length;
  return (LEVEL_ORDER[item.cefr]*20) + item.freq*8 + hits*7 + (item.type.includes('片語')||item.type.includes('搭配')?10:0);
}
function analyze(){
  const text = el('sourceText').value.trim();
  if(!text){ render([]); return; }
  const min = LEVEL_ORDER[el('levelFilter').value];
  const phraseOnly = el('phraseOnly').checked;
  const normText = normalize(text);
  const found = LEXICON.filter(item=>{
    if(LEVEL_ORDER[item.cefr] < min) return false;
    if(phraseOnly && !(item.type.includes('片語') || item.type.includes('搭配'))) return false;
    return normText.includes(normalize(item.term));
  }).map(item=>({...item, score: score(item,text)})).sort((a,b)=>b.score-a.score);
  render(found);
}
function render(items){
  currentResults = items;
  el('totalCount').textContent = items.length;
  el('ankiCount').textContent = items.filter(x=>x.score>=60).length;
  el('phraseCount').textContent = items.filter(x=>x.type.includes('片語')||x.type.includes('搭配')).length;
  const q = normalize(el('searchBox').value||'');
  const visible = items.filter(x=>!q || normalize(x.term+x.zh+x.context).includes(q));
  const box = el('results');
  if(!visible.length){ box.className='cards empty'; box.textContent='沒有符合條件的詞。'; return; }
  box.className='cards';
  box.innerHTML = visible.map(item=>`<article class="card">
    <div class="card-head"><div class="term">${item.term}</div><div class="freq">${stars(item.freq)}</div></div>
    <div class="meta"><span class="pill">${item.cefr}</span><span class="pill">${item.type}</span><span class="pill">Score ${item.score}</span></div>
    <ul class="explain">
      <li><b>① 真正中文意思：</b>${item.zh}</li>
      <li><b>② 字面意思：</b>${item.literal}</li>
      <li><b>③ 來源／典故：</b>${item.origin}</li>
      <li><b>④ 現代使用情境：</b>${item.context}</li>
      <li><b>⑤ 常見搭配：</b>${item.collocations}</li>
      <li><b>⑥ 語域：</b>${item.register}</li>
    </ul>
    <div class="example">例句：${item.example}</div>
  </article>`).join('');
}
function toTSV(){
  const header = ['French','Chinese','CEFR','Frequency','Type','Literal','Origin','Context','Collocations','Register','Example'].join('\t');
  const rows = currentResults.map(x=>[x.term,x.zh,x.cefr,stars(x.freq),x.type,x.literal,x.origin,x.context,x.collocations,x.register,x.example]
    .map(v=>String(v).replace(/\t/g,' ').replace(/\n/g,' ')).join('\t'));
  return [header,...rows].join('\n');
}
el('sampleBtn').addEventListener('click',()=>{el('sourceText').value=sampleText; analyze();});
el('analyzeBtn').addEventListener('click',analyze);
el('levelFilter').addEventListener('change',analyze);
el('phraseOnly').addEventListener('change',analyze);
el('searchBox').addEventListener('input',()=>render(currentResults));
el('exportBtn').addEventListener('click',()=>{
  const blob = new Blob([toTSV()],{type:'text/tab-separated-values;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='french_anki_cards.tsv'; a.click(); URL.revokeObjectURL(url);
});
el('copyBtn').addEventListener('click',async()=>{ await navigator.clipboard.writeText(toTSV()); el('copyBtn').textContent='已複製'; setTimeout(()=>el('copyBtn').textContent='複製 TSV',1200); });
