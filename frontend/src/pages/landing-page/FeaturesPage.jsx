import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Header, Overlay, SectionWrapper, Title, Wrapper } from "./styles";
import HeroSection from "./HeroSection";
import Feature from "./Feature";
import ImageBox from "./ImageBox";
import feat1 from "@/assets/images/features/1.png";
import feat2 from "@/assets/images/features/2.png";
import feat3 from "@/assets/images/features/3.png";
import JoinNetwork from "./JoinNetwork";

const FeaturesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Header>
        <Overlay>
          <Title>Features</Title>
        </Overlay>
      </Header>
      <HeroSection />
      <Feature />
      <SectionWrapper className="box">
        <Wrapper>
          <ImageBox
            url="/login"
            tag="Features"
            img={feat1}
            title="Connect and post in our network"
            description="Create, interact with, and scroll through deals and questions posted by members of our community."
            buttonLabel="Login to Dasboard"
            order="1"
          />
        </Wrapper>
      </SectionWrapper>
      <SectionWrapper className="dark box">
        <Wrapper>
          <ImageBox
            url="/login"
            tag="Features"
            img={feat2}
            title="Track your favorite products at a glance"
            description="Create, interact with, and scroll through deals and questions posted by members of our community."
            buttonLabel="Get Started"
            btnVariant="white"
          />
        </Wrapper>
      </SectionWrapper>
      <SectionWrapper className="box">
        <Wrapper>
          <ImageBox
            url="/login"
            tag="Features"
            img={feat3}
            title="Streamlined Communication"
            description="Direct message traders about deals, chat in groups or chat amongst your team members with our intuitive messaging service."
            buttonLabel="Login to Dasboard"
            order="1"
          />
        </Wrapper>
      </SectionWrapper>
      <JoinNetwork />
      <Footer />
    </>
  );
};

export default FeaturesPage;
