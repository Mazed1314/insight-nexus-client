import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet";

// Reusable InputField Component
const InputField = ({ label, type, name, placeholder, required = false }) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="input input-bordered border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
      required={required}
    />
  </div>
);

// Password Input Component with Toggle Visibility
const PasswordInput = ({ name, placeholder, show, setShow }) => (
  <div className="form-control relative">
    <label className="label">
      <span className="label-text">Password</span>
    </label>
    <input
      type={show ? "password" : "text"}
      name={name}
      placeholder={placeholder}
      className="input input-bordered border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
    <span
      onClick={() => setShow(!show)}
      className="absolute top-12 right-2 cursor-pointer"
    >
      {show ? (
        <FaRegEyeSlash className="text-xl text-gray-600 hover:text-black" />
      ) : (
        <FaRegEye className="text-xl text-gray-600 hover:text-black" />
      )}
    </span>
  </div>
);

const Register = () => {
  const { createUser } = useAuth();
  const [registerError, setRegisterError] = useState("");
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const role = "user";
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (
      password.length < 6 ||
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).+$/.test(password)
    ) {
      setRegisterError(
        "Password must include uppercase, lowercase, numeric, and special characters, with at least 6 characters."
      );
      setLoading(false);
      return;
    }

    setRegisterError("");
    createUser(email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: name,
          photoURL,
        });

        const newUser = { name, email, photoURL, role, password };
        fetch("https://insight-nexus-server.vercel.app/user", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              setLoading(false);
              e.target.reset();
              toast.success("Successfully registered!");
              navigate(from, { replace: true });
            }
          });
      })
      .catch((error) => {
        setRegisterError(error.message);
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hero md:min-h-screen bg-gray-100 rounded-t-md"
    >
      <Helmet>
        <title>InsightNexus | Register</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left mb-6 lg:mb-0">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Join Us Now!
          </h1>
          <p className="py-2 text-gray-600">
            Register to unlock the full potential of InsightNexus and start your
            journey today.
          </p>
        </div>
        <div className="card max-w-md w-full shadow-xl bg-white rounded-lg p-6 border border-gray-200">
          <form onSubmit={handleRegister} className="space-y-4">
            <InputField
              label="Name"
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
            <InputField
              label="Photo URL"
              type="text"
              name="photoURL"
              placeholder="Enter your photo link"
              required
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
            <PasswordInput
              name="password"
              placeholder="Enter your password"
              show={show}
              setShow={setShow}
            />
            {registerError && (
              <p className="text-red-500 text-sm">{registerError}</p>
            )}
            <div className="form-control mt-6">
              <button className="btn bg-blue-500 hover:bg-blue-700 text-white text-lg">
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default Register;
