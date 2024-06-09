import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Component/Shared/LoadingSpinner";

const EditSurvey = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: survey = {}, isLoading } = useQuery({
    queryKey: ["survey", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/surveys/${id}`);
      return data;
    },
  });
  const {
    title,
    description,
    question,
    category,
    startDate,
    endDate,
    Surveyor_email,
    Surveyor_image,
    Surveyor_name,
  } = survey;
  console.log(survey);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const category = form.category_name.value;
    const description = form.description.value;
    const question = form.question.value;
    const startDate = form.start.value;
    const endDate = form.end.value;
    const publishDate = new Date().toISOString().split("T")[0];

    const updateSurvey = {
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
    const update = await axiosSecure.put(`/editSurvey/${id}`, updateSurvey);
    console.log(update.data);
    if (update.data.modifiedCount > 0) {
      Swal.fire({
        title: "Success!",
        text: "Updated Successfully",
        icon: "success",
        confirmButtonText: "Cool",
      });
      navigate(-1);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <Helmet>
        <title>InsightNexus | Edit Survey</title>
      </Helmet>
      <div className="bg-transparent border border-black shadow-2xl p-4 md:w-2/3 mx-auto rounded-md my-16">
        <h2 className="text-3xl text-center font-semibold my-4">
          Update Survey
        </h2>
        <form onSubmit={handleUpdate}>
          {/* survey title */}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-semibold">Title</span>
            </label>
            <label className="input-group">
              <input
                defaultValue={title}
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
              defaultValue={description}
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
                defaultValue={question}
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
                defaultValue={category}
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
                  defaultValue={startDate}
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
                  defaultValue={endDate}
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
              value="Update"
              className="btn btn-md border text-white bg-black text-lg font-bold"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSurvey;
