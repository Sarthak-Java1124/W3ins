import AboutUs from "@/components/AboutUs";
import FAQ from "@/components/FAQ";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";
import Providers from "./providers";
import Footer from "@/components/Footer";

export default function Home(){
  return (
    <>
      <Providers>
        <Navbar />

        <LandingPage />
      </Providers>

      <AboutUs />
      <FAQ />
      <Footer/>
    </>
  );
}