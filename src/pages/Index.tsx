import Hero from "@/components/Hero";
import DriversSection from "@/components/DriversSection";
import TeamsSection from "@/components/TeamsSection";
import RaceCalendar from "@/components/RaceCalendar";
import StandingsPreview from "@/components/StandingsPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <DriversSection />
      <TeamsSection />
      <RaceCalendar />
      <StandingsPreview />
      <Footer />
    </div>
  );
};

export default Index;
