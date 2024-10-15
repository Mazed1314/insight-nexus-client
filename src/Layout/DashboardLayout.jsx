import { FaEnvelope, FaHome, FaSearch } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import UseRole from "../Hooks/useRole";

const DashboardLayout = () => {
  const role = UseRole();
  // console.log(role);

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
            <ul className="menu z-20 p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <NavLink to="/dashboard/profile">profile</NavLink>
              </li>
              {role[0] === "user" && (
                <>
                  <li>
                    <NavLink to="/dashboard/user/surveys">
                      Participate Surveys
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/user/my-reports">
                      My Reports
                    </NavLink>
                  </li>
                </>
              )}

              {role[0] === "pro" && (
                <>
                  <li>
                    <NavLink to="/dashboard/user/surveys">
                      Participate Surveys
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/user/my-reports">
                      My Reports
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/user/comments">Comments</NavLink>
                  </li>
                </>
              )}
              {role[0] === "surveyor" && (
                <>
                  <li>
                    <NavLink to="/dashboard/surveyor/create">
                      Create Survey
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/surveyor/manage">
                      Manage Survey
                    </NavLink>
                  </li>
                </>
              )}
              {role[0] === "admin" && (
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
                <NavLink to="/surveys">
                  <FaSearch></FaSearch>
                  Surveys
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact">
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
            className="btn my-10 bg-amber-400 drawer-button lg:hidden"
          >
            Open Menu
          </label>
        </div>

        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
