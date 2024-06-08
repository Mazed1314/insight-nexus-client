import { updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import auth from "../../Firebase/Firebase.config";
import { Helmet } from "react-helmet";

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // console.log(user);
  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        e.target.reset();
        Swal.fire({
          title: "Success!",
          text: "Updated Successfully",
          icon: "success",
          confirmButtonText: "Cool",
        });
        navigate(-1);
      })
      .catch((error) => {
        const notifyError = () => toast.error(error.message);
        notifyError();
      });
  };

  return (
    <div>
      <div className="hero md:min-h-screen bg-gray-50 rounded-t-md">
        <Helmet>
          <title>Edit user</title>
        </Helmet>
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-2xl md:text-5xl font-bold">
              Update Your profile
            </h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleUpdate} className="card-body pb-0">
              <div className="form-control">
                <label className="label">
                  <span name="test" className="label-text">
                    New Name
                  </span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  defaultValue={user.displayName}
                  placeholder="name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Photo Link</span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="photoURL"
                  defaultValue={user.photoURL}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control my-4 py-2">
                <button className="btn btn-sm bg-yellow-500 text-white">
                  Update
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
