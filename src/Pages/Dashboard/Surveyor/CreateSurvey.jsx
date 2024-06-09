// import Swal from "Swal";
// import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const CreateSurvey = () => {
  const { user } = useAuth();

  const handleSurvey = (event) => {
    event.preventDefault();

    const Surveyor_email = user.email;
    const Surveyor_name = user.displayName;
    const Surveyor_image = user.photoURL;

    const form = event.target;
    const title = form.title.value;
    const category = form.category_name.value;
    const description = form.description.value;
    const question = form.question.value;

    const publishDate = new Date().toISOString().split("T")[0];
    const startDate = form.start.value;
    const endDate = form.end.value;

    const addNewSurvey = {
      Surveyor_email,
      Surveyor_name,
      Surveyor_image,
      title,
      category,
      description,
      question,
      publishDate,
      startDate,
      endDate,
    };
    // console.log(addNewSurvey);

    const url = "http://localhost:5000/addSurvey";
    // send data to the server
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addNewSurvey),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Created survey successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          Navigate("/surveys");
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>InsightNexus | Create Survey</title>
      </Helmet>
      <div className="bg-transparent border border-black shadow-2xl p-4 md:w-2/3 mx-auto rounded-md my-16">
        <h2 className="text-3xl text-center font-semibold my-4">
          Create Survey
        </h2>
        <form onSubmit={handleSurvey}>
          {/* survey title */}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-semibold">Title</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="title"
                placeholder="title"
                className="input input-bordered border-black w-full"
                required
              />
            </label>
          </div>
          {/* survey description */}

          <div className="form-control col-span-3">
            <label className="label">
              <span className="label-text text-lg font-semibold">
                Description
              </span>
            </label>
            <textarea
              className="rounded-lg pl-3 pt-2 border border-black bg-base-200"
              name="description"
              placeholder="short description"
              rows="3"
              cols="40"
              required
            ></textarea>
          </div>

          {/* survey Question */}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-semibold">Question</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="question"
                placeholder="question"
                className="input input-bordered border-black w-full"
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 my-3">
            {/* survey category */}

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-semibold">
                  Select a Category
                </span>
              </label>
              <select
                name="category_name"
                className="rounded-md border border-black"
              >
                <option value="Tech">Tech</option>
                <option value="Health">Health</option>
                <option value="Travel">Travel</option>
                <option value="Fashion">Fashion</option>
                <option value="Food">Food</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Parenting">Parenting</option>
                <option value="Finance">Finance</option>
                <option value="Sports">Sports</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* survey start date */}

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-semibold">
                  Start Date
                </span>
              </label>
              <label className="input-group">
                <input
                  type="date"
                  name="start"
                  className="input input-bordered border-black w-full"
                  required
                />
              </label>
            </div>

            {/* survey end date */}

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-semibold">
                  End Date
                </span>
              </label>
              <label className="input-group">
                <input
                  type="date"
                  name="end"
                  className="input input-bordered border-black w-full"
                  required
                />
              </label>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <input
              type="submit"
              value="Create"
              className="btn btn-md border text-white bg-black text-lg font-bold"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSurvey;
