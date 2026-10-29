import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";
import EnvelopeModal from "@/components/EnvelopeModal";
import FloatingActionDock from "@/components/FloatingActionDock";
import ZellijBackground from "@/components/art/ZellijBackground";
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
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Moroccan / Islamic Zellij Geometric Background & Ambient Glow */}
      <ZellijBackground />

      {/* Royal "Buka Kad" Envelope Cover Gate with Guest Personalization */}
      <EnvelopeModal />

      {/* Desktop & Mobile Top Header Navigation */}
      <Navbar />

      {/* Floating Music Player with Spinning Disc & Fade Transitions (Bottom Corner) */}
      <AudioPlayer />

      {/* Sticky Bottom Floating Quick-Action Dock (Mobile 4-Triggers) */}
      <FloatingActionDock />

      {/* 1. Hero Section & Live Countdown */}
      <Hero />

      {/* 2. Bride & Groom Section & Doa Pengantin */}
      <ScrollReveal>
        <BrideGroom />
      </ScrollReveal>

      {/* 3. Event Information & Tentatif */}
      <ScrollReveal>
        <EventInfo />
      </ScrollReveal>

      {/* 4. Location & Map Section */}
      <ScrollReveal>
        <LocationSection />
      </ScrollReveal>

      {/* 5. RSVP System Section */}
      <ScrollReveal>
        <RsvpSection />
      </ScrollReveal>

      {/* 6. Guestbook & Wishes Section */}
      <ScrollReveal>
        <GuestbookSection />
      </ScrollReveal>

      {/* 7. Gift Wishlist Section */}
      <ScrollReveal>
        <WishlistSection />
      </ScrollReveal>

      {/* 8. Salam Kaut / Digital Angpow Section */}
      <ScrollReveal>
        <SalamKautSection />
      </ScrollReveal>

      {/* 9. Islamic Calligraphic Art & Doa Collection */}
      <ScrollReveal>
        <GallerySection />
      </ScrollReveal>

      {/* 10. Contact Section */}
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>

      {/* 11. Footer */}
      <Footer />
    </main>
  );
}
