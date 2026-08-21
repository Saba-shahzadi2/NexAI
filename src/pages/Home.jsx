import { Helmet } from "react-helmet-async";
import HomeSection from "../components/HomeSection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | NexAI</title>

        <meta
          name="description"
          content="Learn about NexAI, our mission, vision, and AI-powered solutions that help businesses automate workflows and improve productivity."
        />
      </Helmet>

      <HomeSection />
    </>
  );
};

export default Home;
