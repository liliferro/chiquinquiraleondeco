/* Chiquinquirá León Deco · comportamiento del sitio (sin dependencias) */
(function () {
  "use strict";
  var C = window.CONFIG || {};
  var IMG = "assets/img/catalogo/";
  var CATS = window.CATEGORIAS || [];
  var PRODS = window.PRODUCTOS || [];
  var ARBOLES = window.ARBOLES || [];
  var $ = function (s, c) { return (c || document).querySelector(s); };

  /* ---------- WhatsApp ---------- */
  function waUrl(msg) {
    var num = String(C.WHATSAPP_NUMERO || "").replace(/\D/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg);
  }
  function msgProducto(p) {
    return "Hola, me interesa la pieza " + p.codigo + " " + p.nombre + " que vi en la web. ¿Me pueden dar información?";
  }
  function msgArbol(a) {
    return "Hola, me interesa que decoren mi árbol con un estilo como el " + a.codigo + " (" + a.nombre + ") que vi en la web. ¿Me pueden dar información?";
  }
  document.querySelectorAll('[data-wa="general"]').forEach(function (a) { a.href = waUrl(C.MENSAJE_GENERAL || "Hola, vi su catálogo en la web y quiero información"); });
  var pieWa = $("#pie-wa"); if (pieWa) pieWa.textContent = "WhatsApp " + (C.WHATSAPP_VISIBLE || "");
  var anio = $("#anio"); if (anio) anio.textContent = new Date().getFullYear();

  /* ---------- Encabezado y menú ---------- */
  var enc = $("#enc"), hamb = $("#hamb"), menu = $("#menu");
  function cerrarMenu() { menu.classList.remove("abierto"); hamb.setAttribute("aria-expanded", "false"); hamb.setAttribute("aria-label", "Abrir menú"); hamb.querySelector("use").setAttribute("href", "#i-menu"); }
  hamb.addEventListener("click", function () {
    var ab = menu.classList.toggle("abierto");
    hamb.setAttribute("aria-expanded", String(ab));
    hamb.setAttribute("aria-label", ab ? "Cerrar menú" : "Abrir menú");
    hamb.querySelector("use").setAttribute("href", ab ? "#i-x" : "#i-menu");
  });
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", cerrarMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrarMenu(); });
  window.addEventListener("scroll", function () { enc.classList.toggle("sombra", window.scrollY > 10); }, { passive: true });

  /* ---------- Imagen responsiva ---------- */
  function img(foto, alt, prop, sizes, eager) {
    var i = document.createElement("img");
    i.src = IMG + foto + "-480.webp";
    i.srcset = IMG + foto + "-480.webp 480w, " + IMG + foto + "-960.webp 960w";
    i.sizes = sizes || "(min-width:960px) 25vw, (min-width:600px) 33vw, 50vw";
    i.alt = alt; i.width = 480; i.height = Math.round(480 * 1.25);
    i.loading = eager ? "eager" : "lazy"; i.decoding = "async";
    return i;
  }
  function nombreCat(id) { for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i].nombre; return ""; }

  /* ---------- Catálogo: grupos por categoría + buscador ---------- */
  var grupos = $("#grupos"), chips = $("#chips"), estado = $("#cat-estado"), buscar = $("#buscar"), buscarX = $("#buscar-x"), vacio = $("#vacio");
  function norm(t) { return (t || "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim(); }
  function ficha(p) {
    var li = document.createElement("li");
    li.className = "ficha"; li.dataset.cat = p.categoria;
    li.dataset.txt = norm([p.codigo, p.codigo.replace("-", ""), p.nombre, p.descripcion, nombreCat(p.categoria), p.personalizable ? "personalizable" : ""].join(" "));
    var b = document.createElement("button");
    b.className = "ficha__foto"; b.type = "button";
    b.setAttribute("aria-label", "Ver en grande: " + p.nombre + ", código " + p.codigo);
    b.appendChild(img(p.fotos[0], p.nombre + ", hecho por la Sra. Elizabeth", p.proporcion));
    var bd = document.createElement("span"); bd.className = "badge badge--cod"; bd.textContent = p.codigo; b.appendChild(bd);
    b.addEventListener("click", function () { abrirModal({ tipo: p.esArbol ? "a" : "p", item: p.esArbol ? ARBOLES.find(function (a) { return a.codigo === p.codigo; }) : p }); });
    var c = document.createElement("div"); c.className = "ficha__cuerpo";
    c.innerHTML = '<h4 class="ficha__t"></h4><p class="ficha__d"></p>';
    c.querySelector(".ficha__t").textContent = p.nombre;
    c.querySelector(".ficha__d").textContent = p.descripcion;
    if (p.personalizable) { var e = document.createElement("span"); e.className = "etq"; e.textContent = "Personalizable"; c.appendChild(e); }
    var a = document.createElement("a");
    a.className = "btn btn--verde"; a.href = waUrl(p.esArbol ? msgArbol(p) : msgProducto(p)); a.target = "_blank"; a.rel = "noopener";
    a.innerHTML = '<svg class="ic" aria-hidden="true"><use href="#i-wa"/></svg>Lo quiero';
    if (p.esArbol) a.lastChild.textContent = "Quiero este estilo";
    a.setAttribute("aria-label", "Lo quiero: pedir " + p.codigo + " " + p.nombre + " por WhatsApp");
    c.appendChild(a);
    li.appendChild(b); li.appendChild(c);
    return li;
  }
  var catsConProductos = CATS.filter(function (c) { return PRODS.some(function (p) { return p.categoria === c.id; }); });
  catsConProductos.forEach(function (cat) {
    var sec = document.createElement("section");
    sec.className = "grupo"; sec.id = "cat-" + cat.id; sec.dataset.cat = cat.id;
    sec.setAttribute("aria-labelledby", "gt-" + cat.id);
    var cab = document.createElement("header"); cab.className = "grupo__cab";
    var h = document.createElement("h3"); h.className = "grupo__t"; h.id = "gt-" + cat.id; h.textContent = cat.nombre;
    var n = document.createElement("span"); n.className = "grupo__n";
    cab.appendChild(h); cab.appendChild(n); sec.appendChild(cab);
    var ul = document.createElement("ul"); ul.className = "rejilla";
    PRODS.filter(function (p) { return p.categoria === cat.id; }).forEach(function (p) { ul.appendChild(ficha(p)); });
    sec.appendChild(ul);
    grupos.appendChild(sec);
  });

  var catActiva = "todas";
  [{ id: "todas", nombre: "Todas" }].concat(catsConProductos).forEach(function (f, i) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.dataset.cat = f.id;
    var total = f.id === "todas" ? PRODS.length : PRODS.filter(function (p) { return p.categoria === f.id; }).length;
    b.innerHTML = '<span></span> <span class="chip__n"></span>';
    b.firstChild.textContent = f.nombre; b.lastChild.textContent = total;
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", function () {
      catActiva = f.id;
      chips.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
      aplicar();
      b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      var destino = f.id === "todas" ? $("#catalogo") : $("#cat-" + f.id);
      if (destino && !buscar.value) destino.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    chips.appendChild(b);
  });

  function aplicar() {
    var q = norm(buscar.value), palabras = q ? q.split(" ") : [], total = 0;
    grupos.querySelectorAll(".grupo").forEach(function (g) {
      var enCat = catActiva === "todas" || g.dataset.cat === catActiva, n = 0;
      g.querySelectorAll(".ficha").forEach(function (f) {
        var ok = enCat && palabras.every(function (w) { return f.dataset.txt.indexOf(w) > -1; });
        f.classList.toggle("oculta", !ok); if (ok) n++;
      });
      g.hidden = n === 0;
      g.querySelector(".grupo__n").textContent = n + (n === 1 ? " pieza" : " piezas");
      total += n;
    });
    buscarX.hidden = !buscar.value;
    vacio.hidden = total > 0;
    $("#vacio-q").textContent = buscar.value.trim() || nombreCat(catActiva);
    var donde = catActiva === "todas" ? "" : " en " + nombreCat(catActiva);
    estado.textContent = q ? total + (total === 1 ? " resultado" : " resultados") + " para «" + buscar.value.trim() + "»" + donde
      : (catActiva === "todas" ? total + " piezas en " + catsConProductos.length + " categorías" : total + (total === 1 ? " pieza" : " piezas") + donde);
  }
  var tBus;
  buscar.addEventListener("input", function () { clearTimeout(tBus); tBus = setTimeout(aplicar, 120); });
  buscar.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); buscar.blur(); $("#catalogo").scrollIntoView({ behavior: "smooth" }); } });
  function limpiar() { buscar.value = ""; catActiva = "todas"; chips.querySelectorAll(".chip").forEach(function (c, i) { c.setAttribute("aria-pressed", i === 0 ? "true" : "false"); }); aplicar(); buscar.focus(); }
  buscarX.addEventListener("click", limpiar);
  $("#vacio-limpiar").addEventListener("click", limpiar);
  aplicar();

  /* ---------- Galería de estilos ---------- */
  var estilos = $("#estilos");
  ARBOLES.forEach(function (a) {
    var li = document.createElement("li");
    var b = document.createElement("button");
    b.type = "button"; b.className = "estilo";
    b.setAttribute("aria-label", "Ver en grande: árbol " + a.codigo + ", " + a.nombre);
    b.appendChild(img(a.fotos[0], "Árbol " + a.nombre.toLowerCase() + ", decorado por la Sra. Elizabeth", a.proporcion));
    var bd = document.createElement("span"); bd.className = "badge badge--cod"; bd.textContent = a.codigo; b.appendChild(bd);
    var n = document.createElement("span"); n.className = "estilo__n"; n.textContent = a.nombre;
    if (a.pared) { var t = document.createElement("span"); t.className = "estilo__pared"; t.textContent = "Pared"; n.appendChild(t); }
    b.appendChild(n);
    b.addEventListener("click", function () { abrirModal({ tipo: "a", item: a }); });
    li.appendChild(b); estilos.appendChild(li);
  });

  /* ---------- Modal ---------- */
  var modal = $("#modal"), mImg = $("#m-img"), mMinis = $("#m-minis"), mAnt = $("#m-ant"), mSig = $("#m-sig");
  var actual = { fotos: [], i: 0, alt: "" }, ultimoFoco = null;
  function mostrarFoto(i) {
    actual.i = (i + actual.fotos.length) % actual.fotos.length;
    var f = actual.fotos[actual.i];
    mImg.src = IMG + f + "-960.webp"; mImg.alt = actual.alt + (actual.fotos.length > 1 ? " (foto " + (actual.i + 1) + " de " + actual.fotos.length + ")" : "");
    mMinis.querySelectorAll("button").forEach(function (b, k) { b.setAttribute("aria-current", k === actual.i ? "true" : "false"); });
  }
  function abrirModal(o) {
    var it = o.item, esP = o.tipo === "p";
    ultimoFoco = document.activeElement;
    actual.fotos = it.fotos; actual.alt = (esP ? it.nombre : "Árbol " + it.nombre.toLowerCase()) + ", hecho por la Sra. Elizabeth";
    $("#m-cod").textContent = it.codigo;
    $("#m-cat").textContent = esP ? nombreCat(it.categoria) : "Decoramos tu árbol · estilo";
    $("#m-t").textContent = esP ? it.nombre : "Árbol " + it.nombre.toLowerCase();
    $("#m-desc").textContent = esP ? it.descripcion : "Un estilo que ya hizo la Sra. Elizabeth. Lo adaptamos a tu árbol, tu espacio y tus colores." + (it.pared ? " El árbol de pared incluye todos los materiales." : "");
    $("#m-pers").hidden = esP ? !it.personalizable : false;
    var wa = $("#m-wa"); wa.href = waUrl(esP ? msgProducto(it) : msgArbol(it));
    $("#m-wa-t").textContent = esP ? "Lo quiero" : "Quiero este estilo";
    mMinis.innerHTML = "";
    var varias = it.fotos.length > 1;
    mAnt.hidden = mSig.hidden = !varias;
    if (varias) it.fotos.forEach(function (f, k) {
      var b = document.createElement("button"); b.type = "button"; b.setAttribute("aria-label", "Ver foto " + (k + 1));
      var im = document.createElement("img"); im.src = IMG + f + "-480.webp"; im.alt = ""; b.appendChild(im);
      b.addEventListener("click", function () { mostrarFoto(k); }); mMinis.appendChild(b);
    });
    mostrarFoto(0);
    if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  }
  function cerrarModal() { if (modal.open) modal.close(); }
  modal.addEventListener("close", function () { document.body.style.overflow = ""; if (ultimoFoco) ultimoFoco.focus(); });
  $("#m-cerrar").addEventListener("click", cerrarModal);
  modal.addEventListener("click", function (e) { if (e.target === modal) cerrarModal(); });
  mAnt.addEventListener("click", function () { mostrarFoto(actual.i - 1); });
  mSig.addEventListener("click", function () { mostrarFoto(actual.i + 1); });
  modal.addEventListener("keydown", function (e) {
    if (actual.fotos.length < 2) return;
    if (e.key === "ArrowLeft") mostrarFoto(actual.i - 1);
    if (e.key === "ArrowRight") mostrarFoto(actual.i + 1);
  });
  var x0 = null;
  $(".modal__foto").addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  $(".modal__foto").addEventListener("touchend", function (e) {
    if (x0 === null || actual.fotos.length < 2) return;
    var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) mostrarFoto(actual.i + (dx < 0 ? 1 : -1)); x0 = null;
  });

  /* ---------- Formulario de cotización ---------- */
  var form = $("#form"), campoArbol = $("#campo-arbol");
  form.addEventListener("change", function (e) {
    if (e.target.name === "necesidad") campoArbol.hidden = e.target.value !== "Decoración de árbol";
  });
  function marcar(id, mal) {
    var err = $("#e-" + id); if (err) err.hidden = !mal;
    var campo = err && err.closest(".campo"); if (campo) campo.classList.toggle("invalido", mal);
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var nombre = (d.get("nombre") || "").trim(), nec = d.get("necesidad");
    marcar("nombre", !nombre); marcar("necesidad", !nec);
    if (!nombre) { $("#f-nombre").focus(); return; }
    if (!nec) { form.querySelector('input[name="necesidad"]').focus(); return; }
    var fecha = d.get("fecha");
    if (fecha) { var p = fecha.split("-"); fecha = p[2] + "/" + p[1] + "/" + p[0]; }
    var lineas = ["Hola, quiero una cotización. Te escribo desde la web.", "", "Nombre: " + nombre, "Necesito: " + nec];
    var add = function (et, v) { v = (v || "").toString().trim(); if (v) lineas.push(et + ": " + v); };
    if (nec === "Decoración de árbol") add("Tipo de árbol", d.get("arbol"));
    add("Pieza o código", d.get("pieza"));
    add("Colores o estilo", d.get("estilo"));
    add("Medidas o espacio", d.get("medidas"));
    add("Fecha deseada", fecha);
    add("¿Ya tengo adornos?", d.get("adornos"));
    add("Comentarios", d.get("comentarios"));
    var texto = lineas.join("\n"), url = waUrl(texto);
    var res = $("#form-res");
    $("#form-res-txt").textContent = texto;
    $("#form-res-wa").href = url;
    res.hidden = false;
    res.scrollIntoView({ block: "nearest", behavior: "smooth" });
    $("#form-res-wa").focus({ preventScroll: true });
    // En el sitio publicado abre WhatsApp directo; dentro de un marco (vista previa) se usa el botón.
    if (window.self === window.top) { var w = window.open(url, "_blank"); if (w) w.opener = null; }
  });
  var cop = $("#form-res-copiar");
  if (cop) cop.addEventListener("click", function () {
    var t = $("#form-res-txt").textContent, ok = function () { cop.textContent = "Mensaje copiado"; setTimeout(function () { cop.textContent = "Copiar mensaje"; }, 1600); };
    try { navigator.clipboard.writeText(t).then(ok, function () { var r = document.createRange(); r.selectNodeContents($("#form-res-txt")); var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); }); } catch (e) {}
  });
  ["nombre"].forEach(function (id) { $("#f-" + id).addEventListener("input", function () { marcar(id, false); }); });
  form.querySelectorAll('input[name="necesidad"]').forEach(function (r) { r.addEventListener("change", function () { marcar("necesidad", false); }); });

  /* ---------- Menú activo según la sección ---------- */
  if ("IntersectionObserver" in window) {
    var links = menu.querySelectorAll('a[href^="#"]');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) links.forEach(function (l) { l.classList.toggle("activo", l.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ["catalogo", "decoramos", "como-pedir", "contacto"].forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }
})();
