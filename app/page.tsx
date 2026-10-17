import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";
import Hero from "@/components/Hero";
import BrideGroom from "@/components/BrideGroom";
import EventInfo from "@/components/EventInfo";
import LocationSection from "@/components/LocationSection";
import RsvpSection from "@/components/RsvpSection";
import GuestbookSection from "@/components/GuestbookSection";
import WishlistSection from "@/components/WishlistSection";
import SalamKautSection from "@/components/SalamKautSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Navigation Header & Floating Mobile Dock */}
      <Navbar />

      {/* Floating Music Player */}
      <AudioPlayer />

      {/* 1. Hero Section & Countdown */}
      <Hero />

      {/* 2. Bride & Groom Section */}
      <BrideGroom />

      {/* 3. Event Information & Tentatif */}
      <EventInfo />

      {/* 4. Location & Map Section */}
      <LocationSection />

      {/* 5. RSVP System Section */}
      <RsvpSection />

      {/* 6. Guestbook & Wishes Section */}
      <GuestbookSection />

      {/* 7. Gift Wishlist Section */}
      <WishlistSection />

      {/* 8. Salam Kaut / Digital Angpow Section */}
      <SalamKautSection />

      {/* 9. Photo Gallery with Lightbox */}
      <GallerySection />

      {/* 10. Contact Section */}
      <ContactSection />

      {/* 11. Footer */}
      <Footer />
    </main>
  );
}
