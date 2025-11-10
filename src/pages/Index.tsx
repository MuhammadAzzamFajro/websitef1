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
      <DriversSection limit={6} showViewMore={true} />
      <TeamsSection limit={2} showViewMore={true} />
      <RaceCalendar limit={4} showViewMore={true} />
      <StandingsPreview limit={5} showViewMore={true} />
      <Footer />
    </div>
  );
};

export default Index;