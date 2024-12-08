import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />

      <div className="my-16 min-h-screen">
        <Outlet></Outlet>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
