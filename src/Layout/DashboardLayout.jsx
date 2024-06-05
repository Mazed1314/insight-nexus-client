import { FaEnvelope, FaHome, FaSearch } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import UseRole from "../Hooks/useRole";

const DashboardLayout = () => {
  const role = UseRole();
  console.log(role[0]);

  return (
    <div className="min-h-screen md:flex">
      {/* Sidebar */}
      <div className="">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}

              <li>
                <NavLink to="/dashboard/surveys">Participate Surveys</NavLink>
              </li>
              {role[0] !== "admin" && (
                <li>
                  <NavLink to="/dashboard/reports">My Reports</NavLink>
                </li>
              )}

              {role[0] == "pro" && (
                <li>
                  <NavLink to="/dashboard/comments">Comments</NavLink>
                </li>
              )}
              {role[0] == "surveyor" && (
                <li>
                  <NavLink to="/dashboard/create">Create Survey</NavLink>
                </li>
              )}
              {role[0] == "admin" && (
                <>
                  <li>
                    <NavLink to="/dashboard/admin/surveys">
                      Manage Survey
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/admin/users">Manage Users</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/admin/payments">Payments</NavLink>
                  </li>
                </>
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
      <div className="w-full m-2">
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn my-10 drawer-button lg:hidden"
          >
            Open Dashboard
          </label>
        </div>

        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
