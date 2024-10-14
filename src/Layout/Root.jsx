import { Outlet } from "react-router-dom";
import Navbar from "../Component/Shared/Navbar";
import Footer from "../Component/Shared/Footer";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div className="my-16 min-h-screen">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Root;
