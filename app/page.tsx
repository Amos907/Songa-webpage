import { Hero, LandingFooter, Mission, Trustees } from "../components";
import AboutUs from "@/components/Landing/AboutUs";
import ServicesOffered from "@/components/Landing/ServicesOffered"
import Cards from'@/components/Landing/Cards'
import RiderRegistration from "@/components/Landing/RiderRegistration";

export default function Home() {
  return (
    <div>
      <Hero />
      <Trustees/>
      <AboutUs/>
      <ServicesOffered/>
      {/* <RiderRegistration /> */}
    </div>
    
);
}
