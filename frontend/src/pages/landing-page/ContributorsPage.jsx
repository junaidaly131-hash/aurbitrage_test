import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Header, Overlay, Title } from "./styles";
import HeroSection from "./HeroSection";
import Contributors from "./Contibutors";
import JoinNetwork from "./JoinNetwork";

const ContributorsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Header>
        <Overlay>
          <Title>Our Contributors</Title>
        </Overlay>
      </Header>
      <HeroSection
        title="Ready to experience the Aurbitrage advantage?"
        description="The precious metals trading platform, powering real-time pricing."
      />
      <Contributors />
      <JoinNetwork />
      <Footer />
    </>
  );
};

export default ContributorsPage;
