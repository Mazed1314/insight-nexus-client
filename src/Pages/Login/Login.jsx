import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaFacebook, FaGithub, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser, signInWithGoogle, signInWithGitHub, signInWithFacebook } =
    useAuth();
  const [show, setShow] = useState("false");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogle = () => {
    signInWithGoogle()
      .then((userCredential) => {
        // console.log(userCredential.user);
        const role = "user";
        const name = userCredential.user.displayName;
        const photoURL = userCredential.user.photoURL;
        const email = userCredential.user.email;
        if (userCredential.user) {
          const addNewUser = { name, email, photoURL, role };

          const url = "http://localhost:5000/user";
          // send data to the server

          fetch(url, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(addNewUser),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.insertedId) {
                Swal.fire({
                  title: "Successfully Google Login!",
                  position: "top-end",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(from, { replace: true });
              }
            });
        }
      })
      .catch((error) => {
        console.error(error);
        const GlError = error.message;
        const notifyGlError = () => toast.error(GlError);
        notifyGlError();
      });
  };
  const handleGithub = () => {
    signInWithGitHub()
      .then((userCredential) => {
        const role = "user";
        const name = userCredential.user.displayName;
        const photoURL = userCredential.user.photoURL;
        const email = userCredential.user.email;
        if (userCredential.user) {
          const addNewUser = { name, email, photoURL, role };

          const url = "http://localhost:5000/user";
          // send data to the server

          fetch(url, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(addNewUser),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.insertedId) {
                Swal.fire({
                  title: "Successfully Google Login!",
                  position: "top-end",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(from, { replace: true });
              }
            });
        }
      })
      .catch((error) => {
        console.error(error);
        const GitError = error.message;
        const notifyGitError = () => toast.error(GitError);
        notifyGitError();
      });
  };
  const handleFacebook = () => {
    signInWithFacebook()
      .then((userCredential) => {
        console.log(userCredential.user);
        if (userCredential.user) {
          Swal.fire({
            title: "Successfully facebook Login!",
            position: "top-end",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
        const GitError = error.message;
        const notifyGitError = () => toast.error(GitError);
        notifyGitError();
      });
  };
  const onSubmit = (data) => {
    const { email, password } = data;

    signInUser(email, password)
      .then((userCredential) => {
        // console.log(userCredential.user);
        if (userCredential.user) {
          Swal.fire({
            title: "Successfully Login!",
            position: "top-end",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        console.error(error.message);
        const notify = () => toast.error("Wrong email or password");
        notify();
      });
  };

  return (
    <div className="hero md:min-h-screen bg-transparent rounded-t-md">
      <Helmet>
        <title>InsightNexus | Login</title>
      </Helmet>
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-2xl md:text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card border contrast-125  border-black drop-shadow-2xl mb-4 shrink-0 w-full max-w-sm  bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-0">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered border-black"
                {...register("email", { required: true })}
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={show ? "password" : "text"}
                name="password"
                placeholder="password"
                className="input input-bordered border-black"
                {...register("password", { required: true })}
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute top-12 right-2"
              >
                {show ? (
                  <FaRegEyeSlash className="text-xl text-black" />
                ) : (
                  <FaRegEye className="text-xl text-black" />
                )}
              </span>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-black text-xl text-white">Login</button>
            </div>
          </form>
          <ToastContainer />
          <p className="text-center">
            New here ? Please{" "}
            <Link to="/register">
              <button className="btn btn-active btn-link text-black">
                Register
              </button>
            </Link>
          </p>
          <p className="text-center">Sign in with</p>
          <p className="flex justify-center my-4 gap-4">
            <a
              onClick={handleGoogle}
              className="px-2 border rounded-full btn btn-sm"
            >
              <FcGoogle className="text-lg" />
            </a>
            <a
              onClick={handleFacebook}
              className="px-2 border rounded-full btn btn-sm"
            >
              <FaFacebook className="text-xl text-blue-500" />
            </a>
            <a
              onClick={handleGithub}
              className="px-2 border rounded-full btn btn-sm text-xl"
            >
              <FaGithub className="text-black" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
