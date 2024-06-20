import Image from "next/image";
import CountUpNumber from "../CountUpNumber/CountUpNumber";
import ClientComponent from "../CountUpNumber/ClientComponent";
import { heading1, section2 } from "../CountUpNumber/ServerComponent";

const HeroSection = () => {
  return (
    <ClientComponent section2={section2} heading1={heading1}/>
  );
};

export default HeroSection;
