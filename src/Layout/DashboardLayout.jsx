import { FaEnvelope, FaHome, FaSearch } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import UseRole from "../Hooks/useRole";

const DashboardLayout = () => {
  const role = UseRole();
  return (
    <div className="min-h-screen md:flex">
      {/* Sidebar */}
      <div className="">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/surveys">Surveys</NavLink>
              </li>
              <li>
                <NavLink to="/reports">Reports</NavLink>
              </li>

              {role == "pro" && (
                <li>
                  <NavLink to="/comments">Comments</NavLink>
                </li>
              )}
              {role == "surveyor" && (
                <li>
                  <NavLink to="/create">Create Survey</NavLink>
                </li>
              )}

              <div className="divider"></div>
              <li>
                <NavLink to="/">
                  <FaHome></FaHome>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/order/salad">
                  <FaSearch></FaSearch>
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink to="/order/contact">
                  <FaEnvelope></FaEnvelope>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Outlet */}
      <div className="p-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
