(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);

// === TOOLS CONFIG ===
const tools=[
{id:'json',icon:'📦',name:'JSON Formatter',desc:'Format, validate & minify JSON data',tag:'format',
 render:()=>`<div class="tool-row">
  <div><div class="tool-label">Input JSON</div>
  <textarea class="tool-textarea" id="t-json-in" placeholder='{"key": "value"}'></textarea></div>
  <div class="tool-actions">
    <button class="tool-btn tool-btn-primary" onclick="T.jsonFmt()">✨ Format</button>
    <button class="tool-btn tool-btn-secondary" onclick="T.jsonMin()">🗜️ Minify</button>
    <button class="tool-btn tool-btn-copy" onclick="T.copy('t-json-out')">📋 Copy</button></div>
  <div><div class="tool-label">Output</div>
  <textarea class="tool-output" id="t-json-out" readonly></textarea></div></div>`},

{id:'base64',icon:'🔐',name:'Base64 Encode / Decode',desc:'Convert text to and from Base64',tag:'encode',
 render:()=>`<div class="tool-row">
  <div><div class="tool-label">Input</div>
  <textarea class="tool-textarea" id="t-b64-in" placeholder="Enter text here..."></textarea></div>
  <div class="tool-actions">
    <button class="tool-btn tool-btn-primary" onclick="T.b64enc()">🔒 Encode</button>
    <button class="tool-btn tool-btn-secondary" onclick="T.b64dec()">🔓 Decode</button>
    <button class="tool-btn tool-btn-copy" onclick="T.copy('t-b64-out')">📋 Copy</button></div>
  <div><div class="tool-label">Output</div>
  <textarea class="tool-output" id="t-b64-out" readonly></textarea></div></div>`},

{id:'uuid',icon:'🆔',name:'UUID Generator',desc:'Generate random UUIDs (v4)',tag:'generate',
 render:()=>`<div class="tool-row">
  <div class="tool-actions">
    <button class="tool-btn tool-btn-primary" onclick="T.uuid()">🎲 Generate UUID</button>
    <button class="tool-btn tool-btn-primary" onclick="T.uuidBulk()">📦 Generate 10</button>
    <button class="tool-btn tool-btn-copy" onclick="T.copy('t-uuid-out')">📋 Copy</button></div>
  <div><div class="tool-label">Result</div>
  <textarea class="tool-output" id="t-uuid-out" readonly style="min-height:60px"></textarea></div></div>`},

{id:'color',icon:'🎨',name:'Color Converter',desc:'Convert between HEX, RGB, and HSL',tag:'convert',
 render:()=>`<div class="tool-row">
  <div><div class="tool-label">Enter Color (HEX, RGB, or HSL)</div>
  <input class="tool-input" id="t-color-in" placeholder="#22d3ee or rgb(34,211,238) or hsl(187,82%,53%)">
  </div>
  <div class="tool-actions">
    <button class="tool-btn tool-btn-primary" onclick="T.colorConvert()">🎨 Convert</button></div>
  <div class="color-grid" id="t-color-grid"></div></div>`},

{id:'url',icon:'🔗',name:'URL Encode / Decode',desc:'Encode or decode URL components',tag:'encode',
 render:()=>`<div class="tool-row">
  <div><div class="tool-label">Input</div>
  <textarea class="tool-textarea" id="t-url-in" placeholder="hello world & foo=bar"></textarea></div>
  <div class="tool-actions">
    <button class="tool-btn tool-btn-primary" onclick="T.urlEnc()">🔒 Encode</button>
    <button class="tool-btn tool-btn-secondary" onclick="T.urlDec()">🔓 Decode</button>
    <button class="tool-btn tool-btn-copy" onclick="T.copy('t-url-out')">📋 Copy</button></div>
  <div><div class="tool-label">Output</div>
  <textarea class="tool-output" id="t-url-out" readonly></textarea></div></div>`},

{id:'timestamp',icon:'⏰',name:'Timestamp Converter',desc:'Convert Unix timestamps to readable dates and vice versa',tag:'convert',
 render:()=>`<div class="tool-row">
  <div><div class="tool-label">Unix Timestamp (seconds) — leave empty for current time</div>
  <input class="tool-input" id="t-ts-in" placeholder="e.g. 1682345678"></div>
  <div class="tool-actions">
    <button class="tool-btn tool-btn-primary" onclick="T.tsConvert()">⏰ Convert</button>
    <button class="tool-btn tool-btn-secondary" onclick="T.tsNow()">📍 Now</button></div>
  <div class="ts-group" id="t-ts-grid"></div></div>`},

{id:'hash',icon:'🔑',name:'Hash Generator',desc:'Generate SHA-1, SHA-256, SHA-512 hashes',tag:'security',
 render:()=>`<div class="tool-row">
  <div><div class="tool-label">Input Text</div>
  <textarea class="tool-textarea" id="t-hash-in" placeholder="Enter text to hash..."></textarea></div>
  <div class="tool-actions">
    <button class="tool-btn tool-btn-primary" onclick="T.hashGen()">🔑 Generate Hashes</button></div>
  <div class="hash-list" id="t-hash-out"></div></div>`},

{id:'lorem',icon:'📝',name:'Lorem Ipsum Generator',desc:'Generate placeholder text for mockups',tag:'generate',
 render:()=>`<div class="tool-row">
  <div class="lorem-options">
    <label>Count:</label><input type="number" id="t-lorem-n" value="3" min="1" max="20">
    <label>Type:</label><select id="t-lorem-type"><option value="paragraphs">Paragraphs</option><option value="sentences">Sentences</option><option value="words">Words</option></select>
  </div>
  <div class="tool-actions">
    <button class="tool-btn tool-btn-primary" onclick="T.loremGen()">📝 Generate</button>
    <button class="tool-btn tool-btn-copy" onclick="T.copy('t-lorem-out')">📋 Copy</button></div>
  <div><div class="tool-label">Output</div>
  <textarea class="tool-output" id="t-lorem-out" readonly></textarea></div></div>`}
];

// === RENDER TOOL CARDS ===
function renderCards(){
  const grid=$('#tools-grid');
  grid.innerHTML=tools.map(t=>`<div class="tool-card" data-id="${t.id}" data-search="${t.name} ${t.desc} ${t.tag}">
    <span class="tool-card-icon">${t.icon}</span>
    <div class="tool-card-name">${t.name}</div>
    <div class="tool-card-desc">${t.desc}</div>
    <span class="tool-card-tag">${t.tag}</span></div>`).join('');

  $$('.tool-card').forEach(c=>c.addEventListener('click',()=>{
    const t=tools.find(x=>x.id===c.dataset.id);
    openModal(t);
  }));
}

// === MODAL ===
function openModal(t){
  $('#modal-icon').textContent=t.icon;
  $('#modal-title').textContent=t.name;
  $('#modal-desc').textContent=t.desc;
  $('#modal-body').innerHTML=t.render();
  $('#modal-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}

function closeModal(){
  $('#modal-overlay').classList.remove('open');
  document.body.style.overflow='';
}

$('#modal-close').addEventListener('click',closeModal);
$('#modal-overlay').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

// === SEARCH ===
$('#search-input').addEventListener('input',e=>{
  const q=e.target.value.toLowerCase();
  $$('.tool-card').forEach(c=>{
    c.classList.toggle('hidden',q&&!c.dataset.search.toLowerCase().includes(q));
  });
});

// === TOAST ===
function toast(msg){
  const t=$('#toast');$('#toast-msg').textContent=msg;
  t.classList.add('show');
  clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),2000);
}

// === TOOL FUNCTIONS (global T) ===
const LOREM_WORDS="lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ');

window.T={
  copy(id){
    const el=$(('#'+id));if(!el)return;
    const val=el.value||el.textContent;
    navigator.clipboard.writeText(val).then(()=>toast('✅ Copied!')).catch(()=>{
      const ta=document.createElement('textarea');ta.value=val;ta.style.cssText='position:fixed;opacity:0';
      document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);toast('✅ Copied!');
    });
  },

  // JSON
  jsonFmt(){try{const o=JSON.parse($('#t-json-in').value);$('#t-json-out').value=JSON.stringify(o,null,2);toast('✅ Formatted!');}catch(e){$('#t-json-out').value='❌ Invalid JSON: '+e.message;}},
  jsonMin(){try{const o=JSON.parse($('#t-json-in').value);$('#t-json-out').value=JSON.stringify(o);toast('✅ Minified!');}catch(e){$('#t-json-out').value='❌ Invalid JSON: '+e.message;}},

  // Base64
  b64enc(){try{$('#t-b64-out').value=btoa(unescape(encodeURIComponent($('#t-b64-in').value)));toast('✅ Encoded!');}catch(e){$('#t-b64-out').value='❌ Error: '+e.message;}},
  b64dec(){try{$('#t-b64-out').value=decodeURIComponent(escape(atob($('#t-b64-in').value.trim())));toast('✅ Decoded!');}catch(e){$('#t-b64-out').value='❌ Invalid Base64: '+e.message;}},

  // UUID
  uuid(){
    const u=crypto.randomUUID?crypto.randomUUID():([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16));
    $('#t-uuid-out').value=u;toast('✅ Generated!');
  },
  uuidBulk(){
    const gen=()=>crypto.randomUUID?crypto.randomUUID():([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16));
    $('#t-uuid-out').value=Array.from({length:10},gen).join('\n');toast('✅ Generated 10!');
  },

  // Color
  colorConvert(){
    const raw=$('#t-color-in').value.trim();const grid=$('#t-color-grid');
    let r,g,b;
    try{
      if(raw.startsWith('#')){const h=raw.replace('#','');const f=h.length===3?h.split('').map(c=>parseInt(c+c,16)):null;
        if(f){[r,g,b]=f;}else{r=parseInt(h.substr(0,2),16);g=parseInt(h.substr(2,2),16);b=parseInt(h.substr(4,2),16);}
      }else if(raw.startsWith('rgb')){const m=raw.match(/\d+/g);r=+m[0];g=+m[1];b=+m[2];
      }else if(raw.startsWith('hsl')){const m=raw.match(/[\d.]+/g);const hsl=T._hslToRgb(+m[0],+m[1],+m[2]);r=hsl[0];g=hsl[1];b=hsl[2];
      }else throw new Error('Unknown format');
      if(isNaN(r)||isNaN(g)||isNaN(b))throw new Error('Parse error');
      const hex='#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('');
      const hsl=T._rgbToHsl(r,g,b);
      grid.innerHTML=`
        <div class="color-swatch-box"><div class="color-swatch" style="background:${hex}"></div><div class="color-swatch-label">HEX</div><div class="color-swatch-value">${hex}</div></div>
        <div class="color-swatch-box"><div class="color-swatch" style="background:rgb(${r},${g},${b})"></div><div class="color-swatch-label">RGB</div><div class="color-swatch-value">rgb(${r}, ${g}, ${b})</div></div>
        <div class="color-swatch-box"><div class="color-swatch" style="background:hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%)"></div><div class="color-swatch-label">HSL</div><div class="color-swatch-value">hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)</div></div>`;
      toast('✅ Converted!');
    }catch(e){grid.innerHTML=`<p style="color:#ef4444;grid-column:1/-1">❌ Could not parse color. Try #hex, rgb(), or hsl().</p>`;}
  },
  _rgbToHsl(r,g,b){r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b),l=(max+min)/2;let h,s;
    if(max===min){h=s=0;}else{const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);
      switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}
    }return[Math.round(h*360),Math.round(s*100),Math.round(l*100)];},
  _hslToRgb(h,s,l){h/=360;s/=100;l/=100;let r,g,b;
    if(s===0){r=g=b=l;}else{const hue2rgb=(p,q,t)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p;};
      const q=l<0.5?l*(1+s):l+s-l*s,p=2*l-q;r=hue2rgb(p,q,h+1/3);g=hue2rgb(p,q,h);b=hue2rgb(p,q,h-1/3);
    }return[Math.round(r*255),Math.round(g*255),Math.round(b*255)];},

  // URL
  urlEnc(){$('#t-url-out').value=encodeURIComponent($('#t-url-in').value);toast('✅ Encoded!');},
  urlDec(){try{$('#t-url-out').value=decodeURIComponent($('#t-url-in').value);toast('✅ Decoded!');}catch(e){$('#t-url-out').value='❌ Error: '+e.message;}},

  // Timestamp
  tsConvert(){
    const raw=$('#t-ts-in').value.trim();
    const ts=raw?parseInt(raw):Math.floor(Date.now()/1000);
    if(isNaN(ts)){$('#t-ts-grid').innerHTML='<p style="color:#ef4444;grid-column:1/-1">❌ Invalid timestamp</p>';return;}
    const d=new Date(ts*1000);
    const items=[
      ['Unix (s)',ts],['Unix (ms)',ts*1000],
      ['UTC',d.toUTCString()],['ISO 8601',d.toISOString()],
      ['Local',d.toLocaleString()],['Relative',T._relTime(d)]
    ];
    $('#t-ts-grid').innerHTML=items.map(([l,v])=>`<div class="ts-item"><div class="ts-item-label">${l}</div><div class="ts-item-value">${v}</div></div>`).join('');
    toast('✅ Converted!');
  },
  tsNow(){$('#t-ts-in').value=Math.floor(Date.now()/1000);T.tsConvert();},
  _relTime(d){const s=Math.floor((Date.now()-d)/1000);if(s<60)return s+'s ago';if(s<3600)return Math.floor(s/60)+'m ago';if(s<86400)return Math.floor(s/3600)+'h ago';return Math.floor(s/86400)+'d ago';},

  // Hash
  async hashGen(){
    const text=$('#t-hash-in').value;if(!text){$('#t-hash-out').innerHTML='<p style="color:var(--text-muted)">Enter text above first.</p>';return;}
    const enc=new TextEncoder().encode(text);
    const algos=['SHA-1','SHA-256','SHA-512'];
    const results=await Promise.all(algos.map(async a=>{
      const buf=await crypto.subtle.digest(a,enc);
      return{algo:a,hash:Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('')};
    }));
    $('#t-hash-out').innerHTML=results.map(r=>`<div class="hash-item"><div class="hash-item-label">${r.algo}</div><div class="hash-item-value">${r.hash}</div></div>`).join('');
    toast('✅ Hashed!');
  },

  // Lorem
  loremGen(){
    const n=parseInt($('#t-lorem-n').value)||3;const type=$('#t-lorem-type').value;let out='';
    const randWords=(min,max)=>{const c=min+Math.floor(Math.random()*(max-min));return Array.from({length:c},()=>LOREM_WORDS[Math.floor(Math.random()*LOREM_WORDS.length)]).join(' ');};
    const sentence=()=>{const s=randWords(8,16);return s.charAt(0).toUpperCase()+s.slice(1)+'.';};
    const paragraph=()=>Array.from({length:4+Math.floor(Math.random()*4)},sentence).join(' ');
    if(type==='words')out=randWords(n,n+1);
    else if(type==='sentences')out=Array.from({length:n},sentence).join(' ');
    else out=Array.from({length:n},paragraph).join('\n\n');
    $('#t-lorem-out').value=out;toast('✅ Generated!');
  }
};

// === INIT ===
renderCards();
})();
