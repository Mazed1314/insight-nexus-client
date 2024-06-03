import { Outlet } from "react-router-dom";
import Navbar from "../Component/Shared/Navbar";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div className="my-20">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
