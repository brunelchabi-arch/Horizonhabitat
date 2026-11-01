(function(){
var WA="22900000000";
function wa(t){window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(t),"_blank","noopener")}
function $(i){return document.getElementById(i)}
var chips=document.querySelectorAll(".chip"),cards=document.querySelectorAll("#list .card"),empty=$("empty"),list=$("list");
var st={f:"all",v:"all",t:"all",b:"all"};
function apply(){
if(!list)return;var n=0;
chips.forEach(function(c){c.setAttribute("aria-pressed",c.dataset.f===st.f?"true":"false")});
cards.forEach(function(c){
var k=c.dataset.k,p=+c.dataset.p;
var ok=(st.f==="all"||k.indexOf(st.f)>-1)&&(st.t==="all"||k.indexOf(st.t)>-1)&&(st.v==="all"||c.dataset.v===st.v)&&
(st.b==="all"||(st.b==="low"&&p<15e6)||(st.b==="mid"&&p>=15e6&&p<=1e8)||(st.b==="high"&&p>1e8));
c.style.display=ok?"":"none";if(ok)n++;});
if(empty)empty.hidden=n>0;var cn=$("cnt");if(cn)cn.textContent=n+(n>1?" biens correspondent":" bien correspond")+" à votre sélection";
}
chips.forEach(function(c){c.addEventListener("click",function(){st.f=c.dataset.f;apply()})});
apply();var sf=$("sf");
if(sf){
var q=new URLSearchParams(location.search);
if(list&&q.has("v")){st.v=q.get("v");st.t=q.get("t")||"all";st.b=q.get("b")||"all";
$("f-ville").value=st.v;$("f-type").value=st.t;$("f-budget").value=st.b;apply()}
sf.addEventListener("submit",function(e){
e.preventDefault();
var v=$("f-ville").value,t=$("f-type").value,b=$("f-budget").value;
if(!list){location.href="biens.html?v="+encodeURIComponent(v)+"&t="+t+"&b="+b;return}
st={f:"all",v:v,t:t,b:b};apply();$("biens").scrollIntoView({behavior:"smooth"});
});}
if($("reset"))$("reset").addEventListener("click",function(){st={f:"all",v:"all",t:"all",b:"all"};if(sf)sf.reset();apply()});
if($("yr"))$("yr").textContent=new Date().getFullYear();
document.querySelectorAll(".price a").forEach(function(a){a.addEventListener("click",function(e){
e.preventDefault();wa("Bonjour, je souhaite visiter : "+a.dataset.b)})});
if($("ef"))$("ef").addEventListener("submit",function(e){
e.preventDefault();
wa("Bonjour, je m’appelle "+$("e-nom").value+". Je souhaite une estimation gratuite pour mon bien ("+$("e-type").value+") situé à "+$("e-lieu").value+".");
});
})();
(function(){
function $(i){return document.getElementById(i)}
var rm=matchMedia("(prefers-reduced-motion:reduce)").matches,hd=document.querySelector("header");
function sc(){hd.classList.toggle("scrolled",scrollY>8)}sc();addEventListener("scroll",sc,{passive:true});
var bg=document.querySelector(".burger"),nv=$("nav");
function menu(o){hd.classList.toggle("open",o);bg.setAttribute("aria-expanded",o)}
bg.addEventListener("click",function(){menu(!hd.classList.contains("open"))});
nv.addEventListener("click",function(e){if(e.target.tagName==="A")menu(false)});
addEventListener("keydown",function(e){if(e.key==="Escape")menu(false)});
function count(d){var b=d.querySelector("b[data-n]");if(!b)return;var N=+b.dataset.n,t0=null;
function f(t){t0=t0||t;var k=Math.min((t-t0)/900,1);b.textContent=b.dataset.p+Math.round(N*(1-Math.pow(1-k,3)))+b.dataset.s;if(k<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
document.querySelectorAll(".stats b").forEach(function(b){var m=b.textContent.match(/^(\D*)(\d+)(.*)$/);if(m){b.dataset.p=m[1];b.dataset.n=m[2];b.dataset.s=m[3]}});
var io=("IntersectionObserver" in window&&!rm)?new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target);count(x.target)}})},{threshold:.25}):null;
if(io)document.querySelectorAll(".trust>div,.steps li,.stats>div").forEach(function(el){
el.style.transitionDelay=(Array.prototype.indexOf.call(el.parentNode.children,el)*90)+"ms";el.classList.add("rv");io.observe(el)});
var favs=[];try{favs=JSON.parse(localStorage.getItem("hh_fav")||"[]")}catch(e){}
var dlg=document.createElement("dialog");dlg.className="fiche";document.body.appendChild(dlg);
dlg.addEventListener("click",function(e){
if(e.target===dlg||e.target.hasAttribute("data-x"))dlg.close();
if(e.target.hasAttribute("data-v"))window.open("https://wa.me/22900000000?text="+encodeURIComponent("Bonjour, je souhaite visiter : "+dlg.dataset.t),"_blank","noopener")});
function openF(c){var t=c.querySelector("h3").textContent;dlg.dataset.t=t;
dlg.innerHTML='<div class="card" style="border:0;border-radius:0"><div class="fp"></div><div class="in"><h3></h3><div class="loc"></div><div class="facts"></div><div class="price"></div><p class="note">Dossier et titre contrôlés avant publication. Visite sur place ou en visio.</p><div class="frow"><button class="btn" type="button" data-v>Organiser une visite</button><button class="btn" type="button" data-x style="background:transparent;color:var(--ink);border:1px solid var(--line)">Fermer</button></div></div></div>';
var p=c.querySelector(".pic").cloneNode(true);var fv=p.querySelector(".fav");if(fv)fv.remove();
dlg.querySelector(".fp").appendChild(p);dlg.querySelector("h3").textContent=t;
dlg.querySelector(".loc").textContent=c.querySelector(".loc").textContent;
dlg.querySelector(".facts").innerHTML=c.querySelector(".facts").innerHTML;
dlg.querySelector(".price").textContent=c.querySelector(".price").firstChild.textContent;
dlg.showModal()}
document.querySelectorAll("#list .card,#feat .card").forEach(function(c){
var t=c.querySelector("h3").textContent,b=document.createElement("button");
b.type="button";b.className="fav";b.setAttribute("aria-label","Favori : "+t);b.setAttribute("aria-pressed",favs.indexOf(t)>-1);
b.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.600-7 10-7 10z"/></svg>';
c.querySelector(".pic").appendChild(b);
b.addEventListener("click",function(e){e.stopPropagation();var on=b.getAttribute("aria-pressed")!=="true";b.setAttribute("aria-pressed",on);
favs=favs.filter(function(x){return x!==t});if(on)favs.push(t);try{localStorage.setItem("hh_fav",JSON.stringify(favs))}catch(e){}});
c.tabIndex=0;c.setAttribute("role","button");c.setAttribute("aria-label","Voir la fiche : "+t);
c.addEventListener("click",function(e){if(!e.target.closest("a,.fav"))openF(c)});
c.addEventListener("keydown",function(e){if((e.key==="Enter"||e.key===" ")&&e.target===c){e.preventDefault();openF(c)}})});
if($("s-prix")){var fm=new Intl.NumberFormat("fr-FR");
function sim(){var pr=+$("s-prix").value,ap=+$("s-apport").value,du=+$("s-duree").value,tx=+$("s-taux").value;
var P=pr*(1-ap/100),r=tx/1200,n=du*12,m=P*r/(1-Math.pow(1+r,-n));
$("o-prix").textContent=fm.format(pr)+" FCFA";$("o-apport").textContent=ap+" %";$("o-duree").textContent=du+" ans";$("o-taux").textContent=tx+" %";
$("s-res").textContent=fm.format(Math.round(m))+" FCFA / mois";
$("s-det").textContent="Montant emprunté : "+fm.format(Math.round(P))+" FCFA · Intérêts : "+fm.format(Math.round(m*n-P))+" FCFA"}
["s-prix","s-apport","s-duree","s-taux"].forEach(function(i){$(i).addEventListener("input",sim)});sim()}
var th=$("theme");
function dark(){var a=document.documentElement.getAttribute("data-theme");return a?a==="dark":matchMedia("(prefers-color-scheme:dark)").matches}
function lab(){th.textContent=dark()?"Mode clair":"Mode sombre"}
try{var sv=localStorage.getItem("hh_theme");if(sv)document.documentElement.setAttribute("data-theme",sv)}catch(e){}
if(th){lab();th.addEventListener("click",function(){var v=dark()?"light":"dark";document.documentElement.setAttribute("data-theme",v);try{localStorage.setItem("hh_theme",v)}catch(e){}lab()})}
var ef=$("ef");if(ef){var ok=document.createElement("p");ok.className="ok";ok.setAttribute("role","status");ok.textContent="Merci ! WhatsApp s’ouvre avec votre demande pré-remplie.";ef.appendChild(ok);ef.addEventListener("submit",function(){ok.style.display="block"})}
})();
