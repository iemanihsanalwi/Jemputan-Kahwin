export interface CouplePerson {
  fullName: string;
  shortName: string;
  title: string; // e.g. "Pengantin Lelaki"
  fatherName: string;
  motherName: string;
  orderInFamily: string; // e.g. "Putera sulung kepada"
  bio: string;
  instagram?: string;
  image: string;
}

export interface EventScheduleItem {
  time: string;
  title: string;
  description?: string;
  iconName?: string;
}

export interface ContactPerson {
  name: string;
  relation: string; // e.g. "Pengantin Lelaki", "Bapa Pengantin", "Ibu Pengantin", "Koordinator"
  phone: string; // e.g. "+60123456789"
  whatsappMessage?: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  category: "Dapur" | "Bilik Tidur" | "Ruang Tamu" | "Elektronik" | "Lain-lain";
  description: string;
  priceEstimate?: string;
  platform: "Shopee" | "Lazada" | "TikTok Shop" | "IKEA" | "Lain-lain";
  storeLink: string;
  image: string;
  isReserved?: boolean;
}

export interface BankAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
  qrCodeUrl: string;
  instructionText?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
}

export interface WeddingConfig {
  couple: {
    groom: CouplePerson;
    bride: CouplePerson;
    familySideNote: string; // "Walimatulurus pihak pengantin lelaki & perempuan"
  };
  quote: {
    arabic: string;
    translationMalay: string;
    source: string;
  };
  event: {
    title: string;
    invitationGreeting: string;
    invitationMessage: string;
    date: string; // ISO format e.g. "2026-12-12"
    dateDisplay: string;
    hijriDate: string;
    receptionTime: string;
    venueName: string;
    venueHall: string;
    venueAddress: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    googleMapsEmbedUrl: string;
    googleMapsUrl: string;
    wazeUrl: string;
    dressCode: {
      title: string;
      description: string;
      colorPalette: { name: string; hex: string }[];
    };
    schedule: EventScheduleItem[];
  };
  contacts: ContactPerson[];
  salamKaut: BankAccount;
  wishlist: WishlistItem[];
  gallery: GalleryPhoto[];
  music: {
    enabled: boolean;
    title: string;
    artist: string;
    src: string;
    autoPlayPrompt: boolean;
  };
  rsvp: {
    deadline: string;
    maxPaxPerGuest: number;
    allowKids: boolean;
  };
  admin: {
    pin: string;
  };
  seo: {
    siteName: string;
    title: string;
    description: string;
    url: string;
    ogImage: string;
    keywords: string[];
  };
}

export interface RsvpSubmission {
  id?: string;
  guest_name: string;
  phone_number: string;
  attendance_status: "hadir" | "tidak_hadir";
  attendees_count: number;
  remarks?: string;
  created_at?: string;
}

export interface GuestWish {
  id: string;
  sender_name: string;
  relationship?: string;
  message: string;
  is_approved: boolean;
  likes_count: number;
  created_at: string;
}
