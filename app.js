/* =========================================================
   VALAYRE AGENCY — premium interactions (no dependencies)
   ========================================================= */
(function () {
  'use strict';
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // desktop-only pointer flourishes: real mouse + hover + wide viewport
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lerp = (a, b, n) => (1 - n) * a + n * b;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  // mark JS active so CSS can safely hide-then-reveal (no-JS = everything visible)
  document.documentElement.classList.add('js');

  /* =====================================================
     I18N
  ===================================================== */
  const I18N = {
    es: {
      'nav.approach':'Enfoque','nav.services':'Servicios','nav.work':'Trabajos','nav.pricing':'Presupuesto','nav.cta':'Llamar ahora',
      'hero.eyebrow':'Diseño web a medida · Potenciado con IA',
      'hero.t1':'Páginas web a medida','hero.t2':'con el mejor diseño,','hero.t3':'potenciadas con IA.',
      'hero.lead':'Diseñamos y construimos webs premium a medida, con una estética impecable y funcionalidades potenciadas con inteligencia artificial. Entrega en un máximo de 4 días.',
      'hero.cta1':'Reservar una llamada','hero.cta2':'Llamar ahora',
      'hero.avail':'Disponibles para llamar a cualquier hora','hero.scroll':'Descubrir',
      'man.eyebrow':'Nuestro enfoque',
      'man.t1':'Calidad','man.t2':'de','man.t3':'agencia','man.t4':'grande.','man.t5':'Precio','man.t6':'y','man.t7':'velocidad','man.t8':'que','man.t9':'nadie','man.t10':'iguala.',
      'serv.eyebrow':'Lo que hacemos','serv.title':'El mejor diseño, inteligencia integrada.',
      'serv.1.t':'Webs premium a medida','serv.1.d':'Diseñamos y desarrollamos tu web desde cero: estética impecable, rápida y 100% responsive. Diseño a medida orientado a conversión, sin plantillas. Empezando por el nuestro.',
      'serv.1.a':'Diseño a medida','serv.1.b':'Rendimiento','serv.1.c':'SEO técnico','serv.1.e':'Responsive',
      'serv.2.t':'Funcionalidades con IA','serv.2.d':'Potenciamos tu web con inteligencia artificial: chat, automatizaciones y herramientas a medida que trabajan por ti y elevan la experiencia de tus clientes.',
      'serv.2.a':'Chat con IA','serv.2.b':'Automatización','serv.2.c':'Integraciones','serv.2.e':'Contenido',
      'proc.eyebrow':'Cómo trabajamos','proc.title':'De la primera llamada a online en 4 días.',
      'proc.1.t':'Llamada','proc.1.d':'Entendemos tu negocio y objetivos. Presupuesto cerrado, sin sorpresas.',
      'proc.2.t':'Diseño','proc.2.d':'Dirección visual a medida de tu marca. Tú validas, nosotros pulimos.',
      'proc.3.t':'Desarrollo','proc.3.d':'Construcción rápida y sólida, con las funcionalidades de IA que necesites. Calidad de agencia.',
      'proc.4.t':'Entrega','proc.4.d':'Publicamos, te acompañamos y mantenemos tu web al día. Mantenimiento incluido desde 30&nbsp;€/mes.',
      'stat.days':' días','stat.1':'De la idea a online','stat.2':'Desde, por web a medida','stat.3':'Adaptada a móvil','stat.4':'Disponibles para llamar',
      'work.eyebrow':'Trabajos','work.title':'Selección de proyectos.','work.sub':'Próximamente. Estamos preparando los casos que mejor nos representan.',
      'work.1':'Proyecto','work.2':'Proyecto','work.3':'Proyecto','work.4':'Proyecto','work.soon':'Próximamente',
      'quote.eyebrow':'Presupuesto','quote.title':'Sin planes cerrados. Un precio a medida de lo que necesitas.',
      'quote.from':'Normalmente entre','quote.maint':'mantenimiento incluido · 30–60&nbsp;€/mes',
      'quote.desc':'Cada proyecto es distinto, así que el precio depende de tu necesidad concreta. Llámanos a cualquier hora y te damos un presupuesto claro, sin compromiso.',
      'quote.cta1':'Llamar para presupuesto','quote.cta2':'Escribir un email',
      'cta.eyebrow':'Hablemos','cta.t1':'Cuéntanos tu idea.','cta.t2':'La tienes online esta semana.',
      'cta.avail':'Disponibles para llamar a cualquier hora, cualquier día',
      'footer.contact':'Contacto','footer.address':'Dirección','footer.site':'Navegación',
      'callbar.call':'Llamar ahora','callbar.book':'Presupuesto'
    },
    en: {
      'nav.approach':'Approach','nav.services':'Services','nav.work':'Work','nav.pricing':'Quote','nav.cta':'Call now',
      'hero.eyebrow':'Bespoke web design · AI-powered',
      'hero.t1':'Bespoke websites','hero.t2':'with the best design,','hero.t3':'powered by AI.',
      'hero.lead':'We design and build premium bespoke websites with flawless aesthetics and AI-powered features. Delivered in 4 days max.',
      'hero.cta1':'Book a call','hero.cta2':'Call now',
      'hero.avail':'Available to call at any hour','hero.scroll':'Discover',
      'man.eyebrow':'Our approach',
      'man.t1':'Big','man.t2':'agency','man.t3':'quality.','man.t4':'','man.t5':'Price','man.t6':'and','man.t7':'speed','man.t8':'no','man.t9':'one','man.t10':'matches.',
      'serv.eyebrow':'What we do','serv.title':'The best design, intelligence built in.',
      'serv.1.t':'Premium bespoke websites','serv.1.d':'We design and build your site from scratch: flawless aesthetics, fast and fully responsive. Bespoke, conversion-driven design — no templates. Starting with our own.',
      'serv.1.a':'Bespoke design','serv.1.b':'Performance','serv.1.c':'Technical SEO','serv.1.e':'Responsive',
      'serv.2.t':'AI-powered features','serv.2.d':'We power your site with artificial intelligence: chat, automations and custom tools that work for you and elevate your customers’ experience.',
      'serv.2.a':'AI chat','serv.2.b':'Automation','serv.2.c':'Integrations','serv.2.e':'Content',
      'proc.eyebrow':'How we work','proc.title':'From first call to online in 4 days.',
      'proc.1.t':'Call','proc.1.d':'We understand your business and goals. Fixed quote, no surprises.',
      'proc.2.t':'Design','proc.2.d':'Visual direction tailored to your brand. You validate, we refine.',
      'proc.3.t':'Development','proc.3.d':'Fast, solid build with the AI features you need. Agency-grade quality.',
      'proc.4.t':'Delivery','proc.4.d':'We launch, support you and keep your site running. Maintenance included from €30/mo.',
      'stat.days':' days','stat.1':'From idea to online','stat.2':'From, per custom site','stat.3':'Mobile-ready','stat.4':'Available to call',
      'work.eyebrow':'Work','work.title':'Selected projects.','work.sub':'Coming soon. We are curating the cases that represent us best.',
      'work.1':'Project','work.2':'Project','work.3':'Project','work.4':'Project','work.soon':'Coming soon',
      'quote.eyebrow':'Quote','quote.title':'No fixed plans. A price tailored to what you need.',
      'quote.from':'Typically between','quote.maint':'maintenance included · €30–60/mo',
      'quote.desc':'Every project is different, so the price depends on your specific need. Call us at any hour and we give you a clear quote, no strings attached.',
      'quote.cta1':'Call for a quote','quote.cta2':'Send an email',
      'cta.eyebrow':"Let's talk",'cta.t1':'Tell us your idea.','cta.t2':'It goes live this week.',
      'cta.avail':'Available to call at any hour, any day',
      'footer.contact':'Contact','footer.address':'Address','footer.site':'Navigation',
      'callbar.call':'Call now','callbar.book':'Quote'
    }
  };

  let LANG = 'es';
  function t(k){ return (I18N[LANG] && I18N[LANG][k] != null) ? I18N[LANG][k] : k; }

  function applyLang(lang){
    LANG = I18N[lang] ? lang : 'es';
    $$('[data-i18n]').forEach(el => { const v = t(el.getAttribute('data-i18n')); el.innerHTML = v; });
    document.documentElement.lang = LANG;
    document.body.setAttribute('data-lang', LANG);
    $$('.lang [data-lang-opt]').forEach(o => o.classList.toggle('is-active', o.getAttribute('data-lang-opt') === LANG));
    try { localStorage.setItem('valayre-lang', LANG); } catch(e){}
    enhanceLines();
    refreshCounts();
  }

  /* =====================================================
     SPLIT LINES (mask reveal)
  ===================================================== */
  function enhanceLines(){
    $$('.hero__title .line, .cta__title .line').forEach(line => {
      const txt = line.textContent;
      line.innerHTML = '<span class="split">' + txt + '</span>';
    });
  }

  /* =====================================================
     IN-VIEW WATCHER (scroll-driven, IO-free = robust)
     Drives: reveals, line masks, manifesto words, scramble, counts.
     Content is visible by default (CSS gated on html.js); this only
     adds the animation triggers, with timeout fallbacks so nothing
     can ever stay hidden even if scroll/rAF is throttled.
  ===================================================== */
  let WATCHERS = [];
  function watch(el, cb){ WATCHERS.push({ el: el, cb: cb, done: false }); }
  function checkInView(){
    const h = window.innerHeight || 800;
    for (let i = 0; i < WATCHERS.length; i++){
      const w = WATCHERS[i];
      if (w.done) continue;
      const r = w.el.getBoundingClientRect();
      if (r.top < h * 0.92 && r.bottom > 0){ w.done = true; try { w.cb(); } catch(e){} }
    }
  }
  function revealAllRemaining(){ WATCHERS.forEach(w => { if(!w.done){ w.done = true; try{ w.cb(); }catch(e){} } }); }

  function initInView(){
    $$('.reveal, .line').forEach(el => watch(el, () => el.classList.add('is-in')));
    $$('.manifesto__title .w').forEach(el => watch(el, () => el.classList.add('is-lit')));
    if (!reduce) $$('[data-scramble]').forEach(el => watch(el, () => scramble(el)));
    COUNT_ELS = $$('[data-count]').map(el => ({ el, target: parseFloat(el.getAttribute('data-count')), done:false }));
    COUNT_ELS.forEach(o => watch(o.el, () => animateCount(o)));

    checkInView();
    window.addEventListener('scroll', checkInView, { passive:true });
    window.addEventListener('resize', checkInView);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) checkInView(); });
    // fallbacks: catch above-fold content even if events are throttled
    setTimeout(checkInView, 250);
    setTimeout(checkInView, 900);
    // hard safety: never leave anything hidden
    setTimeout(revealAllRemaining, 4000);
  }

  /* =====================================================
     TEXT SCRAMBLE (decode on reveal)
  ===================================================== */
  const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/·#*';
  function scramble(el){
    const final = el.textContent;
    const len = final.length;
    let frame = 0;
    const total = 26;
    function tick(){
      let out = '';
      const revealed = Math.floor((frame / total) * len);
      for (let i=0;i<len;i++){
        const ch = final[i];
        if (ch === ' ') { out += ' '; continue; }
        out += i < revealed ? ch : GLYPHS[Math.floor(Math.random()*GLYPHS.length)];
      }
      el.textContent = out;
      frame++;
      if (frame <= total) requestAnimationFrame(tick); else el.textContent = final;
    }
    tick();
  }
  /* =====================================================
     COUNT UP
  ===================================================== */
  let COUNT_ELS = [];
  function fmt(el, val){
    const pre = el.getAttribute('data-prefix') || '';
    const sufKey = el.getAttribute('data-i18n-suffix');
    const suf = sufKey ? t(sufKey) : (el.getAttribute('data-suffix') || '');
    el.textContent = pre + Math.round(val) + suf;
  }
  function refreshCounts(){ COUNT_ELS.forEach(o => { if (o.counted) fmt(o.el, o.target); }); }
  function animateCount(o){
    o.counted = true;
    if (reduce){ fmt(o.el, o.target); return; }
    const dur = 1400, t0 = performance.now();
    (function run(now){
      const p = clamp((now - t0) / dur, 0, 1);
      const e = 1 - Math.pow(1 - p, 3);
      fmt(o.el, o.target * e);
      if (p < 1) requestAnimationFrame(run); else fmt(o.el, o.target);
    })(performance.now());
  }

  /* =====================================================
     MARQUEE (seamless loop)
  ===================================================== */
  function initMarquee(){
    const track = $('#marquee'); if(!track || reduce) return;
    track.innerHTML += track.innerHTML; // duplicate for seamless
    let x = 0, w = track.scrollWidth / 2, last = performance.now();
    function loop(now){
      const dt = now - last; last = now;
      x -= dt * 0.045;
      if (-x >= w) x += w;
      track.style.transform = 'translateX(' + x + 'px)';
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* =====================================================
     CUSTOM CURSOR + MAGNETIC
  ===================================================== */
  function initCursor(){
    if (!canHover || reduce || window.innerWidth < 1024) return;
    const cur = $('#cursor'), label = $('#cursorLabel');
    document.body.classList.add('has-cursor');
    cur.classList.add('is-active');
    let mx = innerWidth/2, my = innerHeight/2, cx = mx, cy = my;
    addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      // flip cursor to light while it's over any dark section (cursor has pointer-events:none, so it's ignored)
      const under = document.elementFromPoint(mx, my);
      cur.classList.toggle('on-dark', !!(under && under.closest('.cta')));
    }, { passive:true });
    (function render(){
      cx = lerp(cx, mx, 0.2); cy = lerp(cy, my, 0.2);
      cur.style.transform = 'translate('+cx+'px,'+cy+'px) translate(-50%,-50%)';
      requestAnimationFrame(render);
    })();

    $$('[data-cursor], a, button').forEach(el=>{
      el.addEventListener('mouseenter', ()=>{
        cur.classList.add('is-hover');
        const lbl = el.getAttribute('data-cursor');
        label.textContent = lbl || '';
      });
      el.addEventListener('mouseleave', ()=>{ cur.classList.remove('is-hover'); label.textContent=''; });
    });

    // magnetic
    $$('[data-magnetic]').forEach(el=>{
      const strength = 0.32;
      el.addEventListener('mousemove', e=>{
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width/2)) * strength;
        const dy = (e.clientY - (r.top + r.height/2)) * strength;
        el.style.transform = 'translate('+dx+'px,'+dy+'px)';
      });
      el.addEventListener('mouseleave', ()=>{ el.style.transform=''; });
    });
  }

  /* =====================================================
     NAV + PROGRESS + CALLBAR
  ===================================================== */
  function initScroll(){
    const nav = $('#nav'), prog = $('#scrollProgress'), callbar = $('#callbar'), hero = $('#hero');
    let last = 0;
    function onScroll(){
      const y = scrollY;
      nav.classList.toggle('is-scrolled', y > 8);
      nav.classList.toggle('is-hidden', y > 200 && y > last && !nav.matches(':hover'));
      last = y;
      const h = document.documentElement.scrollHeight - innerHeight;
      prog.style.width = (h>0 ? (y/h)*100 : 0) + '%';
      const hb = hero ? hero.offsetHeight : 500;
      callbar.classList.toggle('is-visible', y > hb - 160);
    }
    onScroll();
    addEventListener('scroll', onScroll, { passive:true });
  }

  /* =====================================================
     WEBGL SHADER BACKGROUND (subtle flow field)
  ===================================================== */
  function initShader(){
    if (reduce) return;
    const canvas = $('#fxCanvas');
    let gl;
    try { gl = canvas.getContext('webgl', { alpha:true, antialias:false, premultipliedAlpha:false }); } catch(e){}
    if (!gl){ canvas.style.display='none'; return; }

    const vert = 'attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }';
    const frag = [
      'precision highp float;',
      'uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse;',
      // hash + noise
      'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }',
      'float noise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*(3.0-2.0*f);',
      '  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x), mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x), u.y); }',
      'float fbm(vec2 p){ float v=0.0; float a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }',
      'void main(){',
      '  vec2 uv = gl_FragCoord.xy / u_res.xy;',
      '  vec2 st = uv; st.x *= u_res.x/u_res.y;',
      '  float t = u_time*0.03;',
      '  vec2 mo = (u_mouse/u_res - 0.5) * 0.4;',
      '  float n = fbm(st*2.2 + vec2(t, -t) + mo);',
      '  n = fbm(st*2.2 + n*1.4 + vec2(t*1.3, t));',       // domain warp
      '  float lines = abs(sin(n*7.0 + t*2.0));',
      '  float contour = smoothstep(0.0, 0.06, lines) * (1.0 - smoothstep(0.9, 1.0, lines));',
      '  float alpha = (1.0 - contour) * 0.05;',            // faint ink contours
      '  float vig = smoothstep(1.15, 0.2, length(uv-0.5));',
      '  alpha *= vig;',
      '  vec3 ink = vec3(0.055, 0.067, 0.086);',
      '  gl_FragColor = vec4(ink, alpha);',
      '}'
    ].join('\n');

    function sh(type, src){ const s=gl.createShader(type); gl.shaderSource(s,src); gl.compileShader(s); return s; }
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)){ canvas.style.display='none'; return; }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog,'p');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const uRes = gl.getUniformLocation(prog,'u_res');
    const uTime = gl.getUniformLocation(prog,'u_time');
    const uMouse = gl.getUniformLocation(prog,'u_mouse');
    let mouse = [innerWidth/2, innerHeight/2];
    addEventListener('mousemove', e=>{ mouse=[e.clientX, innerHeight-e.clientY]; }, { passive:true });

    function resize(){
      const dpr = Math.min(devicePixelRatio||1, 1.6);
      canvas.width = innerWidth*dpr; canvas.height = innerHeight*dpr;
      gl.viewport(0,0,canvas.width,canvas.height);
    }
    resize(); addEventListener('resize', resize);
    const start = performance.now();
    (function draw(now){
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now-start)/1000);
      gl.uniform2f(uMouse, mouse[0]*(canvas.width/innerWidth), mouse[1]*(canvas.height/innerHeight));
      gl.drawArrays(gl.TRIANGLES,0,3);
      requestAnimationFrame(draw);
    })(start);
  }

  /* =====================================================
     PRELOADER
  ===================================================== */
  function initLoader(done){
    const loader = $('#loader'), fill = $('#loaderFill'), count = $('#loaderCount');
    document.body.classList.add('is-loading');
    let p = 0;
    const iv = setInterval(()=>{
      p += Math.random()*16 + 6;
      if (p >= 100){ p = 100; clearInterval(iv); setTimeout(finish, 260); }
      fill.style.width = p + '%';
      count.textContent = Math.floor(p);
    }, 130);
    function finish(){
      loader.classList.add('is-done');
      document.body.classList.remove('is-loading');
      done();
    }
    // safety
    setTimeout(()=>{ if(!loader.classList.contains('is-done')){ clearInterval(iv); finish(); } }, 3000);
  }

  /* =====================================================
     INIT
  ===================================================== */
  document.addEventListener('DOMContentLoaded', ()=>{
    // language — default ES (primary market), remember explicit choice
    let lang='es';
    try{ lang = localStorage.getItem('valayre-lang') || 'es'; }catch(e){}
    applyLang(I18N[lang]?lang:'es');

    $('#langSwitch').addEventListener('click', ()=> applyLang(LANG==='es'?'en':'es'));

    const yr=$('#year'); if(yr) yr.textContent=new Date().getFullYear();

    initShader();
    initCursor();
    initScroll();
    initMarquee();

    // start reveals after loader so entrance feels intentional
    initLoader(()=>{ initInView(); });
  });
})();
