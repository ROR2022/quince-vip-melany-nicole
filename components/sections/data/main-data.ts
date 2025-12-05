/**
 * 
 Festejada
 Melany Nicole González Meneses 
 
 padres 
 Marco Antonio González Ramírez
 Juana Meneses
 
 padrinos
 Mario Reyes Campos
 María de los Ángeles García Ojeda 

Su cuenta regresiva 
Fecha especial: 7 de febrero del 2026 

Ceremonia religiosa en el salón a las 7:00 PM y la fiesta a las 8:00 PM 

Dirección del salón es: 
Salón ideal Tenayuca 
chalmita Lt. 47, Col. Zona escolar, C.P. 07230, Gustavo A. Madero, México D.F.

Confirmar asistencia 
Código de vestimenta formal, color dorado exclusiva para la quinceañera 

 */


export const quinceMainData = {
  hero: {
    name: "Melany Nicole",
    subtitle: "¡Mis XV años!",
    backgroundImage: "/images/fotoMelany01.jpg",
    quote:
      "La vida es un viaje mágico, y hoy celebro un capítulo especial lleno de sueños y esperanza.",
    backgroundCarrouselImages: [
      "/images/dahian01.jpg",
      "/images/dahian02.jpg",
      "/images/dahian03.jpg",
    ],
  },
  welcomeSection: {
    message:
      "Con mucha alegría y emoción, te invito a celebrar mis XV años. Será un día lleno de magia, amor y momentos inolvidables. ¡Espero contar con tu presencia para hacer de este día algo realmente especial!",
    backgroundImage: "/images/dahian12.jpg",
  },
  event: {
    celebrant: "Melany Nicole",
      parents: {
      father: "Marco Antonio González Ramírez",
      mother: "Juana Meneses",
      message: `Hoy, mi corazón rebosa de gratitud. 
                Doy gracias a Dios por cada paso de mi vida y a mis padres  
                por cuidarme y guiarme en este camino.
                Hace quince años mis padres agradecieron a Dios por mi vida. 
                Hoy, yo agradezco a Dios por ellos, por su infinito amor y paciencia.`,
      backgroundImage: "/images/fondoLila&Dorado1.jpg",
      parentsImage: "/images/padresDahian.jpg",
    },
    
    godparents: {
      godfather: "Mario Reyes Campos",
      godmother: "María de los Ángeles García Ojeda",
      godparentsImage: "/images/padrinosDahian.jpg",
    },
    date: {
      full: "Sábado 07 de Febrero 2026",
      isoDate: "2026-02-07T19:00:00",
      day: "Sábado",
      dayNumber: "07",
      month: "Febrero",
      year: "2026",
      date: "07 de Febrero 2026",
      mensaje1: "¡La cuenta regresiva ha comenzado!",
      mensaje2: "TAN SOLO FALTAN",
      backgroundCarrouselImages: [
        "/images/dahian04.jpg",
        "/images/dahian05.jpg",
        "/images/dahian06.jpg",
      ],
    },
    ceremony: {
      time: "19:00 hrs.",
      venue: "Salón Ideal Tenayuca",
      address: "Chalmita Lt. 47, Col. Zona escolar, C.P. 07230, Gustavo A. Madero, México D.F.",
      type: "Misa de Acción de Gracias",
      ubiLink: "https://maps.app.goo.gl/vpY6xvwxQUDUnXPZ8",
      ceremonyImage: "/images/dahian14.jpg",
    },
    party: {
      time: "20:00 hrs.",
      venue: "Salón Ideal Tenayuca",
      address: "Chalmita Lt. 47, Col. Zona escolar, C.P. 07230, Gustavo A. Madero, México D.F.",
      type: "Baile y Celebración",
      ubiLink: "https://maps.app.goo.gl/vpY6xvwxQUDUnXPZ8",
    },
    dressCode: "Formal",
    restrictions: "",
  },
  timeline: {
    title: "Itinerario del Evento",
    timelineImage: "/images/dahian13.jpg",
    mensaje: `Cada momento de este día especial ha sido cuidadosamente planeado 
    para crear recuerdos inolvidables. 
    Desde la ceremonia hasta la celebración, cada detalle refleja el amor y 
    la alegría que compartimos. ¡Espero que disfrutes cada instante tanto como yo!`,
    images: [
      "/images/dahian16.jpg",
      "/images/dahian17.jpg",
      "/images/dahian18.jpg",
    ],
    events: [
      {
        id: "event1",
        time: "17:30 hrs.",
        title: "Misa de Acción de Gracias",
        description: "Ceremonia en la Parroquia Santa Fe de Guadalupe.",
        icon: "⛪",
      },
      {
        id: "event2",
        time: "20:00 hrs.",
        title: "Recepción en Salón",
        description: "Comida, baile y celebración en el Salón Texano.",
        icon: "🎉",
      },
      {
        id: "event3",
        time: "21:30 hrs.",
        title: "Baile de Quinceañera",
        description: "Primer baile y apertura de la pista de baile.",
        icon: "💃",
      },
      {
        id: "event4",
        time: "22:00 hrs.",
        title: "Brindis y Palabras",
        description: "Brindis especial y palabras de agradecimiento.",
        icon: "🥂",
      },
      {
        id: "event7",
        time: "23:00 hrs.",
        title: "Banda",
        description: "Presentación especial de banda musical.",
        icon: "🎺",
      },
      {
        id: "event5",
        time: "00:00 hrs.",
        title: "Corte de Pastel",
        description: "Momento especial del corte de pastel.",
        icon: "🍰",
      },
      {
        id: "event8",
        time: "01:00 hrs.",
        title: "Despedida y Agradecimientos",
        description: "Palabras finales y despedida de los invitados.",
        icon: "🙏",
      },
    ],
  },
  dressCode:{
    title: "Código de Vestimenta",
    message: "¡Vístete para impresionar!",
    subtitle: "Código de vestimenta formal - Dorado exclusivo para la quinceañera",
    restriction: "Restricción: No niños",
    backgroundImage: "/images/dressCode1.png",
  },
  countdown: {
    targetDate: "December 27, 2025 17:00:00",
    backgroundImage: "/images/countdown-bg.jpg",
  },
  attendance: {
    whatsappNumber: "5213333030906", //+52 1 33 3303 0906
    title: "CONFIRMACIÓN DE ASISTENCIA",
    message: "Respetuosamente",
    subtitle: "Confirmar antes del evento.",
    fields: {
      name: "Nombre completo",
      response: "¿Podrás acompañarme?",
      companions: "Nombre(s) de acompañante(s)",
      phone: "Número de celular",
      responseOptions: {
        yes: "¡Claro, ahí estaré!",
        no: "Lo siento, no podré asistir.",
      },
    },
    images:[
      "/images/dahian10.jpg",
      "/images/dahian11.jpg",
      "/images/dahian19.jpg",
    ],
    thankYouMessage:
      "¡Gracias por confirmar tu asistencia! Nos alegra que puedas acompañarnos en este día tan especial.",
  },
  gifts: {
    title: "Lista de Regalos",
    subtitle: "Tu presencia es el mejor regalo, pero si deseas contribuir, aquí tienes algunas ideas.",
    message:
      "Agradezco de corazón tu generosidad y apoyo en este día tan especial. ¡Gracias por ser parte de mi vida!",
    giftsOptions: [
      {
        id: "lluviaSobres",
        name: "Lluvia de Sobres",
        icon: "💌",
        description:
          "Tu presencia es el mejor regalo, pero si deseas contribuir, una lluvia de sobres sería muy apreciada.",
        image: "/images/gifts/envelope.png",
        link: "https://example.com/lluvia-de-sobres",
      },
      {
        id: "regaloSorpresa",
        name: "Regalo Sorpresa",
        icon: "🎁",
        description:
          "Una sorpresa especial siempre es bienvenida. ¡Elige algo que creas que me encantará!",
        image: "/images/gifts/gift-box.png",
        link: "https://example.com/mesa-de-regalos",
      }
    ],
  },
  gallery: {
    title: "Recuerdos Especiales",
    subtitle: "Momentos inolvidables",
    description:
      "Cada imagen captura la esencia de este día tan especial. ¡Gracias por ser parte de estos recuerdos inolvidables!",
    images: [
      {
        id: "image1",
        src: "/images/dahian01.jpg",
        alt: "en sus XV años",
        caption: "Momentos especiales.",
      },
      {
        id: "image2",
        src: "/images/dahian02.jpg",
        alt: "Baile de Quinceañera",
        caption: "Momentos especiales.",
      },
      {
        id: "image3",
        src: "/images/dahian03.jpg",
        alt: "Corte de Pastel",
        caption: "Momentos especiales.",
      },
      {
        id: "image4",
        src: "/images/dahian04.jpg",
        alt: "Celebración con Familia y Amigos",
        caption: "Momentos especiales.",
      },
      {
        id: "image5",
        src: "/images/dahian05.jpg",
        alt: "Detalles del Evento",
        caption: "Momentos especiales.",
      },
      {
        id: "image6",
        src: "/images/dahian06.jpg",
        alt: "Diversión en la Pista de Baile",
        caption: "Momentos especiales.",
      },
      {
        id: "image7",
        src: "/images/dahian07.jpg",
        alt: "Sesión de Fotos",
        caption: "Momentos especiales.",
      },
      {
        id: "image8",
        src: "/images/dahian08.jpg",
        alt: "Melany Nicole y sus Padres",
        caption: "Momentos especiales.",
      },
      {
        id: "image9",
        src: "/images/dahian09.jpg",
        alt: "Melany Nicole con sus Padrinos",
        caption: "Momentos especiales.",
      },
      {
        id: "image10",
        src: "/images/dahian10.jpg",
        alt: "Melany Nicole con sus Amigos",
        caption: "Momentos especiales.",
      },
      {
        id: "image11",
        src: "/images/dahian11.jpg",
        alt: "Melany Nicole en la Fiesta",
        caption: "Momentos especiales.",
      },
      {
        id: "image12",
        src: "/images/dahian12.jpg",
        alt: "Melany Nicole en la Ceremonia",
        caption: "Momentos especiales.",
      },
      {
        id: "image13",
        src: "/images/dahian13.jpg",
        alt: "Melany Nicole en sus XV años",
        caption: "Momentos especiales.",
      },
      {
        id: "image14",
        src: "/images/dahian14.jpg",
        alt: "Melany Nicole con sus Padres",
        caption: "Momentos especiales.",
      },
      {
        id: "image15",
        src: "/images/dahian15.jpg",
        alt: "Melany Nicole con sus Padrinos",
        caption: "Momentos especiales.",
      },
      {
        id: "image16",
        src: "/images/dahian16.jpg",
        alt: "Melany Nicole con sus Amigos",
        caption: "Momentos especiales.",
      },
      {
        id: "image17",
        src: "/images/dahian17.jpg",
        alt: "Melany Nicole en la Fiesta",
        caption: "Momentos especiales.",
      },
      {
        id: "image18",
        src: "/images/dahian18.jpg",
        alt: "Melany Nicole en la Ceremonia",
        caption: "Momentos especiales.",
      },
      {
        id: "image19",
        src: "/images/dahian19.jpg",
        alt: "Melany Nicole con sus Padres",
        caption: "Momentos especiales.",
      },
    ],
    imagesUrls: [
      "/images/rapunzel1.jpeg",
      "/images/rapunzel2.jpeg",
      "/images/rapunzel3.jpeg",
      "/images/rapunzel4.jpeg",
      "/images/rapunzel5.jpeg",
      "/images/rapunzel6.jpeg",
      "/images/rapunzel7.jpeg",
      "/images/rapunzel8.jpeg",
    ],
  },
  qrcodeSection:{
    title: "Escanea el Código QR",
    celebrant: "Melany Nicole",
    message: "Para acceder fácilmente a la invitación en tu dispositivo móvil.",
    mainImage: "/images/qrcode-bg.jpg",
  },
  music: {
    src: "/music/quinceanera-song.mp3",
    title: "Canción de Quinceañera",
    artist: "Artista Invitado",
  },
  // 🎵 Configuración de audio
  audio: {
    src: "/audio/musica.mp3",
    fallbacks: ["/audio/musica.ogg", "/audio/musica.wav"],
    title: "Música de Fondo de Boda",
    startTime: 10, // 0:13 - Donde empieza la letra
    endTime: 200, // 1:25 - Final del segmento
    volume: 0.7, // 60% de volumen
    loop: true, // Loop en el rango especificado
    preload: "metadata", // Precargar solo metadatos
    enabled: true, // Control habilitado
    position: {
      desktop: { bottom: "2rem", right: "2rem" },
      mobile: { bottom: "1rem", right: "1rem" },
    },
    styling: {
      size: {
        desktop: "60px",
        mobile: "50px",
      },
      colors: {
        primary: "#e3aaaa",
        hover: "#d48c8c",
        background: "rgba(255, 255, 255, 0.8)",
        icon: "#333",
      },
    },
  },
  VIP_COLORS: {
    rosaAurora: '#E91E63',      // Rosa principal
    lavandaAurora: '#9C27B0',   // Púrpura principal
    oroAurora: '#FF9800',       // Naranja dorado
    blancoSeda: '#FFFFFF',      // Blanco puro
    cremaSuave: '#F5F5F5',      // Gris claro
    rosaIntensa: '#C2185B',     // Rosa intenso
    lavandaIntensa: '#7B1FA2',  // Púrpura intenso
    oroIntensio: '#F57C00',     // Naranja intenso
    rosaDelicada: '#F8BBD9'     // Rosa suave
  },
  customInvitations:{
    adminPassword: "admin1234",
    invitationUrl: "https://quince-vip-dahian-guadalupe.vercel.app/",
    suggested_messages: [
  "¡Querida amiga! Te invito a celebrar conmigo el día más mágico de mi vida. ¡Espero verte brillar junto a mí!",
  "¡Familia querida! Este día especial no sería lo mismo sin ustedes. ¡Los espero con mucho amor!",
  "¡Hola! Me encantaría que seas parte de mi celebración de XV años. ¡Será una noche inolvidable!",
  "¡Queridos padrinos! Su presencia es fundamental en este momento tan especial. ¡Los espero con cariño!",
  "¡Amigos del alma! Vengan a celebrar conmigo esta nueva etapa. ¡Será una fiesta increíble!",
    ]
  }
};
