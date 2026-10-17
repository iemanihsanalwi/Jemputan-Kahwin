import { WeddingConfig } from "@/types/wedding";

/**
 * WEDDING APPLICATION CONFIGURATION
 *
 * Kemaskini semua maklumat perkahwinan di fail ini sahaja.
 * Tiada perubahan pada kod komponen diperlukan.
 */
export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      fullName: "Ieman Ihsan Bin Alwi",
      shortName: "Ieman",
      title: "Pengantin Lelaki",
      fatherName: "Alwi bin Mohd Yunus",
      motherName: "Sakinah binti Salleh",
      orderInFamily: "Putera bongsu kepada",
      bio: "Bersyukur dipertemukan dengan bidadari hati.",
      instagram: "https://instagram.com",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    },
    bride: {
      fullName: "Alya Athirah binti Aziz",
      shortName: "Alya",
      title: "Pengantin Perempuan",
      fatherName: "Aziz bin Jamiran",
      motherName: "Poniah binti Selamat",
      orderInFamily: "Puteri sulung kepada",
      bio: "Menemui ketenangan dalam ikatan suci ini.",
      instagram: "https://instagram.com",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    },
    familySideNote: "Walimatulurus Pihak Pengantin Lelaki & Perempuan",
  },

  quote: {
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    translationMalay:
      "“Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.”",
    source: "Surah Ar-Rum : Ayat 21",
  },

  event: {
    title: "Walimatulurus Alya & Ieman",
    invitationGreeting: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    invitationMessage:
      "Dengan penuh rasa kesyukuran ke hadrat Ilahi, kami sekeluarga dengan berbesar hati menjemput Dato' / Datin / Tuan / Puan / Encik / Cik serta seisi keluarga hadir ke majlis perkahwinan putera puteri kami bagi menyerikan lagi ikatan suci ini.",
    date: "2027-03-20", // YYYY-MM-DD
    dateDisplay: "Sabtu, 20 Mac 2027",
    hijriDate: "2 Jamadilakhir 1448H",
    receptionTime: "11:00 Pagi - 4:00 Petang",
    venueName: "Homestay Pachitan",
    venueHall: "Grand Ballroom, Tingkat 1",
    venueAddress:
      "Menara Mustapha Kamal, PJ Trade Centre, No. 8, Jalan PJU 8/8A, Bandar Damansara Perdana, 47820 Petaling Jaya, Selangor",
    coordinates: {
      lat: 3.1648,
      lng: 101.6117,
    },
    // Google Maps Embed URL (Standard embed iframe link)
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.6708682029587!2d101.61175607590812!3d3.164819953046759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49195eecb785%3A0xe54955b2cbefdf5f!2sGlam%20Hall%20Damansara!5e0!3m2!1sen!2smy!4v1710000000000!5m2!1sen!2smy",
    googleMapsUrl: "https://maps.app.goo.gl/9h4hKqM76vVn8k5f7",
    wazeUrl: "https://waze.com/ul/hw284ph06s",
    dressCode: {
      title: "Tema & Kod Pakaian",
      description: "Pakaian Tradisional Melayu / Formal & Sopan (Bebas bergaya)",
      colorPalette: [
        { name: "Sage Green", hex: "#8A9A86" },
        { name: "Soft Champagne", hex: "#F3E5AB" },
        { name: "Cream White", hex: "#FDFBF7" },
        { name: "Warm Gold", hex: "#D4AF37" },
      ],
    },
    schedule: [
      {
        time: "11:00 AM",
        title: "Ketibaan Tetamu Jemputan",
        description: "Alunan muzik gamelan & hidangan jamuan ringan pembuka selera.",
      },
      {
        time: "12:30 PM",
        title: "Perarakan Masuk Pengantin",
        description: "Perarakan mempelai diiringi paluan kompang & selawat.",
      },
      {
        time: "01:00 PM",
        title: "Bacaan Doa & Jamuan Makan Beradab",
        description: "Jamuan utama & persembahan nyanyian akustik.",
      },
      {
        time: "02:00 PM",
        title: "Upacara Memotong Kek & Sesi Bergambar",
        description: "Sesi ramah mesra dan bergambar bersama para tetamu.",
      },
      {
        time: "04:00 PM",
        title: "Majlis Bersurai",
        description: "Ucapan terima kasih & cenderahati kenang-kenangan.",
      },
    ],
  },

  contacts: [
    {
      name: "Megat Amirul (Pengantin Lelaki)",
      relation: "Pengantin Lelaki",
      phone: "+60123456789",
      whatsappMessage:
        "Salam Amirul, tahniah atas perkahwinan! Saya ingin bertanya mengenai majlis...",
    },
    {
      name: "Puteri Farhana (Pengantin Perempuan)",
      relation: "Pengantin Perempuan",
      phone: "+60198765432",
      whatsappMessage:
        "Salam Farhana, tahniah atas perkahwinan! Saya ingin bertanya mengenai majlis...",
    },
    {
      name: "Megat Zulkifli (Bapa Pengantin)",
      relation: "Bapa Pengantin Lelaki",
      phone: "+60133445566",
      whatsappMessage:
        "Salam Tuan Megat, saya ingin bertanya mengenai majlis perkahwinan...",
    },
    {
      name: "Datin Seri Rohani (Ibu Pengantin)",
      relation: "Ibu Pengantin Perempuan",
      phone: "+60137788990",
      whatsappMessage:
        "Salam Datin Seri, saya ingin bertanya mengenai majlis perkahwinan...",
    },
    {
      name: "Haziq (Floor Coordinator)",
      relation: "Pengurus Acara / RSVP Hotline",
      phone: "+601122334455",
      whatsappMessage:
        "Salam Encik Haziq, saya tetamu majlis dan ingin mendapatkan bantuan lokasi/RSVP.",
    },
  ],

  salamKaut: {
    bankName: "Maybank (Malayan Banking Berhad)",
    accountName: "MEGAT AMIRUL HAKIMI",
    accountNumber: "164285920194",
    qrCodeUrl:
      "https://images.unsplash.com/photo-1595079672139-545c0255a184?q=80&w=600&auto=format&fit=crop", // placeholder QR
    instructionText:
      "Kongsikan kegembiraan dan iringan doa restu anda melalui salam kaut digital secara selamat dan mudah.",
  },

  wishlist: [
    {
      id: "gift-1",
      title: "De'Longhi Dedica Espresso Machine",
      category: "Dapur",
      description: "Mesin kopi kompak untuk memulakan pagi kami bersama aroma segar.",
      priceEstimate: "RM 899.00",
      platform: "Shopee",
      storeLink: "https://shopee.com.my",
      image:
        "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=600&auto=format&fit=crop",
      isReserved: false,
    },
    {
      id: "gift-2",
      title: "Philips Air Fryer XXL Smart Sensing",
      category: "Dapur",
      description: "Membantu masakan sihat keluarga kecil kami dengan cepat & praktikal.",
      priceEstimate: "RM 749.00",
      platform: "Lazada",
      storeLink: "https://lazada.com.my",
      image:
        "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=600&auto=format&fit=crop",
      isReserved: true,
    },
    {
      id: "gift-3",
      title: "Dyson V8 Slim Fluffy Vacuum",
      category: "Elektronik",
      description: "Pembersih vakum tanpa wayar berkuasa tinggi untuk kediaman bersih.",
      priceEstimate: "RM 1,499.00",
      platform: "Shopee",
      storeLink: "https://shopee.com.my",
      image:
        "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=600&auto=format&fit=crop",
      isReserved: false,
    },
    {
      id: "gift-4",
      title: "IKEA STRANDMON Wing Chair (Nordic Green)",
      category: "Ruang Tamu",
      description: "Kerusi santai selesa untuk sudut membaca dan beristirehat.",
      priceEstimate: "RM 899.00",
      platform: "IKEA",
      storeLink: "https://www.ikea.com/my/en/",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
      isReserved: false,
    },
    {
      id: "gift-5",
      title: "Tefal Ingenio Elegance 10-Piece Cookware Set",
      category: "Dapur",
      description: "Set kuali dan periuk jimat ruang dengan pemegang tanggal serbaguna.",
      priceEstimate: "RM 420.00",
      platform: "TikTok Shop",
      storeLink: "https://shop.tiktok.com",
      image:
        "https://images.unsplash.com/photo-1584990347449-39b0222a7e78?q=80&w=600&auto=format&fit=crop",
      isReserved: false,
    },
  ],

  gallery: [
    {
      id: "photo-1",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
      caption: "Pertemuan pertama yang mengubah selamanya",
      aspectRatio: "landscape",
    },
    {
      id: "photo-2",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
      caption: "Cincin pertunangan tanda ikrar setia",
      aspectRatio: "portrait",
    },
    {
      id: "photo-3",
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop",
      caption: "Gelak tawa bersama di tepian pantai",
      aspectRatio: "square",
    },
    {
      id: "photo-4",
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop",
      caption: "Detik indah bersamamu",
      aspectRatio: "portrait",
    },
    {
      id: "photo-5",
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop",
      caption: "Menuju fasa kehidupan baharu",
      aspectRatio: "landscape",
    },
    {
      id: "photo-6",
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
      caption: "Kasih abadi hingga ke syurga",
      aspectRatio: "square",
    },
  ],

  music: {
    enabled: true,
    title: "Instrumental Melayu Asli - Akustik Gambus & Piano",
    artist: "Gubahan Kasih",
    // Royalty-free acoustic instrumental wedding audio
    src: "https://actions.google.com/sounds/v1/ambiences/outdoor_ambience_quiet.ogg",
    autoPlayPrompt: true,
  },

  rsvp: {
    deadline: "2026-11-28",
    maxPaxPerGuest: 5,
    allowKids: true,
  },

  admin: {
    pin: process.env.ADMIN_PIN || "037172",
  },

  seo: {
    siteName: "Walimatulurus Alya & Ieman",
    title: "Undangan Walimatulurus Alya & Ieman",
    description:
      "Dengan penuh kesyukuran, kami menjemput anda ke Majlis Walimatulurus Alya & Ieman pada Sabtu, 20 Mac 2027 di Homestay Pachitan.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://jemputan-kahwin.vercel.app",
    ogImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    keywords: [
      "Jemputan Kahwin",
      "Walimatulurus",
      "Alya dan Ieman",
      "RSVP Kahwin",
      "Kad Kahwin Digital",
      "Wedding Invitation Malaysia",
    ],
  },
};
