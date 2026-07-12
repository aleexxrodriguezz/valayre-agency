/* =========================================================
   VALAYRE AGENCY — premium interactions & subpages logic
   ========================================================= */
(function () {
  'use strict';
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lerp = (a, b, n) => (1 - n) * a + n * b;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  document.documentElement.classList.add('js');

  /* =====================================================
     I18N - DICCIONARIO COMPLETO (ES / EN)
  ===================================================== */
  const I18N = {
    es: {
      'nav.home':'Inicio','nav.approach':'Enfoque','nav.web':'Diseño Web','nav.software':'Software','nav.auto':'Automatizaciones','nav.studio':'Studio','nav.textil':'Textil','nav.cta':'Llamar ahora',
      'hero.eyebrow':'Diseño web a medida · Potenciado con IA',
      'hero.t1':'Páginas web a medida','hero.t2':'con el mejor diseño,','hero.t3':'potenciadas con IA.',
      'hero.lead':'Diseñamos y construimos webs premium a medida, con una estética impecable y funcionalidades de inteligencia artificial. Entrega rápida. Presupuesto a medida — llámanos a cualquier hora.',
      'hero.cta1':'Reservar una llamada','hero.cta2':'Llamar ahora',
      'hero.avail':'Disponibles para llamar a cualquier hora','hero.scroll':'Descubrir',
      'man.eyebrow':'Nuestro enfoque',
      'man.t1':'Calidad','man.t2':'de','man.t3':'agencia','man.t4':'grande.','man.t5':'Precio','man.t6':'y','man.t7':'velocidad','man.t8':'que','man.t9':'nadie','man.t10':'iguala.',
      
      // Home Services Grid
      'serv.eyebrow':'Nuestras Áreas','serv.title':'Soluciones digitales premium hechas a medida.',
      'serv.web.t':'Diseño Web Premium',
      'serv.web.d':'Páginas web a medida que sorprenden. Creamos interfaces súper bonitas, rápidas y totalmente adaptadas a móviles. Diseñadas para enamorar a tus clientes y convencerlos de elegirte.',
      'serv.web.tag1':'Estética Exclusiva','serv.web.tag2':'Ultra Rápida','serv.web.tag3':'100% Adaptada a Móvil',
      'serv.soft.t':'Desarrollo de Software & Apps',
      'serv.soft.d':'Damos vida a cualquier idea digital. Creamos aplicaciones móviles personalizadas y plataformas a medida (como nuestro sistema de Webs Automáticas en 1 minuto) para resolver necesidades únicas.',
      'serv.soft.tag1':'Aplicaciones a Medida','serv.soft.tag2':'Plataformas Cloud','serv.soft.tag3':'Cualquier Idea Digital',
      'serv.auto.t':'Automatizaciones con IA',
      'serv.auto.d':'Haz que tu negocio trabaje en piloto automático. Conectamos tus herramientas de diario (emails, facturas, agendas, inventarios) para eliminar tareas aburridas sin mover un dedo.',
      'serv.auto.tag1':'Ahorro de Tiempo','serv.auto.tag2':'IA Conectada','serv.auto.tag3':'Cero Errores Manuales',
      'serv.studio.t':'Valayre Studio',
      'serv.studio.d':'Nuestra plataforma inteligente para marcas de ropa. Crea catálogos y showrooms automatizados de tus prendas en un solo clic utilizando modelos de IA y fondos personalizados.',
      'serv.studio.tag1':'Modelos con IA','serv.studio.tag2':'Catálogos en 1 Clic','serv.studio.tag3':'studio.valayre.com',
      'serv.textil.t':'Showroom & Producción Textil',
      'serv.textil.d':'Creamos tu marca de ropa física de la A a la Z. Conectamos el diseño digital de vanguardia con bordados premium y estampaciones TDF de máxima resistencia que se fusionan en el tejido.',
      'serv.textil.tag1':'Prendas Premium','serv.textil.tag2':'Estampación TDF','serv.textil.tag3':'Bordado Profesional',

      // Chatbot
      'chat.online':'En línea • Responderá al instante',
      'chat.welcome':'¡Hola! Soy el asistente inteligente de Valayre. ¿En qué puedo ayudarte a impulsar tu marca o negocio?',
      'chat.q_design':'¿Cómo son vuestras webs?',
      'chat.q_software':'¿Qué software podéis crear?',
      'chat.q_auto':'¿Cómo me ayuda la automatización?',
      'chat.q_studio':'¿Qué es Valayre Studio?',
      'chat.q_textil':'¿Qué hacéis en la sección Textil?',
      'chat.placeholder':'Pregúntame lo que quieras...',

      // Subpages: Web Design
      'web.eyebrow':'DISEÑO EXCLUSIVO',
      'web.title1':'Páginas web que hacen',
      'web.title2':'decir: "Guau".',
      'web.lead':'No usamos plantillas baratas ni diseños repetitivos. Creamos experiencias a medida, rápidas como el rayo, ultra estéticas y preparadas para captar clientes en cualquier dispositivo.',
      'web.p1.title':'Estética de Nivel Superior',
      'web.p1.desc':'Tu página web es la tarjeta de presentación de tu marca. Aplicamos técnicas modernas como la transparencia cristalina (glassmorphism), tipografía elegante de alta costura, y gradientes suaves y armónicos para causar una primera impresión premium e inolvidable.',
      'web.p2.title':'Optimizado al 100% para Móviles',
      'web.p2.desc':'Hoy en día, casi todo el tráfico web se genera desde smartphones. Diseñamos pensando primero en el móvil, creando interacciones táctiles ultra fluidas, imágenes que se acoplan y adaptan dinámicamente al deslizar, y menús cómodos para el dedo pulgar.',
      'web.p3.title':'Carga Instantánea y SEO Técnico',
      'web.p3.desc':'Si una web tarda más de 2 segundos en cargar, tus clientes se van. Limpiamos cada línea de código para que tu web vuele. Además, aplicamos una estructura de SEO técnico impecable desde la base para que aparezcas en los primeros puestos de Google de forma orgánica.',
      'web.show.title':'¿Por qué un diseño a medida?',
      'web.show.desc1':'Las plantillas prefabricadas limitan tu negocio y se ven iguales a las de tu competencia. Un diseño a medida de Valayre se adapta exactamente a lo que vendes, guiando los ojos de tus visitas hacia la llamada de teléfono, la compra o el formulario de presupuesto.',
      'web.show.desc2':'Buscamos la perfección en cada píxel. Desde sutiles animaciones al deslizar hasta botones magnéticos que atraen el cursor del ratón en ordenadores y micro-vibraciones visuales en dispositivos móviles.',
      'web.show.cta':'Quiero mi web premium',

      // Subpages: Software
      'soft.eyebrow':'PROGRAMACIÓN A MEDIDA',
      'soft.title1':'Cualquier idea digital',
      'soft.title2':'la hacemos realidad.',
      'soft.lead':'Desde herramientas internas que resuelven problemas diarios de tu empresa, hasta aplicaciones móviles y plataformas inteligentes complejas. Si puedes imaginarlo, podemos programarlo.',
      'soft.case1.badge':'CASO DE USO: PLATAFORMAS AUTOMÁTICAS',
      'soft.case1.title':'Creación de webs en 1 minuto',
      'soft.case1.desc1':'Imagina una plataforma donde solo tengas que escribir el nombre de un negocio y la ciudad donde se encuentra, y en menos de un minuto genere automáticamente una página web premium adaptada con su mapa, datos de contacto, textos enfocados a su sector y SEO local configurado.',
      'soft.case1.desc2':'Esto no es ciencia ficción: es un software real que hemos diseñado y programado. Demuestra cómo la tecnología y la Inteligencia Artificial pueden unirse para acelerar procesos que antes requerían semanas de trabajo humano a solo unos segundos.',
      'soft.case2.badge':'CASO DE USO: TEXTIL & INTELIGENCIA ARTIFICIAL',
      'soft.case2.title':'Valayre Studio: Catálogos en 1 Clic',
      'soft.case2.desc1':'Para la industria de la moda, creamos un software integral en el que las marcas pueden subir la foto de una prenda y, de forma totalmente automática, el sistema genera el modelo en 3D, le coloca la prenda encima de forma realista, diseña fondos creativos de estudio y maqueta un catálogo digital completo con precios, tallas y materiales.',
      'soft.case2.desc2':'Un desarrollo complejo que permite a las empresas textiles ahorrar miles de euros en fotógrafos, modelos físicos, alquiler de estudios y edición gráfica, teniendo colecciones enteras listas para vender en minutos.',
      'soft.case2.cta':'Saber más de Studio',

      // Software Capabilities
      'soft.cap.eyebrow':'TECNOLOGÍA SIN LÍMITES',
      'soft.cap.title':'Especialidades de Ingeniería de Software',
      'soft.cap.desc':'Desarrollamos cualquier tipo de arquitectura técnica, garantizando escalabilidad, seguridad y velocidad absoluta.',
      'soft.cap.c1.title':'Plataformas SaaS & Modelos de IA',
      'soft.cap.c1.desc':'Desarrollamos arquitecturas de software como servicio (SaaS) con integraciones nativas de Inteligencia Artificial. Conectamos modelos de lenguaje (LLMs), visión artificial y procesamiento de datos complejos para resolver cuellos de botella empresariales con rapidez excepcional.',
      'soft.cap.c2.title':'Aplicaciones Móviles Nativas & PWAs',
      'soft.cap.c2.desc':'Creamos aplicaciones fluidas para iOS y Android con experiencias de usuario cuidadas al milímetro. Sacamos el máximo partido al hardware del dispositivo (cámara, biometría, GPS y notificaciones push) asegurando un rendimiento estable a 60fps.',
      'soft.cap.c3.title':'ERPs & Sistemas de Gestión a Medida',
      'soft.cap.c3.desc':'Diseñamos herramientas de gestión interna y bases de datos a medida para automatizar el control de stock, la logística física, la coordinación de operarios y la facturación, eliminando por completo las limitaciones y licencias mensuales de las herramientas cerradas.',
      'soft.cap.c4.title':'Fintech & Arquitecturas Transaccionales',
      'soft.cap.c4.desc':'Construimos pasarelas de pago ultraseguras, sistemas de cobro recurrente adaptados a tu facturación, conciliación de cuentas y arquitecturas criptográficas o Web3 de alta fiabilidad, garantizando que el dinero se procese y fluya con total seguridad.',

      // Subpages: Automations
      'auto.eyebrow':'EFICIENCIA Y AGILIDAD',
      'auto.title1':'Tu negocio funcionando',
      'auto.title2':'en piloto automático.',
      'auto.lead':'Conectamos tus sistemas diarios para que trabajen entre sí. Eliminamos el copiar y pegar datos, el envío manual de correos y la gestión lenta de agendas, dejando que la IA haga el trabajo pesado por ti.',
      'auto.c1.title':'Administración y Facturación Cero',
      'auto.c1.desc':'Imagina que cada vez que un cliente te hace un pago, tu sistema automáticamente genera la factura estructurada, la envía por email, la registra en tu contabilidad y actualiza tu inventario en tiempo real. Todo sin intervención humana y sin errores.',
      'auto.c2.title':'Atención al Cliente Inteligente 24/7',
      'auto.c2.desc':'Instalamos asistentes de IA capaces de responder llamadas y chats de WhatsApp con lenguaje natural y conocimiento completo de tus servicios. Agendan reuniones, filtran dudas frecuentes de tus clientes y derivan solo las consultas de urgencia.',
      'auto.c3.title':'Sincronización Total de Herramientas',
      'auto.c3.desc':'¿Usas CRM, Excel, correos de Outlook y herramientas de facturas separadas? Las conectamos todas mediante flujos automatizados (Zaps y webhooks avanzados) para que los datos viajen de forma segura al instante de una plataforma a otra.',
      'auto.panel.title':'Libera a tu equipo de las tareas repetitivas',
      'auto.panel.desc':'No pierdas horas introduciendo datos a mano. Llámanos a cualquier hora y analizamos qué tareas de tu negocio podemos automatizar esta misma semana para ahorrar costes y tiempo.',
      'auto.panel.cta':'Analizar mis procesos',

      // Interactive Flow Builder & ROI
      'auto.flow_eyebrow':'TECNOLOGÍA EN ACCIÓN',
      'auto.flow_title':'Simulador de Flujos Automáticos',
      'auto.flow_desc':'Haz clic en las pestañas para ver cómo se conectan y automatizan las herramientas en tiempo real.',
      'auto.tab.sales':'Captación de Leads',
      'auto.tab.billing':'Facturación y ERP',
      'auto.tab.support':'Atención y Agenda 24/7',
      'auto.node.trigger':'ENTRADA',
      'auto.node.ai':'PROCESO IA',
      'auto.node.db':'INTEGRACIÓN',
      'auto.node.done':'SALIDA',
      'auto.node.v1.title':'Nuevo Lead',
      'auto.node.v1.desc':'Formulario o email entrante',
      'auto.node.v2.title':'Clasificación IA',
      'auto.node.v2.desc':'GPT analiza y prioriza el lead',
      'auto.node.v3.title':'Registro CRM',
      'auto.node.v3.desc':'Lead guardado en HubSpot',
      'auto.node.v4.title':'WhatsApp / Slack',
      'auto.node.v4.desc':'Notificación y bienvenida instantánea',
      'auto.node.f1.title':'Pago Recibido',
      'auto.node.f1.desc':'Cobro exitoso en Stripe',
      'auto.node.f2.title':'Extracción de Datos',
      'auto.node.f2.desc':'IA asocia datos fiscales y tasas',
      'auto.node.f3.title':'Creación de Factura',
      'auto.node.f3.desc':'Emitida y firmada en Holded',
      'auto.node.f4.title':'Envío y Archivo',
      'auto.node.f4.desc':'Remitido en PDF y archivado en Drive',
      'auto.node.s1.title':'Mensaje WhatsApp',
      'auto.node.s1.desc':'Cliente solicita soporte o cita',
      'auto.node.s2.title':'Agente IA de Voz/Texto',
      'auto.node.s2.desc':'Resuelve dudas y consulta horarios',
      'auto.node.s3.title':'Agenda Automática',
      'auto.node.s3.desc':'Cita agendada en Google Calendar',
      'auto.node.s4.title':'SMS / Confirmación',
      'auto.node.s4.desc':'Notificación y link de acceso Zoom',
      'auto.parallax_quote':'"La eficiencia no es hacer más cosas, es hacer que las cosas se hagan solas."',
      'auto.roi_eyebrow':'RETORNO DE INVERSIÓN',
      'auto.roi_title':'Calcula el Ahorro de tu Empresa',
      'auto.roi_desc':'Mueve los controles para ver cuántas horas y dinero puedes recuperar automatizando tus procesos manuales.',
      'auto.roi.hours_label':'Horas diarias en tareas manuales',
      'auto.roi.employees_label':'Empleados que hacen esa tarea',
      'auto.roi.cost_label':'Coste medio por hora del empleado',
      'auto.roi.stat_hours':'Horas anuales recuperadas',
      'auto.roi.stat_money':'Ahorro anual estimado',
      'auto.roi.stat_boost':'Eficiencia de Procesos',

      // Subpages: Studio
      'studio.eyebrow':'TECNOLOGÍA REVOLUCIONARIA',
      'studio.title1':'Diseña tus catálogos de',
      'studio.title2':'moda con un solo clic.',
      'studio.lead':'Valayre Studio es nuestra herramienta de inteligencia artificial creada para marcas de ropa. Sube tu prenda y genera al instante un showroom digital completo con modelos realistas, fondos ilimitados y maquetación profesional.',
      'studio.cta':'ACCEDER AL STUDIO ↗',
      'studio.f1.title':'Modelos IA Hiperrealistas',
      'studio.f1.desc':'No necesitas contratar agencias de modelos. Sube fotos en plano (lay flat) de tus camisetas, camisas o vestidos, y nuestro software generará personas artificiales con posturas naturales vistiendo tu prenda a la perfección.',
      'studio.f2.title':'Fondos de Estudio Ilimitados',
      'studio.f2.desc':'Cambia la localización de tus fotos sin moverte del sitio. ¿Quieres un fondo urbano en Nueva York, un estudio minimalista en tonos tierra o un exterior soleado en el bosque? La IA generará el entorno ideal en segundos.',
      'studio.f3.title':'Edición y Ficha Completa',
      'studio.f3.desc':'Personaliza cada detalle antes de exportar. Agrega nombres de prendas, precios, materiales, colores disponibles y tallas. Todo integrado dentro del mismo panel de control para crear lookbooks profesionales listos para enviar a tus distribuidores o subir a tu tienda online.',

      // Subpages: Textile
      'textil.eyebrow':'TEJIDO E INNOVACIÓN',
      'textil.title1':'La unión perfecta entre',
      'textil.title2':'diseño digital y ropa física.',
      'textil.lead':'En Valayre llevamos la tecnología y el diseño inteligente a prendas de vestir reales. Creamos marcas personalizadas de ropa, bordados de precisión industrial y estampaciones directas premium de máxima durabilidad.',
      'textil.cta':'Ver tienda textil valayre.com ↗',
      'textil.t1.title':'Marcas de ropa a medida',
      'textil.t1.desc':'Desarrollamos líneas completas de prendas personalizadas desde el patrón original. Seleccionamos materiales de alto gramaje y tacto ultra suave para crear ropa que se siente de lujo nada más ponérsela, pensada tanto para merchandising corporativo premium como para firmas de moda independientes.',
      'textil.t2.title':'Bordados de alta definición',
      'textil.t2.desc':'Cosemos tus logos y diseños directamente en la tela utilizando maquinaria de alta precisión y alta densidad de hilo. Nuestros bordados resisten cualquier esfuerzo y lavado, manteniendo un relieve nítido, elegante y profesional.',
      'textil.t3.title':'Estampación TDF de gran resistencia',
      'textil.t3.desc':'La técnica TDF (Transfer Directo sobre Film) inyecta y fusiona los pigmentos directamente entre las fibras del tejido. A diferencia del vinilo de plástico barato que se rompe y da calor, el TDF mantiene la prenda transpirable, elástica, suave y resiste cientos de ciclos de lavado sin perder color ni agrietarse.',
      'textil.img1':'Catálogo General — Próximamente',
      'textil.img2':'Diseño de Prendas — Próximamente',
      'textil.img3':'Corte & Confección — Próximamente',
      'textil.img4':'Bordado Industrial — Próximamente',
      'textil.img5':'Muestrario de Tejidos — Próximamente',
      'textil.img6':'Estampación TDF — Próximamente',
      'textil.img7':'Reportaje Showroom — Próximamente',

      // Rest of keys
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
      'callbar.call':'Llamar ahora','callbar.book':'Presupuesto',
      'nav.contact':'Contacto',
      'contact.eyebrow':'Hablemos',
      'contact.title1':'Tu idea online',
      'contact.title2':'esta semana.',
      'contact.lead':'Disponibles para llamadas a cualquier hora, o si lo prefieres, escríbenos directamente por email, WhatsApp o redes sociales.',
      'contact.card_title':'Información de Contacto',
      'contact.email_lbl':'Correo Electrónico',
      'contact.tel_lbl':'Teléfono / WhatsApp',
      'contact.ig_lbl':'Instagram Personal',
      'contact.adr_lbl':'Oficina Central'
    },
    en: {
      'nav.home':'Home','nav.approach':'Approach','nav.web':'Web Design','nav.software':'Software','nav.auto':'Automations','nav.studio':'Studio','nav.textil':'Textile','nav.cta':'Call now',
      'hero.eyebrow':'Bespoke web design · AI-powered',
      'hero.t1':'Bespoke websites','hero.t2':'with the best design,','hero.t3':'powered by AI.',
      'hero.lead':'We design and build premium bespoke websites with flawless aesthetics and AI features. Fast delivery. Tailored quote — call us at any hour.',
      'hero.cta1':'Book a call','hero.cta2':'Call now',
      'hero.avail':'Available to call at any hour','hero.scroll':'Discover',
      'man.eyebrow':'Our approach',
      'man.t1':'Big','man.t2':'agency','man.t3':'quality.','man.t4':'','man.t5':'Price','man.t6':'and','man.t7':'speed','man.t8':'no','man.t9':'one','man.t10':'matches.',
      
      // Home Services Grid
      'serv.eyebrow':'Our Specialties','serv.title':'Premium digital solutions made to measure.',
      'serv.web.t':'Premium Web Design',
      'serv.web.d':'Bespoke websites that surprise. We create gorgeous, fast, and fully mobile-friendly interfaces. Designed to charm your customers and convince them to choose you.',
      'serv.web.tag1':'Exclusive Aesthetics','serv.web.tag2':'Ultra Fast','serv.web.tag3':'100% Mobile Ready',
      'serv.soft.t':'Software & App Development',
      'serv.soft.d':'We bring any digital idea to life. We create custom mobile apps and bespoke platforms (like our 1-minute automatic website system) to solve unique needs.',
      'serv.soft.tag1':'Custom Apps','serv.soft.tag2':'Cloud Platforms','serv.soft.tag3':'Any Digital Idea',
      'serv.auto.t':'IA Automations',
      'serv.auto.d':'Make your business run on autopilot. We connect your daily tools (emails, invoices, calendars, inventories) to eliminate boring tasks without lifting a finger.',
      'serv.auto.tag1':'Time Saving','serv.auto.tag2':'Connected AI','serv.auto.tag3':'Zero Manual Errors',
      'serv.studio.t':'Valayre Studio',
      'serv.studio.d':'Our intelligent platform for clothing brands. Create automated catalogs and showrooms of your garments in a single click using AI models and custom backgrounds.',
      'serv.studio.tag1':'AI Models','serv.studio.tag2':'1-Click Catalogs','serv.studio.tag3':'studio.valayre.com',
      'serv.textil.t':'Showroom & Textile Production',
      'serv.textil.d':'We create your physical clothing brand from A to Z. We connect cutting-edge digital design with premium embroidery and high-resistance TDF printing that fuses into the fabric.',
      'serv.textil.tag1':'Premium Garments','serv.textil.tag2':'TDF Printing','serv.textil.tag3':'Professional Embroidery',

      // Chatbot
      'chat.online':'Online • Answers instantly',
      'chat.welcome':'Hello! I am the Valayre intelligent assistant. How can I help you boost your brand or business?',
      'chat.q_design':'How are your websites?',
      'chat.q_software':'What software can you build?',
      'chat.q_auto':'How does automation help me?',
      'chat.q_studio':'What is Valayre Studio?',
      'chat.q_textil':'What do you do in the Textile section?',
      'chat.placeholder':'Ask me anything...',

      // Subpages: Web Design
      'web.eyebrow':'EXCLUSIVE DESIGN',
      'web.title1':'Websites that make you',
      'web.title2':'say: "Wow".',
      'web.lead':'We don\'t use cheap templates or repetitive designs. We create bespoke, lightning-fast, ultra-aesthetic experiences prepared to capture clients on any device.',
      'web.p1.title':'Top Level Aesthetics',
      'web.p1.desc':'Your website is your brand\'s calling card. We apply modern techniques like glassmorphism, elegant high-fashion typography, and smooth harmonic gradients to make an unforgettable premium first impression.',
      'web.p2.title':'100% Optimized for Mobile',
      'web.p2.desc':'Nowadays, almost all web traffic comes from smartphones. We design mobile-first, creating ultra-fluid touch interactions, images that match and adapt dynamically when sliding, and comfortable menus for the thumb.',
      'web.p3.title':'Instant Loading & Technical SEO',
      'web.p3.desc':'If a web takes over 2 seconds to load, your customers leave. We clean every line of code to make your site fly. Plus, we build a flawless technical SEO structure from the ground up so you rank organically on Google.',
      'web.show.title':'Why bespoke design?',
      'web.show.desc1':'Prefabricated templates limit your business and look identical to your competitors. A bespoke Valayre design adapts exactly to what you sell, directing visitors\' eyes to the phone call, purchase, or quote form.',
      'web.show.desc2':'We pursue perfection in every pixel. From subtle slide animations to magnetic buttons that attract the cursor on computers and micro-vibrations on mobile devices.',
      'web.show.cta':'I want my premium web',

      // Subpages: Software
      'soft.eyebrow':'BESPOKE PROGRAMMING',
      'soft.title1':'Any digital idea',
      'soft.title2':'we bring to life.',
      'soft.lead':'From internal tools that solve daily problems for your company, to mobile applications and complex intelligent platforms. If you can imagine it, we can code it.',
      'soft.case1.badge':'USE CASE: AUTOMATIC PLATFORMS',
      'soft.case1.title':'1-Minute website creation',
      'soft.case1.desc1':'Imagine a platform where you only enter a business name and location, and in less than a minute it automatically generates a premium website tailored with its map, contact details, sector-focused copy, and local SEO configured.',
      'soft.case1.desc2':'This is not science fiction: it is real software we have designed and programmed. It demonstrates how technology and AI can merge to accelerate processes that previously took weeks of human work into just seconds.',
      'soft.case2.badge':'USE CASE: TEXTILE & ARTIFICIAL INTELLIGENCE',
      'soft.case2.title':'Valayre Studio: 1-Click Catalogs',
      'soft.case2.desc1':'For the fashion industry, we created an all-in-one software where brands upload a garment photo and, fully automatically, the system generates the 3D model, realistic drape of the clothing, creative backgrounds, and displays a complete digital catalog with prices, sizes, and fabrics.',
      'soft.case2.desc2':'A complex development that lets textile companies save thousands of euros in photographers, physical models, studio rentals, and graphic editing, having entire collections ready to sell in minutes.',
      'soft.case2.cta':'Learn more about Studio',

      // Software Capabilities
      'soft.cap.eyebrow':'LIMITLESS TECHNOLOGY',
      'soft.cap.title':'Software Engineering Specialties',
      'soft.cap.desc':'We develop any type of technical architecture, guaranteeing scalability, security, and absolute speed.',
      'soft.cap.c1.title':'SaaS Platforms & AI Models',
      'soft.cap.c1.desc':'We develop Software as a Service (SaaS) architectures with native AI integrations. We connect language models (LLMs), computer vision, and complex data processing to solve business bottlenecks with exceptional speed.',
      'soft.cap.c2.title':'Native Mobile Apps & PWAs',
      'soft.cap.c2.desc':'We build fluid applications for iOS and Android with pixel-perfect user experiences. We get the most out of device hardware (camera, biometrics, GPS, and push notifications) ensuring stable performance at 60fps.',
      'soft.cap.c3.title':'Bespoke ERPs & Management Systems',
      'soft.cap.c3.desc':'We design internal management tools and databases to automate stock control, physical logistics, worker coordination, and invoicing, completely eliminating the limitations and monthly licenses of closed software.',
      'soft.cap.c4.title':'Fintech & Transactional Architectures',
      'soft.cap.c4.desc':'We construct ultra-secure payment gateways, recurring billing systems tailored to your invoicing flow, ledger reconciliation, and highly reliable cryptographic or Web3 architectures, guaranteeing that funds flow safely.',

      // Subpages: Automations
      'auto.eyebrow':'EFFICIENCY & AGILITY',
      'auto.title1':'Your business running',
      'auto.title2':'on autopilot.',
      'auto.lead':'We connect your everyday systems to work together. We eliminate copy-pasting data, manual emails, and slow calendar management, letting AI do the heavy lifting for you.',
      'auto.c1.title':'Zero Admin & Invoicing',
      'auto.c1.desc':'Imagine that every time a client makes a payment, your system automatically generates the invoice, emails it, registers it in your accounting, and updates inventory in real time. All without human intervention and error-free.',
      'auto.c2.title':'24/7 Smart Customer Care',
      'auto.c2.desc':'We install AI assistants capable of answering calls and WhatsApp chats with natural language and full knowledge of your services. They schedule meetings, filter FAQs, and transfer only urgent inquiries.',
      'auto.c3.title':'Full Tool Synchronization',
      'auto.c3.desc':'Using separate CRM, Excel, Outlook emails, and invoice tools? We connect them all through automated workflows (advanced Zaps and webhooks) so data travels securely and instantly from one platform to another.',
      'auto.panel.title':'Free your team from repetitive tasks',
      'auto.panel.desc':'Don\'t waste hours entering data manually. Call us at any hour, and we\'ll analyze which business tasks we can automate this week to save time and costs.',
      'auto.panel.cta':'Analyze my processes',

      // Interactive Flow Builder & ROI
      'auto.flow_eyebrow':'TECHNOLOGY IN ACTION',
      'auto.flow_title':'Automated Workflow Simulator',
      'auto.flow_desc':'Click the tabs to see how tools connect and automate in real time.',
      'auto.tab.sales':'Lead Capture',
      'auto.tab.billing':'Invoicing & ERP',
      'auto.tab.support':'Support & Calendar 24/7',
      'auto.node.trigger':'INPUT',
      'auto.node.ai':'AI PROCESS',
      'auto.node.db':'INTEGRATION',
      'auto.node.done':'OUTPUT',
      'auto.node.v1.title':'New Lead',
      'auto.node.v1.desc':'Web form or incoming email',
      'auto.node.v2.title':'AI Classification',
      'auto.node.v2.desc':'GPT analyzes intent & prioritizes',
      'auto.node.v3.title':'CRM Update',
      'auto.node.v3.desc':'Lead saved in HubSpot automatically',
      'auto.node.v4.title':'WhatsApp / Slack',
      'auto.node.v4.desc':'Instant welcome text & sales notification',
      'auto.node.f1.title':'Payment Received',
      'auto.node.f1.desc':'Successful charge in Stripe',
      'auto.node.f2.title':'Data Extraction',
      'auto.node.f2.desc':'AI matches fiscal data & taxes',
      'auto.node.f3.title':'Invoice Creation',
      'auto.node.f3.desc':'Generated & signed in Holded',
      'auto.node.f4.title':'Send & Archive',
      'auto.node.f4.desc':'PDF sent via email & archived in Google Drive',
      'auto.node.s1.title':'WhatsApp Message',
      'auto.node.s1.desc':'Client requests support or appointment',
      'auto.node.s2.title':'AI Voice/Text Agent',
      'auto.node.s2.desc':'Answers questions & queries calendar availability',
      'auto.node.s3.title':'Automated Booking',
      'auto.node.s3.desc':'Meeting booked in Google Calendar',
      'auto.node.s4.title':'SMS / Confirmation',
      'auto.node.s4.desc':'Confirmation SMS sent with Zoom link',
      'auto.parallax_quote':'"Efficiency is not about doing more, it is about letting things happen on their own."',
      'auto.roi_eyebrow':'RETURN ON INVESTMENT',
      'auto.roi_title':'Calculate Your Business Savings',
      'auto.roi_desc':'Move the controls to see how many hours and money you can recover by automating manual tasks.',
      'auto.roi.hours_label':'Daily hours spent on manual tasks',
      'auto.roi.employees_label':'Employees performing this task',
      'auto.roi.cost_label':'Average employee hourly wage',
      'auto.roi.stat_hours':'Annual hours recovered',
      'auto.roi.stat_money':'Estimated annual savings',
      'auto.roi.stat_boost':'Process Efficiency',

      // Subpages: Studio
      'studio.eyebrow':'REVOLUTIONARY TECHNOLOGY',
      'studio.title1':'Design your fashion catalogs',
      'studio.title2':'with a single click.',
      'studio.lead':'Valayre Studio is our AI tool built for clothing brands. Upload your garment and instantly generate a complete digital showroom with realistic models, unlimited backgrounds, and professional layout.',
      'studio.cta':'ACCESS THE STUDIO ↗',
      'studio.f1.title':'Hyper-realistic AI Models',
      'studio.f1.desc':'No need to hire model agencies. Upload flat-lay photos of your t-shirts, shirts, or dresses, and our software will generate artificial people with natural poses wearing your garment perfectly.',
      'studio.f2.title':'Unlimited Studio Backgrounds',
      'studio.f2.desc':'Change the location of your photos without moving. Want an urban New York background, a minimal studio in earth tones, or a sunny forest outdoor? The AI will generate the perfect setup in seconds.',
      'studio.f3.title':'Editing & Complete Sheets',
      'studio.f3.desc':'Customize every detail before exporting. Add garment names, prices, materials, available colors, and sizes. All integrated in the same dashboard to create professional lookbooks ready to send or upload.',

      // Subpages: Textile
      'textil.eyebrow':'FABRIC & INNOVATION',
      'textil.title1':'The perfect union between',
      'textil.title2':'digital design and physical clothing.',
      'textil.lead':'At Valayre we bring technology and intelligent design to real garments. We create custom apparel lines, industrial precision embroidery, and premium direct prints of maximum durability.',
      'textil.cta':'Visit valayre.com clothing shop ↗',
      'textil.t1.title':'Bespoke clothing brands',
      'textil.t1.desc':'We develop complete custom garment lines from the original pattern. We select heavyweight, ultra-soft fabrics to create clothes that feel luxurious from the start, designed for corporate merchandising or fashion labels.',
      'textil.t2.title':'High Definition Embroidery',
      'textil.t2.desc':'We embroider your logos and designs directly on the fabric using high-precision machines and high thread counts. Our embroideries resist washes and wear, keeping a crisp, elegant, and professional relief.',
      'textil.t3.title':'High Resistance TDF Printing',
      'textil.t3.desc':'TDF (Direct to Film Transfer) printing injects and fuses pigments into the fabric fibers. Unlike cheap plastic vinyl that cracks and blocks heat, TDF keeps the apparel breathable, stretchy, soft, and resists hundreds of washes.',
      'textil.img1':'General Catalog — Coming Soon',
      'textil.img2':'Garment Design — Coming Soon',
      'textil.img3':'Cutting & Tailoring — Coming Soon',
      'textil.img4':'Industrial Embroidery — Coming Soon',
      'textil.img5':'Fabric Swatches — Coming Soon',
      'textil.img6':'TDF Printing Show — Coming Soon',
      'textil.img7':'Showroom Reportage — Coming Soon',

      // Rest of keys
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
      'callbar.call':'Call now','callbar.book':'Quote',
      'nav.contact':'Contact',
      'contact.eyebrow':"Let's talk",
      'contact.title1':'Your idea online',
      'contact.title2':'this week.',
      'contact.lead':'Available to call at any hour, or if you prefer, write to us directly via email, WhatsApp or social media.',
      'contact.card_title':'Contact Info',
      'contact.email_lbl':'Email Address',
      'contact.tel_lbl':'Phone / WhatsApp',
      'contact.ig_lbl':'Personal Instagram',
      'contact.adr_lbl':'Headquarters'
    }
  };

  let LANG = 'es';
  function t(k){ return (I18N[LANG] && I18N[LANG][k] != null) ? I18N[LANG][k] : k; }

  function applyLang(lang){
    LANG = I18N[lang] ? lang : 'es';
    $$('[data-i18n]').forEach(el => {
      const v = t(el.getAttribute('data-i18n'));
      el.innerHTML = v;
    });
    // translate placeholders
    $$('[data-i18n-holder]').forEach(el => {
      const v = t(el.getAttribute('data-i18n-holder'));
      el.placeholder = v;
    });

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
    $$('.hero__title .line, .cta__title .line, .sub-hero__title .line').forEach(line => {
      // avoid double wrapping
      if (line.querySelector('.split')) return;
      const txt = line.textContent;
      line.innerHTML = '<span class="split">' + txt + '</span>';
    });
  }

  /* =====================================================
     IN-VIEW WATCHER (scroll-driven animations)
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
    setTimeout(checkInView, 250);
    setTimeout(checkInView, 900);
    setTimeout(revealAllRemaining, 4000);
  }

  /* =====================================================
     TEXT SCRAMBLE
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
     MARQUEE
  ===================================================== */
  function initMarquee(){
    const track = $('#marquee'); if(!track || reduce) return;
    track.innerHTML += track.innerHTML;
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
    if (!cur) return;
    document.body.classList.add('has-cursor');
    cur.classList.add('is-active');
    let mx = innerWidth/2, my = innerHeight/2, cx = mx, cy = my;
    addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      const under = document.elementFromPoint(mx, my);
      // flip cursor color based on background
      const darkEl = under && (under.closest('.cta') || under.closest('.theme-software') || under.closest('.theme-studio') || under.closest('.theme-textil'));
      cur.classList.toggle('on-dark', !!darkEl);
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
    const nav = $('#nav'), prog = $('#scrollProgress'), callbar = $('#callbar'), hero = $('#hero') || $('.sub-hero');
    if (!nav) return;
    let last = 0;
    function onScroll(){
      const y = scrollY;
      nav.classList.toggle('is-scrolled', y > 8);
      nav.classList.toggle('is-hidden', y > 200 && y > last && !nav.matches(':hover'));
      last = y;
      const h = document.documentElement.scrollHeight - innerHeight;
      if (prog) prog.style.width = (h>0 ? (y/h)*100 : 0) + '%';
      const hb = hero ? hero.offsetHeight : 500;
      if (callbar) callbar.classList.toggle('is-visible', y > hb - 160);
    }
    onScroll();
    addEventListener('scroll', onScroll, { passive:true });
  }

  function initMobileMenu(){
    const nav = $('#nav'), toggle = $('#navToggle');
    if (!nav || !toggle) return;
    toggle.addEventListener('click', e => {
      e.stopPropagation();
      nav.classList.toggle('is-open');
    });
    nav.querySelectorAll('.nav__mobile-link').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('is-open'));
    });
    document.addEventListener('click', e => {
      if (nav.classList.contains('is-open') && !nav.contains(e.target)) {
        nav.classList.remove('is-open');
      }
    });
  }

  /* =====================================================
     WEBGL SHADER BACKGROUND
  ===================================================== */
  function initShader(){
    if (reduce) return;
    const canvas = $('#fxCanvas');
    if (!canvas) return;
    let gl;
    try { gl = canvas.getContext('webgl', { alpha:true, antialias:false, premultipliedAlpha:false }); } catch(e){}
    if (!gl){ canvas.style.display='none'; return; }

    const vert = 'attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }';
    const frag = [
      'precision highp float;',
      'uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform float u_ink_mode;',
      'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }',
      'float noise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*(3.0-2.0*f);',
      '  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x), mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x), u.y); }',
      'float fbm(vec2 p){ float v=0.0; float a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }',
      'void main(){',
      '  vec2 uv = gl_FragCoord.xy / u_res.xy;',
      '  vec2 st = uv; st.x *= u_res.x/u_res.y;',
      '  float t = u_time*0.02;',
      '  vec2 mo = (u_mouse/u_res - 0.5) * 0.4;',
      '  float n = fbm(st*2.2 + vec2(t, -t) + mo);',
      '  n = fbm(st*2.2 + n*1.4 + vec2(t*1.3, t));',
      '  float lines = abs(sin(n*8.0 + t*1.5));',
      '  float contour = smoothstep(0.0, 0.05, lines) * (1.0 - smoothstep(0.85, 1.0, lines));',
      '  float alpha = (1.0 - contour) * 0.045;',
      '  float vig = smoothstep(1.2, 0.15, length(uv-0.5));',
      '  alpha *= vig;',
      '  vec3 ink = (u_ink_mode > 0.5) ? vec3(0.9, 0.94, 1.0) : vec3(0.05, 0.06, 0.08);', // light contours in dark mode pages
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
    const uInkMode = gl.getUniformLocation(prog,'u_ink_mode');
    
    // ink mode is 1 (light lines) for dark pages: software, studio, textil
    const pName = document.body.getAttribute('data-page') || 'home';
    const isDarkPage = (pName === 'software' || pName === 'studio' || pName === 'textil');
    
    let mouse = [innerWidth/2, innerHeight/2];
    addEventListener('mousemove', e=>{ mouse=[e.clientX, innerHeight-e.clientY]; }, { passive:true });

    function resize(){
      const dpr = Math.min(devicePixelRatio||1, 1.5);
      canvas.width = innerWidth*dpr; canvas.height = innerHeight*dpr;
      gl.viewport(0,0,canvas.width,canvas.height);
    }
    resize(); addEventListener('resize', resize);
    const start = performance.now();
    (function draw(now){
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now-start)/1000);
      gl.uniform2f(uMouse, mouse[0]*(canvas.width/innerWidth), mouse[1]*(canvas.height/innerHeight));
      gl.uniform1f(uInkMode, isDarkPage ? 1.0 : 0.0);
      gl.drawArrays(gl.TRIANGLES,0,3);
      requestAnimationFrame(draw);
    })(start);
  }

  /* =====================================================
     PRELOADER (3D Logo Only)
  ===================================================== */
  function initLoader(done){
    const loader = $('#loader');
    if (!loader) { done(); return; }
    document.body.classList.add('is-loading');

    // Spin for 1.3 seconds and then fade out
    setTimeout(finish, 1300);

    function finish(){
      loader.classList.add('is-done');
      document.body.classList.remove('is-loading');
      done();
    }
  }

  /* =====================================================
     SIMULADOR DE FLUJOS INTERACTIVO
  ===================================================== */
  function initFlowSimulator() {
    const tabs = $$('.flow-tab');
    const groups = $$('.flow-group');
    if (!tabs.length || !groups.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const flowName = tab.getAttribute('data-flow');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        // Update active group
        groups.forEach(g => {
          g.classList.remove('active');
          if (g.id === `flow-${flowName}`) {
            g.classList.add('active');
          }
        });
      });
    });
  }

  /* =====================================================
     CALCULADORA DE ROI
  ===================================================== */
  function initRoiCalculator() {
    const sliderHours = $('#sliderHours');
    const sliderEmployees = $('#sliderEmployees');
    const sliderCost = $('#sliderCost');

    const valHours = $('#valHours');
    const valEmployees = $('#valEmployees');
    const valCost = $('#valCost');

    const statHours = $('#statHours');
    const statMoney = $('#statMoney');

    if (!sliderHours || !sliderEmployees || !sliderCost) return;

    function calculate() {
      const h = parseInt(sliderHours.value);
      const e = parseInt(sliderEmployees.value);
      const c = parseInt(sliderCost.value);

      // Render slider values
      if (valHours) valHours.textContent = h;
      if (valEmployees) valEmployees.textContent = e;
      if (valCost) valCost.textContent = c;

      // Maths: 220 working days/year
      const annualHours = h * e * 220;
      const annualMoney = annualHours * c;

      // Format outputs
      if (statHours) {
        statHours.textContent = new Intl.NumberFormat(LANG === 'es' ? 'es-ES' : 'en-US').format(annualHours) + 'h';
      }
      if (statMoney) {
        statMoney.textContent = new Intl.NumberFormat(LANG === 'es' ? 'es-ES' : 'en-US').format(annualMoney) + ' €';
      }
    }

    [sliderHours, sliderEmployees, sliderCost].forEach(slider => {
      slider.addEventListener('input', calculate);
    });

    // Run once on load
    calculate();
  }

  /* =====================================================
     EFECTO PARALLAX
  ===================================================== */
  function initParallax() {
    const bg = $('.parallax-bg');
    if (!bg) return;
    
    // Check if element is in viewport
    const container = document.querySelector('.parallax-banner');
    if (!container) return;

    window.addEventListener('scroll', () => {
      const rect = container.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Calculate how far down the section is scrolled
      if (rect.top < viewHeight && rect.bottom > 0) {
        const scrolledFraction = (viewHeight - rect.top) / (viewHeight + rect.height);
        // Translate image by up to 20% of banner height
        const translateVal = (scrolledFraction - 0.5) * 80; // range: -40px to +40px
        bg.style.transform = `translate3d(0, ${translateVal}px, 0)`;
      }
    });
  }

  /* =====================================================
     INIT
  ===================================================== */
  document.addEventListener('DOMContentLoaded', ()=>{
    // language choice
    let lang = 'es';
    try { lang = localStorage.getItem('valayre-lang') || 'es'; } catch(e){}
    applyLang(I18N[lang] ? lang : 'es');

    const switchBtn = $('#langSwitch');
    if (switchBtn) {
      switchBtn.addEventListener('click', () => applyLang(LANG === 'es' ? 'en' : 'es'));
    }

    const yr = $('#year');
    if (yr) yr.textContent = new Date().getFullYear();

    initShader();
    initCursor();
    initScroll();
    initMobileMenu();
    initMarquee();
    initFlowSimulator();
    initRoiCalculator();
    initParallax();


    initLoader(() => {
      initInView();
    });
  });
})();
