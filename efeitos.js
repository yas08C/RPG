/* O Oráculo Perdido · efeitos.js
   Uso: salve na mesma pasta do HTML e adicione, logo antes de </body>:
   <script src="efeitos.js"></script>
   Não precisa mexer em mais nada do seu código. */
(() => {
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;

const css = `
@property --n{syntax:"<integer>";initial-value:0;inherits:false}

/* ===== 1 Transition + 10 sublinhado animado: abas, chips, tags, linhas ===== */
nav button.aba{position:relative}
nav button.aba::after{content:"";position:absolute;left:0;right:0;bottom:-3px;height:3px;background:var(--vinho);transform:scaleX(0);transition:transform .35s ease}
nav button.aba:hover::after{transform:scaleX(1)}
nav button.aba[aria-selected="true"]::after{background:var(--ouro);transform:scaleX(1)}
.livro .chip{transition:transform .25s,background .25s,color .25s}
.livro .chip:hover{transform:translateY(-3px)}
.livro .chip[aria-selected="true"]{transform:scale(1.08)}
.tag{transition:transform .25s}.tag:hover{transform:scale(1.12) rotate(-2deg)}
tbody tr{transition:background .2s,transform .25s}tbody tr:hover{transform:translateX(5px)}
.livro a{position:relative;text-decoration:none}
.livro a::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:2px;background:var(--ouro);transform:scaleX(0);transition:transform .35s}
.livro a:hover::after{transform:scaleX(1)}

/* ===== 11 Ping na aba ativa ===== */
nav button.aba[aria-selected="true"]::before{content:"";position:absolute;top:9px;right:5px;width:7px;height:7px;border-radius:50%;background:var(--ouro);animation:efPing 1.6s ease-out infinite}
@keyframes efPing{0%{box-shadow:0 0 0 0 var(--ouro)}100%{box-shadow:0 0 0 10px transparent}}

/* ===== 20 :has() — foco no que importa ===== */
nav:has(.aba:hover) .aba:not(:hover):not([aria-selected="true"]){opacity:.45}
.grade:has(.card:hover) .card:not(:hover){opacity:.5;filter:saturate(.3)}
section:has(input:focus,select:focus,textarea:focus){border-top-color:var(--vinho);box-shadow:0 8px 30px rgba(113,54,168,.35)}
.filtros:has(input:not(:placeholder-shown)) input{border-color:var(--ouro)}

/* ===== 3 Flip 3D nos cards da home ===== */
.card[data-ir]{position:relative;min-height:110px;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.4,.2,.2,1),opacity .3s,filter .3s,box-shadow .3s}
.card[data-ir]:hover:not(:disabled){transform:perspective(800px) rotateY(180deg)}
.ef-f,.ef-v{backface-visibility:hidden;display:block}
.ef-v{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transform:rotateY(180deg);background:var(--ouro);color:#120e06;font-family:var(--serifa);font-size:1.1rem;letter-spacing:.12em;text-transform:uppercase}

/* ===== 5 Grid + entrada escalonada ===== */
@keyframes efEntra{from{opacity:0;transform:translateY(14px)}}
main>div:not([hidden]){animation:efEntra .5s ease backwards}
.grade>*{animation:efEntra .55s ease backwards;animation-delay:calc(var(--i,0)*80ms)}
.cap:not([hidden]){animation:efEntra .4s ease backwards}

/* ===== 13 Botões com preenchimento deslizante ===== */
.acoes button{position:relative;overflow:hidden;isolation:isolate}
.acoes button::before{content:"";position:absolute;inset:0;background:var(--ouro);transform:translateX(-101%);transition:transform .35s ease;z-index:-1}
.acoes button:hover:not(:disabled)::before{transform:none}
.acoes button:hover:not(:disabled){background:transparent;color:#120e06;box-shadow:none}

/* ===== 2 Keyframes: cadeados quicam ===== */
.ef-lock{display:inline-block;animation:efQuica 1.1s cubic-bezier(.3,0,.7,1) infinite alternate;animation-delay:calc(var(--i)*.2s)}
@keyframes efQuica{from{transform:translateY(-3px)}to{transform:translateY(3px) scaleY(.85)}}

/* ===== brilho dourado no título ===== */
header h1{background:linear-gradient(90deg,var(--roxo-escuro) 0 40%,#fff6d8 50%,var(--roxo-escuro) 60% 100%);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:efBrilho 6s linear infinite}
@keyframes efBrilho{from{background-position:100% 0}to{background-position:-100% 0}}

/* ===== 9 Máquina de escrever ===== */
.ef-type{font:700 15px ui-monospace,Consolas,monospace;color:var(--ouro);overflow:hidden;white-space:nowrap;border-right:2px solid var(--ouro);width:19ch;margin-bottom:10px;animation:efDigita 4s steps(19) infinite,efPisca .6s step-end infinite}
@keyframes efDigita{0%{width:0}60%,100%{width:19ch}}
@keyframes efPisca{50%{border-color:transparent}}

/* ===== 6 Marquee ===== */
.ef-ticker{overflow:hidden;border-bottom:1px solid var(--borda);background:#0a0810;font:700 11px ui-monospace,Consolas,monospace;letter-spacing:.25em;text-transform:uppercase;color:var(--cinza)}
.ef-ticker div{display:flex;width:max-content;animation:efMq 45s linear infinite}
.ef-ticker:hover div{animation-play-state:paused}
.ef-ticker span{padding:9px 22px;white-space:nowrap}
.ef-ticker span::before{content:"✦";color:var(--ouro);margin-right:22px}
@keyframes efMq{to{transform:translateX(-50%)}}

/* ===== ferramentas do cabeçalho: 7 clip-path, 8 toggle, 17 equalizador ===== */
header{position:relative}
.ef-tools{position:absolute;top:16px;right:20px;display:flex;align-items:center;gap:16px}
.ef-emb{width:44px;height:44px;animation:efFlut 3s ease-in-out infinite}
.ef-emb div{width:100%;height:100%;background:var(--ouro);animation:efMorf 6s ease-in-out infinite}
@keyframes efFlut{50%{transform:translateY(-6px) rotate(6deg)}}
@keyframes efMorf{0%,100%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%);transform:rotate(0)}33%{clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);transform:rotate(90deg)}66%{clip-path:polygon(50% 0,50% 0,100% 100%,0 100%);transform:rotate(0)}}
.ef-eq{display:flex;align-items:flex-end;gap:4px;height:22px}
.ef-eq i{width:5px;height:100%;border-radius:2px;background:var(--ouro);transform-origin:bottom;animation:efEq 1.2s ease-in-out infinite}
.ef-eq i:nth-child(2){animation-delay:.2s}.ef-eq i:nth-child(3){animation-delay:.4s}.ef-eq i:nth-child(4){animation-delay:.1s}
body:has(#efVeu:checked) .ef-eq i{animation-duration:.5s}
@keyframes efEq{0%,100%{transform:scaleY(.2)}50%{transform:scaleY(1)}}
.ef-sw{position:relative;display:flex;align-items:center;gap:8px;cursor:pointer;font:700 11px ui-monospace,Consolas,monospace;letter-spacing:.2em;text-transform:uppercase;color:var(--cinza)}
.ef-sw input{position:absolute;opacity:0;width:0;height:0}
.ef-tr{width:46px;height:26px;border-radius:13px;background:#2a2036;border:1px solid var(--borda);position:relative;transition:background .3s}
.ef-tr::after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:var(--ouro);transition:transform .3s cubic-bezier(.5,1.6,.5,1)}
.ef-sw input:checked+.ef-tr{background:var(--veu)}
.ef-sw input:checked+.ef-tr::after{transform:translateX(20px)}
.ef-sw:has(input:focus-visible) .ef-tr{outline:2px solid var(--ouro);outline-offset:2px}
body:has(#efVeu:checked){--ouro:#b77ae6;--roxo:#b77ae6;--roxo-escuro:#e4ccff;--ouro-escuro:#5b2a8a;--borda:#2d1d44;--degrade:linear-gradient(120deg,#3a1a5c,#7136a8 55%,#4b2380)}

/* ===== 15 Menu hambúrguer (celular) ===== */
.ef-ham{display:none;flex-direction:column;gap:5px;padding:8px!important;margin:4px 0 8px;border:0!important;background:transparent!important;box-shadow:none!important}
.ef-ham span{display:block;width:26px;height:3px;border-radius:2px;background:var(--ouro);transition:transform .35s ease,opacity .2s}
.ef-ham.on span:nth-child(1){transform:translateY(8px) rotate(45deg)}
.ef-ham.on span:nth-child(2){opacity:0}
.ef-ham.on span:nth-child(3){transform:translateY(-8px) rotate(-45deg)}
@media(max-width:700px){
 .ef-ham{display:flex}#abas{display:none}
 #abas.ef-open{display:flex;flex-direction:column;animation:efEntra .3s ease backwards}
 .ef-tools{position:static;margin-bottom:8px}.ef-emb{display:none}
}

/* ===== 4 Spinner + 16 pontos em onda: carregando o mapa ===== */
.ef-load{position:absolute;inset:0;z-index:3;background:var(--branco-fundo);display:flex;flex-direction:column;align-items:center;gap:16px;padding-top:160px;transition:opacity .4s}
.ef-load.sai{opacity:0}
.ef-ring{width:46px;height:46px;border-radius:50%;border:4px solid var(--borda);border-top-color:var(--ouro);animation:efGira .8s linear infinite}
@keyframes efGira{to{transform:rotate(360deg)}}
.ef-dots{display:flex;gap:8px}
.ef-dots i{width:12px;height:12px;border-radius:50%;background:var(--vinho);animation:efOnda 1s ease-in-out infinite}
.ef-dots i:nth-child(2){animation-delay:.15s}.ef-dots i:nth-child(3){animation-delay:.3s}
@keyframes efOnda{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-14px);opacity:1}}
.ef-load p{color:var(--cinza);font-style:italic}

/* ===== 12 Skeleton nas listas ===== */
.ef-skel>*{display:none}
.ef-skel::before{content:"";display:block;height:280px;border-radius:6px;background:repeating-linear-gradient(to bottom,var(--cinza-claro) 0 22px,transparent 22px 42px);animation:efSk 1.1s ease-in-out infinite}
@keyframes efSk{50%{opacity:.35}}

/* ===== 14 Accordion nos grupos ===== */
.ef-acc-h{display:flex;align-items:center;cursor:pointer;user-select:none}
.ef-chev{margin-left:auto;font-style:normal;transition:transform .3s}
.ef-acc-h[aria-expanded="false"] .ef-chev{transform:rotate(-90deg)}
.ef-acc{display:grid;grid-template-rows:0fr;transition:grid-template-rows .4s ease}
.ef-acc.open{grid-template-rows:1fr}
.ef-acc>div{overflow:hidden}

/* ===== 18 Tooltip ===== */
[data-tip]{cursor:help}
#efTip{position:fixed;z-index:50;padding:5px 10px;border-radius:4px;background:var(--ouro);color:#120e06;font-size:12px;font-weight:700;pointer-events:none;opacity:0;transform:translateY(4px);transition:opacity .2s,transform .2s;white-space:nowrap}
#efTip.on{opacity:1;transform:none}

/* ===== 19 Contadores ===== */
@keyframes efCont{from{--n:0}}
.ef-stats{display:flex;gap:30px;flex-wrap:wrap;margin-top:14px;padding-bottom:10px}
.ef-stat{display:flex;flex-direction:column}
.ef-n{font:700 2rem var(--serifa);color:var(--roxo-escuro);counter-reset:n var(--n);animation:efCont 2.2s ease-out}
.ef-n::after{content:counter(n)}
.ef-stat span{font-size:.8rem;letter-spacing:.15em;text-transform:uppercase;color:#e6d9f5}

/* ===== brasas subindo + barra de progresso ===== */
.ef-embers{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden}
.ef-embers i{position:absolute;bottom:-12px;left:var(--x);width:var(--s);height:var(--s);border-radius:50%;background:var(--ouro);opacity:0;animation:efSobe var(--d) linear var(--a) infinite}
@keyframes efSobe{0%{transform:translate(0,0);opacity:0}10%{opacity:.7}100%{transform:translate(var(--dx),-105vh);opacity:0}}
.ef-prog{position:fixed;top:0;left:0;width:100%;height:3px;background:var(--ouro);transform-origin:0 50%;transform:scaleX(0);z-index:60}
@supports (animation-timeline:scroll()){.ef-prog{animation:efProg linear both;animation-timeline:scroll(root)}}
@keyframes efProg{to{transform:scaleX(1)}}

/* ===== d20 ===== */
.ef-d20{position:fixed;right:18px;bottom:18px;z-index:40;width:64px;height:64px;padding:0;border:0;background:var(--ouro);color:#120e06;clip-path:polygon(50% 0,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%);display:grid;place-items:center;font:700 1.15rem var(--serifa);letter-spacing:0;transition:transform .25s}
.ef-d20:hover:not(:disabled){transform:scale(1.12) rotate(-8deg);background:var(--vinho);color:#120e06;box-shadow:none}
.ef-d20.rola{animation:efRola .8s ease-in-out}
.ef-d20.crit{background:#fff6d8;animation:efPulsa .6s ease-in-out 3}
.ef-d20.falha{background:var(--sangue);color:#fff;animation:efTrema .4s linear 2}
@keyframes efRola{to{transform:rotate(720deg) scale(1.15)}}
@keyframes efPulsa{50%{transform:scale(1.3)}}
@keyframes efTrema{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
`;
const st = document.createElement("style");
st.textContent = css;
document.head.append(st);

/* ---------- cabeçalho ---------- */
const header = $("header");
header.insertAdjacentHTML("afterbegin",
 `<div class="ef-tools"><div class="ef-eq" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
  <label class="ef-sw" title="Modo Véu"><input type="checkbox" id="efVeu"><span class="ef-tr"></span>Véu</label>
  <div class="ef-emb" aria-hidden="true"><div></div></div></div>`);
$(".sub", header).insertAdjacentHTML("afterend", `<p class="ef-type" aria-hidden="true">Bem-vindo, semideus</p>`);
$("#abas").insertAdjacentHTML("beforebegin",
 `<button class="ef-ham" aria-label="Abrir menu" aria-expanded="false"><span></span><span></span><span></span></button>`);

const veu = $("#efVeu");
try { veu.checked = localStorage.getItem("ef-veu") === "1"; } catch (e) {}
veu.addEventListener("change", () => { try { localStorage.setItem("ef-veu", veu.checked ? "1" : "0"); } catch (e) {} });

const ham = $(".ef-ham"), abas = $("#abas");
ham.addEventListener("click", () => {
  const on = abas.classList.toggle("ef-open");
  ham.classList.toggle("on", on); ham.setAttribute("aria-expanded", on);
});
abas.addEventListener("click", (e) => {
  if (e.target.closest(".aba")) { abas.classList.remove("ef-open"); ham.classList.remove("on"); ham.setAttribute("aria-expanded", "false"); }
});

/* ---------- faixa de frases ---------- */
const frases = ["Conhece-te a ti mesmo", "Nada em excesso", "Cuidado com a Névoa", "O Véu é fino aqui", "Honra aos deuses", "Atena observa", "Hermes sorri para quem foge", "O Oráculo se cala", "Delfos ainda lembra"];
header.insertAdjacentHTML("afterend",
 `<div class="ef-ticker" aria-hidden="true"><div>${[...frases, ...frases].map((f) => `<span>${f}</span>`).join("")}</div></div>`);

/* ---------- abas bloqueadas quicam ---------- */
$$(".aba.bloq").forEach((b, i) => { b.innerHTML = b.innerHTML.replace("🔒", `<span class="ef-lock" style="--i:${i}">🔒</span>`); });

/* ---------- cards da home: flip + entrada escalonada ---------- */
$$("#p-inicio .card[data-ir]").forEach((c) => {
  c.innerHTML = `<span class="ef-f">${c.innerHTML}</span><span class="ef-v">Entrar ➜</span>`;
});
$$(".grade").forEach((g) => [...g.children].forEach((c, i) => c.style.setProperty("--i", i)));

/* ---------- contadores ---------- */
const nCri = $$("#b-lista tbody tr").length, nIt = $$("#i-lista tbody tr").length, nCap = $$("#p-livro .cap").length;
$("#p-inicio .destaque").insertAdjacentHTML("beforeend",
 `<div class="ef-stats">${[[nCri, "criaturas"], [nIt, "itens"], [nCap, "capítulos"]].map(([n, t]) => `<div class="ef-stat"><b class="ef-n" style="--n:${n}"></b><span>${t}</span></div>`).join("")}</div>`);

/* ---------- carregando o mapa ---------- */
const mq = $(".mapa-quadro"), fr = $("#mapa");
mq.style.position = "relative";
mq.insertAdjacentHTML("beforeend", `<div class="ef-load" hidden><div class="ef-ring"></div><div class="ef-dots"><i></i><i></i><i></i></div><p>Abrindo o mapa…</p></div>`);
const ld = $(".ef-load");
let tm;
const fim = () => { ld.classList.add("sai"); setTimeout(() => { ld.hidden = true; ld.classList.remove("sai"); }, 400); };
new MutationObserver(() => { ld.hidden = false; ld.classList.remove("sai"); clearTimeout(tm); tm = setTimeout(fim, 4000); })
  .observe(fr, { attributes: true, attributeFilter: ["src"] });
fr.addEventListener("load", () => { clearTimeout(tm); setTimeout(fim, 300); });

/* ---------- bestiário e itens: tooltip, accordion, skeleton ---------- */
const TIPO = { C: "Capanga", P: "Padrão", E: "Elite", B: "Chefe" };
const TH = { NA: "Nível de Ameaça", Def: "Defesa", Atq: "Bônus de ataque" };
function melhora(el) {
  $$("th", el).forEach((t) => { const x = TH[t.textContent.trim()]; if (x && !t.dataset.tip) t.dataset.tip = x; });
  if (el.id === "b-lista") $$(".tag", el).forEach((t) => {
    const m = t.textContent.trim().match(/^(\d)\s*([CPEB])$/);
    if (m && !t.dataset.tip) t.dataset.tip = `Nível ${m[1]} · ${TIPO[m[2]]}`;
  });
  $$("h3.grupo", el).forEach((h) => {
    if (h.dataset.ef) return;
    h.dataset.ef = 1; h.classList.add("ef-acc-h"); h.tabIndex = 0;
    h.setAttribute("aria-expanded", "true"); h.setAttribute("role", "button");
    const nodes = [];
    for (let n = h.nextSibling; n && !(n.nodeType === 1 && n.matches("h3.grupo")); n = n.nextSibling) nodes.push(n);
    const wrap = document.createElement("div"), inner = document.createElement("div");
    wrap.className = "ef-acc open"; wrap.append(inner); h.after(wrap);
    nodes.forEach((x) => inner.append(x));
    h.insertAdjacentHTML("beforeend", `<i class="ef-chev" aria-hidden="true">▾</i>`);
    const alterna = () => { const on = wrap.classList.toggle("open"); h.setAttribute("aria-expanded", on); };
    h.addEventListener("click", alterna);
    h.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); alterna(); } });
  });
}
const sk = (el) => {
  if (reduz) return;
  el.classList.add("ef-skel"); clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("ef-skel"), 260);
};
[$("#b-lista"), $("#i-lista")].forEach((el) => {
  melhora(el);
  new MutationObserver(() => melhora(el)).observe(el, { childList: true });
});
$("#b-busca").addEventListener("input", () => sk($("#b-lista")));
$("#i-busca").addEventListener("input", () => sk($("#i-lista")));
$("#b-tipo").addEventListener("change", () => sk($("#b-lista")));
$("#i-rar").addEventListener("change", () => sk($("#i-lista")));
[["bestiario", "#b-lista"], ["itens", "#i-lista"]].forEach(([p, l]) =>
  new MutationObserver(() => { if (!$("#p-" + p).hidden) sk($(l)); }).observe($("#p-" + p), { attributes: true, attributeFilter: ["hidden"] }));

/* ---------- tooltip flutuante ---------- */
document.body.insertAdjacentHTML("beforeend", `<div id="efTip" role="tooltip"></div>`);
const tip = $("#efTip");
document.addEventListener("mouseover", (e) => {
  const t = e.target.closest("[data-tip]");
  if (!t) { tip.classList.remove("on"); return; }
  tip.textContent = t.dataset.tip;
  const r = t.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight;
  tip.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + "px";
  tip.style.top = (r.top - h - 8 < 8 ? r.bottom + 8 : r.top - h - 8) + "px";
  tip.classList.add("on");
});
addEventListener("scroll", () => tip.classList.remove("on"), { passive: true });

/* ---------- brasas, progresso e d20 ---------- */
const rnd = (a, b) => a + Math.random() * (b - a);
document.body.insertAdjacentHTML("afterbegin",
 `<div class="ef-prog" aria-hidden="true"></div><div class="ef-embers" aria-hidden="true">${
  Array.from({ length: 16 }, () => `<i style="--x:${rnd(0, 100).toFixed(1)}%;--s:${rnd(2, 5).toFixed(1)}px;--d:${rnd(9, 18).toFixed(1)}s;--a:-${rnd(0, 14).toFixed(1)}s;--dx:${rnd(-60, 60).toFixed(0)}px"></i>`).join("")}</div>`);
if (!(window.CSS && CSS.supports && CSS.supports("animation-timeline", "scroll()"))) {
  const p = $(".ef-prog");
  addEventListener("scroll", () => { p.style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`; }, { passive: true });
}

document.body.insertAdjacentHTML("beforeend", `<button class="ef-d20" id="efD20" aria-label="Rolar d20"><span id="efD20n">d20</span></button>`);
const d = $("#efD20"), num = $("#efD20n");
let rolando = false;
d.addEventListener("click", () => {
  if (rolando) return;
  rolando = true; d.className = "ef-d20 rola";
  let i = 0;
  const iv = setInterval(() => {
    num.textContent = 1 + Math.floor(Math.random() * 20);
    if (++i > 10) {
      clearInterval(iv);
      const r = 1 + Math.floor(Math.random() * 20);
      num.textContent = r;
      d.className = "ef-d20" + (r === 20 ? " crit" : r === 1 ? " falha" : "");
      rolando = false;
    }
  }, 70);
});
})();
