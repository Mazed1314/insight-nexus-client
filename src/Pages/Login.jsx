import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { FaFacebook, FaGithub, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import InputField from "../components/login/InputField";
import SocialButton from "../components/login/SocialButton";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const { signInUser, signInWithGoogle, signInWithGitHub, signInWithFacebook } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    const { email, password } = data;

    try {
      const userCredential = await signInUser(email, password);
      if (userCredential.user) {
        Swal.fire({
          title: "Successfully Logged In!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Login
  const handleGoogle = async () => {
    try {
      const userCredential = await signInWithGoogle();
      // Process userCredential and navigate
      toast.success("Successfully Logged in with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>InsightNexus | Login</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row">
        {/* Left Section */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 60 }}
        >
          <h1 className="text-5xl font-bold">Welcome Back!</h1>
          <p className="py-6">
            Login to access your account and explore our amazing features.
          </p>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="card w-full max-w-md shadow-2xl bg-white"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* Email Field */}
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              register={register("email", { required: true })}
            />

            {/* Password Field */}
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              register={register("password", { required: true })}
              icon={
                showPassword ? (
                  <FaRegEyeSlash onClick={() => setShowPassword(false)} />
                ) : (
                  <FaRegEye onClick={() => setShowPassword(true)} />
                )
              }
            />

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="btn btn-primary w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <div className="text-center">
            <p>
              New here?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Create an account
              </Link>
            </p>
            <p className="my-4">Or login with:</p>
            <div className="flex justify-center gap-4 my-4">
              <SocialButton
                icon={<FcGoogle />}
                onClick={handleGoogle}
                tooltip="Login with Google"
              />
              <SocialButton
                icon={<FaFacebook className="text-blue-500" />}
                onClick={signInWithFacebook}
                tooltip="Login with Facebook"
              />
              <SocialButton
                icon={<FaGithub />}
                onClick={signInWithGitHub}
                tooltip="Login with GitHub"
              />
            </div>
          </div>
        </motion.div>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default Login;
