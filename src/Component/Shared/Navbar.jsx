import { NavLink, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { LiaGem } from "react-icons/lia";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Successfully log out!",
          icon: "success",
          confirmButtonText: "Cool",
        });
        console.log("user log out");
      })

      .catch((error) => console.error(error));
  };

  const link = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "md:border-b-4 pb-2 border-black text-black font-bold"
            : "font-bold"
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "md:border-b-4 pb-2 border-black text-black font-bold"
            : "font-bold"
        }
        to="/surveys"
      >
        Surveys
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "md:border-b-4 pb-2 flex border-black text-black font-bold"
            : "font-bold flex"
        }
        to="/pricing"
      >
        <LiaGem />
        Pricing
      </NavLink>
    </>
  );

  return (
    <div className="shadow-sm px-4 md:px-8 lg:px-16 navbar z-10 bg-white bg-opacity-90 fixed top-0">
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
          <img
            src="/images/insight-removebg-preview.png"
            className="w-20"
            alt=""
          />
        </a>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-4">{link}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <>
            <div className="dropdown dropdown-end z-10">
              <div
                className="hover:tooltip tooltip-open hover:tooltip-bottom z-10"
                data-tip={user.displayName}
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 border shadow rounded-full">
                    <img alt="user" src={user.photoURL} />
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="space-y-1 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <NavLink to="/dashboard" className={"hover:font-bold"}>
                  Dashboard
                </NavLink>
                <NavLink
                  onClick={handleLogOut}
                  to="/"
                  className={"hover:font-bold"}
                >
                  Logout
                </NavLink>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="font-medium hover:text-gray-500 mr-3">
              <u>Login</u>
            </Link>
            <Link to="/register" className="font-medium hover:text-gray-500 ">
              <u>Sign Up</u>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
