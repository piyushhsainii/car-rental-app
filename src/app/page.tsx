import { Fragment } from "react";
import NavMenu from "./components/NavMenu"
import Section1 from "./components/Section1";
import Footer from "./components/Footer";
import Section2 from "./components/Section2";

export default function Home() {
  return (
    <Fragment>
      <NavMenu/>
      <div className="">
        <Section1/>
        <Section2/>
        <Footer/>
    </div>
   </Fragment>
  );
}
