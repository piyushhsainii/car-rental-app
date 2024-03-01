import { Fragment } from "react";
import NavMenu from "./components/NavMenu"
import Section1 from "./components/Section1";

export default function Home() {
  return (
    <Fragment>
      <NavMenu/>
      <div className="">
        <Section1/>
    </div>
   </Fragment>
  );
}
