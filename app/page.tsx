import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";
import EnvelopeModal from "@/components/EnvelopeModal";
import FloatingActionDock from "@/components/FloatingActionDock";
import BotanicalBackground from "@/components/art/BotanicalBackground";
import GardenBedDivider from "@/components/art/GardenBedDivider";
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
import { fetchWeddingConfig } from "@/lib/db";
import { WeddingConfigProvider } from "@/context/WeddingConfigContext";

// Ensure real-time dynamic rendering so updates are immediately visible to guests
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const config = await fetchWeddingConfig();

  return (
    <WeddingConfigProvider config={config}>
      <main className="relative min-h-screen">
        {/* Code-Drawn Botanical Repeating Pattern, Soft Watercolor Wash & Drifting Petals */}
        <BotanicalBackground />

        {/* Botanical "Buka Kad" Envelope Cover Gate with Guest Personalization */}
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

        {/* Botanical Meadow Transition */}
        <GardenBedDivider variant="meadow" />

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

        {/* Botanical Meadow Transition */}
        <GardenBedDivider variant="meadow" />

        {/* 9. Botanical Calligraphic Art & Doa Collection */}
        <ScrollReveal>
          <GallerySection />
        </ScrollReveal>

        {/* 10. Contact Section */}
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>

        {/* 11. Footer with Inverted Canopy & Grounding Meadow */}
        <Footer />
      </main>
    </WeddingConfigProvider>
  );
}
