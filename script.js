/* ─── Custom cursor ─── */
const crs = document.getElementById('crs');
const crs2 = document.getElementById('crs2');
let mx=window.innerWidth/2, my=window.innerHeight/2;
let cx2=mx, cy2=my;

document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  crs.style.left=mx+'px'; crs.style.top=my+'px';
});

// Lerp follower
(function moveCrs2(){
  cx2 += (mx-cx2)*0.12;
  cy2 += (my-cy2)*0.12;
  crs2.style.left=cx2+'px'; crs2.style.top=cy2+'px';
  requestAnimationFrame(moveCrs2);
})();

// Hover states
document.querySelectorAll('a,[class*="card"],[class*="btn"]').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    crs.style.width='18px'; crs.style.height='18px';
    crs.style.background='rgba(224,53,122,1)';
    crs2.style.width='52px'; crs2.style.height='52px';
    crs2.style.opacity='.4';
  });
  el.addEventListener('mouseleave',()=>{
    crs.style.width='10px'; crs.style.height='10px';
    crs.style.background='rgba(224,53,122,.7)';
    crs2.style.width='32px'; crs2.style.height='32px';
    crs2.style.opacity='1';
  });
});

/* ─── Atmospheric canvas ─── */
const cv = document.getElementById('atm');
const ctx = cv.getContext('2d');
let W, H;

function resize(){ W=cv.width=innerWidth; H=cv.height=innerHeight; }
resize(); addEventListener('resize', resize);

// Orbs
const orbs = [
  {x:.12, y:.08, r:.65, c:'rgba(224,53,122,', a:.09, drift:0},
  {x:.88, y:.92, r:.55, c:'rgba(224,40,110,', a:.1,  drift:Math.PI},
  {x:.5,  y:.5,  r:.35, c:'rgba(26,8,16,',    a:.5,  drift:Math.PI/2},
  {x:.3,  y:.7,  r:.4,  c:'rgba(224,53,122,', a:.05, drift:Math.PI*1.5},
];

// Particles
const COLS=['rgba(224,53,122,','rgba(224,40,110,','rgba(255,160,200,'];
class Pt{
  constructor(){this.reset(true)}
  reset(rand){
    this.x=Math.random()*W;
    this.y=rand?Math.random()*H:H+10;
    this.r=.3+Math.random()*1.4;
    this.a=0; this.ta=.04+Math.random()*.22;
    this.vx=(Math.random()-.5)*.2;
    this.vy=-.1-Math.random()*.28;
    this.c=COLS[0|Math.random()*COLS.length];
    this.l=0; this.ml=160+Math.random()*280;
  }
  tick(){
    this.l++;
    const t=this.l/this.ml;
    this.a=t<.2?t/.2*this.ta:t>.8?(1-t)/.2*this.ta:this.ta;
    this.x+=this.vx; this.y+=this.vy;
    if(this.l>this.ml)this.reset(false);
  }
  draw(){
    ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fillStyle=this.c+this.a+')';ctx.fill();
  }
}

const pts=[];
for(let i=0;i<110;i++){const p=new Pt();p.l=0|Math.random()*p.ml;pts.push(p);}

let t=0;
(function loop(){
  t+=.004;
  ctx.clearRect(0,0,W,H);

  // Animated orbs
  orbs.forEach(o=>{
    const px=o.x*W + Math.sin(t+o.drift)*W*.04;
    const py=o.y*H + Math.cos(t+o.drift)*H*.03;
    const g=ctx.createRadialGradient(px,py,0,px,py,o.r*W);
    g.addColorStop(0,o.c+o.a+')');
    g.addColorStop(1,'transparent');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  });

  pts.forEach(p=>{p.tick();p.draw();});
  requestAnimationFrame(loop);
})();


/* ─── Catalog Data ─── */
const catalogItems = [
  { id:1,  img:'imagenes/foto1.jpg',  title:'Arreglo Classic',        desc:'Rosa preservada en tonos rosé. Belleza que perdura sin mantenimiento.',                    tags:['flores','ramos'],    pills:['Preservada','Rosa','Romántica'] },
  { id:2,  img:'imagenes/foto2.jpg',  title:'Boutonnière Elegance',   desc:'Pequeño ramo para ocasiones formales y eventos especiales.',                               tags:['ramos','flores'],    pills:['Formal','Evento','Boutonnière'] },
  { id:3,  img:'imagenes/foto3.jpg',  title:'Corona Romántica',       desc:'Corona artesanal de flores preservadas. Ideal para momentos únicos.',                     tags:['flores'],            pills:['Corona','Artesanal','Especial'] },
  { id:4,  img:'imagenes/foto4.jpg',  title:'Caja Vintage',           desc:'Caja decorativa con rosas blancas preservadas. Elegancia atemporal.',                     tags:['cajas'],             pills:['Caja','Blanco','Vintage'] },
  { id:5,  img:'imagenes/foto5.jpg',  title:'Ramo Infinity',          desc:'Mezcla premium de flores preservadas con colores contrastantes.',                         tags:['ramos','flores'],    pills:['Ramo','Premium','Colorido'] },
  { id:6,  img:'imagenes/foto6.jpg',  title:'Bandeja Dream',          desc:'Bandeja decorativa exclusiva, perfecta como regalo de lujo.',                             tags:['bandejas'],          pills:['Bandeja','Lujo','Regalo'] },
  { id:7,  img:'imagenes/foto7.jpg',  title:'Centro de Mesa',         desc:'Arreglo central para mesas de eventos y decoraciones especiales.',                        tags:['flores','bandejas'], pills:['Centro','Evento','Decoración'] },
  { id:8,  img:'imagenes/foto8.jpg',  title:'Caja Hearts',            desc:'Caja en forma de corazón con flores preservadas. El regalo perfecto.',                   tags:['cajas'],             pills:['Corazón','Regalo','Amor'] },
  { id:9,  img:'imagenes/foto9.jpg',  title:'Arreglo Premium',        desc:'Selección especial de rosas preservadas de la más alta calidad.',                        tags:['flores','ramos'],    pills:['Premium','Rosa','Exclusivo'] },
  { id:10, img:'imagenes/foto10.jpg', title:'Bandeja Gold',           desc:'Bandeja decorativa con acentos dorados. Sofisticación pura.',                             tags:['bandejas'],          pills:['Dorado','Lujosa','Bandeja'] },
  { id:11, img:'imagenes/foto11.jpg', title:'Ramo Bride',             desc:'Ramo de novia completamente personalizado. Tu día perfecto merece esto.',                tags:['ramos','flores'],    pills:['Novia','Boda','Personalizado'] },
  { id:12, img:'imagenes/foto12.jpg', title:'Caja Infinity',          desc:'Caja grande con gran variedad de flores eternas. Para decir mucho.',                     tags:['cajas'],             pills:['Grande','Variedad','Caja'] },
  { id:13, img:'imagenes/foto13.jpg', title:'Arreglo Romance',        desc:'Rosa roja preservada, símbolo eterno del amor verdadero.',                               tags:['flores','ramos'],    pills:['Rosa Roja','Romance','Eterno'] },
  { id:14, img:'imagenes/foto14.jpg', title:'Bandeja Celebration',    desc:'Perfecta para aniversarios y celebraciones que merecen ser recordadas.',                 tags:['bandejas'],          pills:['Aniversario','Celebración','Especial'] },
  { id:15, img:'imagenes/foto15.jpg', title:'Frame Memory',           desc:'Marco decorativo con flores eternas. Convierte un recuerdo en arte.',                    tags:['flores'],            pills:['Marco','Decoración','Recuerdo'] },
  { id:16, img:'imagenes/foto16.jpg', title:'Caja Love',              desc:'Caja especial diseñada para regalos de amor en todas sus formas.',                       tags:['cajas'],             pills:['Amor','Regalo','Especial'] },
  { id:17, img:'imagenes/foto17.jpg', title:'Arreglo Petit',          desc:'Pequeño, encantador y con mucho carácter. El regalo que sorprende.',                     tags:['flores','ramos'],    pills:['Pequeño','Encantador','Detalle'] },
  { id:18, img:'imagenes/foto18.jpg', title:'Bandeja Surprise',       desc:'La sorpresa perfecta para alguien que lo merece todo.',                                   tags:['bandejas'],          pills:['Sorpresa','Especial','Bandeja'] },
  { id:19, img:'imagenes/foto19.jpg', title:'Ramo Eternity',          desc:'Flores que duran para siempre, como los mejores recuerdos.',                             tags:['ramos','flores'],    pills:['Eterno','Ramo','Preservado'] },
  { id:20, img:'imagenes/foto20.jpg', title:'Caja Royal',             desc:'Edición especial limitada. Lo más exclusivo de nuestra colección.',                      tags:['cajas'],             pills:['Limitada','Royal','Exclusivo'] },
];

const WA_BASE = 'https://wa.me/18099999999?text=';

function waLink(title){
  const msg = encodeURIComponent(`Hola Fleur de Charme 🌸 Me interesa reservar el *${title}*. ¿Pueden darme más información?`);
  return `https://wa.link/3pzjqe`;
}

/* Build carousel cards */
const track = document.getElementById('catTrack');
const dotsWrap = document.getElementById('catDots');

function buildCards(filter='all'){
  track.innerHTML = '';
  dotsWrap.innerHTML = '';
  const items = filter==='all' ? catalogItems : catalogItems.filter(i=>i.tags.includes(filter));
  items.forEach((item, idx)=>{
    const card = document.createElement('div');
    card.className = 'cat-card';
    card.innerHTML = `
      <div class="cat-img-wrap">
        <div class="cat-img" style="background-image:url('${item.img}')"></div>
        <span class="cat-num">${String(item.id).padStart(2,'0')}</span>
        <div class="cat-zoom">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
        </div>
      </div>
      <div class="cat-body">
        <span class="cat-tag">Fleur de Charme</span>
        <div class="cat-title">${item.title}</div>
        <div class="cat-desc">${item.desc}</div>
        <div class="cat-tags">${item.pills.map(p=>`<span class="cat-pill">${p}</span>`).join('')}</div>
        <a class="cat-reserve" href="${waLink(item.title)}" target="_blank">
          <svg viewBox="0 0 24 24" fill="#4ade80"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.57a.5.5 0 0 0 .614.614l5.684-1.476A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.98 0-3.842-.582-5.408-1.585l-.374-.232-3.882 1.009 1.01-3.867-.243-.385A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          Reservar
        </a>
      </div>
    `;
    // open lightbox on image click
    card.querySelector('.cat-img-wrap').addEventListener('click', ()=>{
      openCatLight(item);
    });
    track.appendChild(card);

    // dot
    const dot = document.createElement('div');
    dot.className = 'cat-dot' + (idx===0?' active':'');
    dot.addEventListener('click', ()=>{
      const cards = track.querySelectorAll('.cat-card');
      if(cards[idx]) cards[idx].scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'});
    });
    dotsWrap.appendChild(dot);
  });
}

buildCards();

/* Filter buttons */
document.querySelectorAll('.cat-filter-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.cat-filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    buildCards(btn.dataset.filter);
  });
});

/* Sync dots on scroll */
track.addEventListener('scroll', ()=>{
  const cards = track.querySelectorAll('.cat-card');
  const dots = dotsWrap.querySelectorAll('.cat-dot');
  let closest = 0;
  let minDist = Infinity;
  cards.forEach((c,i)=>{
    const dist = Math.abs(c.getBoundingClientRect().left - track.getBoundingClientRect().left);
    if(dist < minDist){ minDist=dist; closest=i; }
  });
  dots.forEach((d,i)=>d.classList.toggle('active', i===closest));
},{passive:true});

/* ─── Catalog Lightbox ─── */
function openCatLight(item){
  document.getElementById('lbImg').src = item.img;
  document.getElementById('lbTitle').textContent = item.title;
  document.getElementById('lbDesc').textContent = item.desc;
  document.getElementById('lbReserve').href = waLink(item.title);
  document.getElementById('lightbox').classList.add('open');
}
function closeLight(){
  document.getElementById('lightbox').classList.remove('open');
}
document.getElementById('lightbox').addEventListener('click', function(e){
  if(e.target===this) closeLight();
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeLight(); });

const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity='1';
      e.target.style.transform='translateY(0)';
    }
  });
},{threshold:.15});

document.querySelectorAll('.wa-grand,.diptych,.trilogy,.sec-head,.colophon,.cat-carousel-wrap').forEach(el=>{
  el.style.opacity='0';
  el.style.transform='translateY(24px)';
  el.style.transition='opacity .8s ease, transform .8s cubic-bezier(.16,1,.3,1)';
  obs.observe(el);
});
