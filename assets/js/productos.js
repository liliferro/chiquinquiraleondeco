/* =========================================================================
   CATÁLOGO · Chiquinquirá León Deco
   Para agregar una pieza: copia un bloque { ... }, cambia los datos y guarda
   sus fotos en assets/img/catalogo/ como <codigo>-480.webp y <codigo>-960.webp
   (el código en minúsculas, por ejemplo c-11-480.webp y c-11-960.webp).

   Campos:
     codigo        Código visible en el badge (ej. "C-03").
     nombre        Nombre corto.
     categoria     Una de las claves de CATEGORIAS (abajo).
     descripcion   Una o dos frases. Sin precios ni datos sin confirmar.
     fotos         Lista de nombres de foto sin "-480.webp" (la primera es la portada).
     proporcion    Alto / ancho de la foto principal (para reservar espacio al cargar).
     personalizable  true o false.

   Prefijos de código (propuesta, cámbialos si la marca usa otros):
     A árboles · AM árboles de mesa · C coronas · CM centros de mesa ·
     G guirnaldas · M madera · CN cascanueces · B botellas · P puerta · D pared
   ========================================================================= */

window.CATEGORIAS = [
  { id: "arboles",   nombre: "Árboles de Navidad" },
  { id: "coronas",   nombre: "Coronas" },
  { id: "centros",   nombre: "Centros de mesa y arreglos" },
  { id: "arbolitos", nombre: "Árboles de mesa y arbolitos" },
  { id: "guirnaldas", nombre: "Guirnaldas y chimeneas" },
  { id: "madera",    nombre: "Árboles y letreros de madera" },
  { id: "cascanueces", nombre: "Cascanueces" },
  { id: "botellas",  nombre: "Botellas decoradas" },
  { id: "puerta",    nombre: "Adornos para puerta" },
  { id: "pared",     nombre: "Decoración de pared y detalles para el hogar" }
];

window.PRODUCTOS = [
  // ---------- Coronas ----------
  { codigo: "C-01", nombre: "Corona roja con listón de cuadros", categoria: "coronas", descripcion: "Corona verde con esferas rojas y doradas, piñas y moño de listón de cuadros.", fotos: ["c-01", "c-01-detalle"], proporcion: 1.02, personalizable: true },
  { codigo: "C-02", nombre: "Corona de piñas con moño rojo", categoria: "coronas", descripcion: "Corona de piñas con moño rojo estampado de nochebuenas.", fotos: ["c-02"], proporcion: 1.64, personalizable: true },
  { codigo: "C-03", nombre: "Corona blanca y plata", categoria: "coronas", descripcion: "Corona nevada con esferas blancas y plata, piñas y moño blanco.", fotos: ["c-03"], proporcion: 1.53, personalizable: true },
  { codigo: "C-04", nombre: "Corona verde y blanca con nochebuenas", categoria: "coronas", descripcion: "Corona de follaje verde con nochebuenas blancas, piñas y moño en tonos naturales.", fotos: ["c-04"], proporcion: 1.35, personalizable: true },
  { codigo: "C-05", nombre: "Corona de piñas con moño dorado y guirnalda", categoria: "coronas", descripcion: "Corona con piñas y moño dorado, acompañada de una guirnalda a juego.", fotos: ["c-05"], proporcion: 2.17, personalizable: true },
  { codigo: "C-06", nombre: "Corona de nochebuenas con listón rojo", categoria: "coronas", descripcion: "Corona con listón rojo, nochebuenas estampadas, piñas y esferas doradas.", fotos: ["c-06", "c-06-detalle"], proporcion: 1.0, personalizable: true },
  { codigo: "C-07", nombre: "Corona de malla roja con piñas", categoria: "coronas", descripcion: "Corona de malla roja con piñas y flores secas.", fotos: ["c-07"], proporcion: 1.0, personalizable: true },
  { codigo: "C-08", nombre: "Corona de pino con «Feliz Navidad»", categoria: "coronas", descripcion: "Corona de pino con nube, bayas y un adorno central de «Feliz Navidad».", fotos: ["c-08"], proporcion: 1.0, personalizable: true },
  { codigo: "C-09", nombre: "Corona con moño de arpillera y nacimiento", categoria: "coronas", descripcion: "Corona verde con esferas, moño de arpillera y un nacimiento al centro.", fotos: ["c-09"], proporcion: 1.17, personalizable: true },
  { codigo: "C-10", nombre: "Corona dorada y plata con esferas rojas", categoria: "coronas", descripcion: "Corona con listones dorados y plata y esferas rojas.", fotos: ["c-10"], proporcion: 1.01, personalizable: true },

  // ---------- Centros de mesa y arreglos ----------
  { codigo: "CM-01", nombre: "Centro de mesa con renos dorados", categoria: "centros", descripcion: "Arreglo de follaje nevado y piñas con renos dorados.", fotos: ["cm-01"], proporcion: 1.37, personalizable: true },
  { codigo: "CM-02", nombre: "Centro de mesa con esferas doradas y gnomo", categoria: "centros", descripcion: "Arreglo con esferas doradas y blancas, luces y un gnomo navideño.", fotos: ["cm-02"], proporcion: 1.28, personalizable: true },
  { codigo: "CM-03", nombre: "Pecera con villa navideña", categoria: "centros", descripcion: "Pecera de vidrio con una pequeña villa navideña nevada en su interior.", fotos: ["cm-03"], proporcion: 1.78, personalizable: true },
  { codigo: "CM-04", nombre: "Topiario de piñas y esferas rojas", categoria: "centros", descripcion: "Topiario en maceta con piñas, esferas rojas y follaje.", fotos: ["cm-04"], proporcion: 1.78, personalizable: true },
  { codigo: "CM-05", nombre: "Arreglo de bayas rojas y nochebuena de cuadros", categoria: "centros", descripcion: "Arreglo alto con bayas rojas, piñas y nochebuena de tela de cuadros.", fotos: ["cm-05"], proporcion: 1.51, personalizable: true },
  { codigo: "CM-06", nombre: "Centro de mesa con vela roja y fanal", categoria: "centros", descripcion: "Vela roja dentro de un fanal de vidrio, rodeada de follaje, flores secas y bayas.", fotos: ["cm-06"], proporcion: 1.12, personalizable: true },
  { codigo: "CM-07", nombre: "Centro de mesa con vela en caja calada", categoria: "centros", descripcion: "Caja calada con vela roja, piñas, bayas y follaje navideño.", fotos: ["cm-07"], proporcion: 1.0, personalizable: true },

  // ---------- Árboles de mesa y arbolitos ----------
  { codigo: "AM-01", nombre: "Arbolito de mesa rojo y plata", categoria: "arbolitos", descripcion: "Arbolito con esferas rojas, listón plata y estrella en la punta.", fotos: ["am-01"], proporcion: 1.57, personalizable: true },
  { codigo: "AM-02", nombre: "Arbolito blanco con nochebuenas", categoria: "arbolitos", descripcion: "Arbolito con nochebuenas blancas y adornos plata.", fotos: ["am-02"], proporcion: 1.78, personalizable: true },
  { codigo: "AM-03", nombre: "Arbolito de piña nevada en maceta", categoria: "arbolitos", descripcion: "Piña grande nevada con moño rojo, en maceta decorada.", fotos: ["am-03"], proporcion: 0.96, personalizable: true },
  { codigo: "AM-04", nombre: "Arbolito de piña con perlas doradas", categoria: "arbolitos", descripcion: "Piña con perlas doradas y moño rojo, en maceta con borde de perlas.", fotos: ["am-04"], proporcion: 1.5, personalizable: true },

  // ---------- Guirnaldas y chimeneas ----------
  { codigo: "G-01", nombre: "Chimenea con guirnalda y corona", categoria: "guirnaldas", descripcion: "Decoración completa de chimenea con guirnalda, corona y detalles a juego.", fotos: ["g-01"], proporcion: 2.17, personalizable: true },

  // ---------- Árboles y letreros de madera ----------
  { codigo: "M-01", nombre: "Cajón con letreros de madera", categoria: "madera", descripcion: "Cajón rojo de madera con letreros de buenos deseos: amor, salud, felicidades.", fotos: ["m-01"], proporcion: 2.17, personalizable: true },
  { codigo: "M-02", nombre: "Árbol de madera verde «Fe, Paz, Amor»", categoria: "madera", descripcion: "Árbol de madera en verde con palabras de buenos deseos y estrella.", fotos: ["m-02"], proporcion: 1.78, personalizable: true },
  { codigo: "M-03", nombre: "Árbol de madera rojo «Fe, Unión, Familia»", categoria: "madera", descripcion: "Árbol de madera en rojo con palabras de buenos deseos.", fotos: ["m-03"], proporcion: 2.17, personalizable: true },
  { codigo: "M-04", nombre: "Árbol de madera con nacimiento", categoria: "madera", descripcion: "Árbol de madera con un nacimiento al centro.", fotos: ["m-04"], proporcion: 1.86, personalizable: true },

  // ---------- Cascanueces ----------
  { codigo: "CN-01", nombre: "Cascanueces dorado con capa blanca", categoria: "cascanueces", descripcion: "Cascanueces en dorado y blanco con capa.", fotos: ["cn-01"], proporcion: 1.78, personalizable: true },
  { codigo: "CN-02", nombre: "Trío de cascanueces blanco y dorado", categoria: "cascanueces", descripcion: "Tres cascanueces a juego en blanco y dorado.", fotos: ["cn-02"], proporcion: 2.71, personalizable: true },

  // ---------- Botellas decoradas ----------
  { codigo: "B-01", nombre: "Botella decorada con nochebuena", categoria: "botellas", descripcion: "Botella decorada con una nochebuena en el frente.", fotos: ["b-01"], proporcion: 2.34, personalizable: true },

  // ---------- Adornos para puerta ----------
  { codigo: "P-01", nombre: "Colgante de campanas con moño", categoria: "puerta", descripcion: "Colgante para puerta con campanas, moño y follaje.", fotos: ["p-01"], proporcion: 2.17, personalizable: true },

  // ---------- Decoración de pared y detalles para el hogar ----------
  { codigo: "D-01", nombre: "Tabla de madera con frasco, flores y luces", categoria: "pared", descripcion: "Tabla de madera para pared con frasco de luces y flores.", fotos: ["d-01"], proporcion: 1.42, personalizable: true }
];

/* Galería de estilos para «Decoramos tu árbol» (A-01 a A-16) */
window.ARBOLES = [
  { codigo: "A-01", nombre: "Nevado rojo y dorado con moños rojos", fotos: ["a-01"], proporcion: 2.12 },
  { codigo: "A-02", nombre: "Rojo y plata con listón de cuadros", fotos: ["a-02"], proporcion: 1.33 },
  { codigo: "A-03", nombre: "Verde, plata y dorado con estrellas", fotos: ["a-03"], proporcion: 1.78 },
  { codigo: "A-04", nombre: "Verde y dorado con campanas", fotos: ["a-04"], proporcion: 1.33 },
  { codigo: "A-05", nombre: "Verde con listón dorado y crema", fotos: ["a-05"], proporcion: 1.68 },
  { codigo: "A-06", nombre: "Dorado y blanco con nochebuenas", fotos: ["a-06"], proporcion: 1.91 },
  { codigo: "A-07", nombre: "Dorado con nochebuenas blancas", fotos: ["a-07"], proporcion: 1.88 },
  { codigo: "A-08", nombre: "Negro y dorado", fotos: ["a-08"], proporcion: 1.33 },
  { codigo: "A-09", nombre: "Azul y plata", fotos: ["a-09"], proporcion: 0.96 },
  { codigo: "A-10", nombre: "Nevado plata y blanco", fotos: ["a-10"], proporcion: 2.17 },
  { codigo: "A-11", nombre: "Blanco y champagne con regalos", fotos: ["a-11"], proporcion: 2.17 },
  { codigo: "A-12", nombre: "Nevado champagne con listón de malla", fotos: ["a-12"], proporcion: 1.48 },
  { codigo: "A-13", nombre: "Blanco y plata con estrella y tren", fotos: ["a-13"], proporcion: 1.78 },
  { codigo: "A-14", nombre: "Blanco y negro con tren", fotos: ["a-14"], proporcion: 1.78 },
  { codigo: "A-15", nombre: "De pared rojo y plata con regalos", fotos: ["a-15"], proporcion: 1.34, pared: true },
  { codigo: "A-16", nombre: "De pared rojo y blanco", fotos: ["a-16"], proporcion: 1.27, pared: true }
];

// Los estilos también se pueden encontrar y consultar desde el catálogo.
window.PRODUCTOS = window.ARBOLES.map(function (arbol) {
  return Object.assign({}, arbol, {
    categoria: "arboles",
    nombre: "Árbol " + arbol.nombre.charAt(0).toLowerCase() + arbol.nombre.slice(1),
    descripcion: "Decoración personalizada para tu árbol, tu espacio y tus colores." + (arbol.pared ? " El árbol de pared incluye todos los materiales." : ""),
    personalizable: true,
    esArbol: true
  });
}).concat(window.PRODUCTOS);
