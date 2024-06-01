import { NavLink } from "react-router-dom";

const Navbar = () => {
  const link = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "md:border-b-4 pb-2 border-yellow-500 text-yellow-500 font-bold"
            : "font-semibold"
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "md:border-b-4 pb-2 border-yellow-500 text-yellow-500 font-bold"
            : "font-semibold"
        }
        to="/surveys"
      >
        Surveys
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "md:border-b-4 pb-2 border-yellow-500 text-yellow-500 font-bold"
            : "font-semibold"
        }
        to="/pro"
      >
        Get Premium
      </NavLink>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {link}
            </ul>
          </div>{" "}
          <a href="/" className="btn btn-ghost text-xl">
            InsightNexus
          </a>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-2 space-x-3">{link}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
