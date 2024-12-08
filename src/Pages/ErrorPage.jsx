import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  // Reusable Button Component
  const Button = ({ label, onClick, icon }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100 focus:ring-2 focus:ring-teal-500"
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      <div className="text-center p-8 max-w-sm bg-white shadow-md rounded-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-red-100 text-red-500 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          404 Error - Page Not Found
        </h1>
        <p className="mt-3 text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="mt-2 text-gray-500">Here are some helpful links:</p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <Button
            label="Go Back"
            onClick={() => navigate(-1 || "/")}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
            }
          />
          <Button
            label="Go Home"
            onClick={() => navigate("/")}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19V5m-7 7h14"
                />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
