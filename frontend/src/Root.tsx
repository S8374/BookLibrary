import { Outlet } from "react-router";
import "./App.css";
import Footer from "./layout/Footer/Footer";
import TopHeader from "./layout/Home/TopHeader/TopHeader";
import Navbar from "./layout/Home/Navbar/Navbar";

function Root() {
  return (
    <div className="">
      <TopHeader />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
