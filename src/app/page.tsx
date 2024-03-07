import { Fragment } from "react";
import NavMenu from "./components/NavMenu"
import Section1 from "./components/Section1";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <Fragment>
      <NavMenu/>
      <div className="">
        <Section1/>
        <Footer/>
    </div>
   </Fragment>
  );
}
