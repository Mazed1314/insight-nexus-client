import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { MdDateRange } from "react-icons/md";
import UseRole from "../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Comment = ({ info }) => {
  const [role] = UseRole();
  const axiosPublic = useAxiosPublic();

  const {
    Surveyor_email,
    Surveyor_name,
    question,
    currentUserEmail,
    currentUserName,
    currentUserImage,
    _id,
  } = info;
  const survey_id = _id;

  const { data: comment = [], refetch } = useQuery({
    queryKey: ["comment"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/com/${survey_id}`);
      return res.data;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const commentTime = new Date()
      .toLocaleString("en", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      })
      .replace(",", "");
    const sendComment = {
      comment,
      currentUserEmail,
      currentUserName,
      currentUserImage,
      survey_id,
      Surveyor_name,
      question,
      commentTime,
    };

    const url = "https://insight-nexus-server.vercel.app/com";
    // send data to the server
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sendComment),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          refetch();
          Swal.fire({
            text: "Thank You for comment",

            confirmButtonText: "ok",
          });
          e.target.comment.value = null;
        }
      });
  };

  return (
    <section className="border bg-base-300 pt-8 lg:pt-16 -mb-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold">
            Comment ({comment.length})
          </h2>
        </div>
        {Surveyor_email != currentUserEmail && role == "pro" && (
          <>
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="py-2 px-4 mb-4 bg-base-200 rounded-lg rounded-t-lg border ">
                <label className="sr-only">Your comment</label>
                <textarea
                  name="comment"
                  rows="6"
                  className="px-0 w-full bg-base-200 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="font-medium text-white bg-black btn rounded-lg  "
              >
                Post comment
              </button>
            </form>
          </>
        )}

        {comment?.map((card, index) => (
          <>
            <article key={index} className="p-6 bg-base-200 rounded-lg mb-3">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="flex">
                    <img
                      className="mr-2 w-10 h-10 border rounded-full"
                      src={card.currentUserImage}
                      alt="Michael Gough"
                    />
                    <span className="text-gray-700 text-xl font-semibold">
                      {card.currentUserName}
                      <div className="text-sm">
                        <span className="flex">
                          <MdDateRange className="mt-1" />
                          {card.commentTime}
                        </span>
                      </div>
                    </span>
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 ">{card.comment}</p>
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                >
                  <svg
                    className="mr-1.5 w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                  </svg>
                  Reply
                </button>
              </div>
            </article>
          </>
        ))}
      </div>
    </section>
  );
};

Comment.propTypes = {
  info: PropTypes.object,
};
export default Comment;
