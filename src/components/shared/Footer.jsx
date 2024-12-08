import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t bg-teal-900 text-white border-gray-300 py-10">
      <div className="flex justify-center">
        <p className="text-sm">
          <ul className="flex justify-center gap-5 border-b pb-4 mb-4">
            <li>
              <a
                href="#"
                className="hover:text-teal-800  transition duration-300"
              >
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-teal-800  transition duration-300"
              >
                <FaTwitter />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-teal-800  transition duration-300"
              >
                <FaInstagram />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-teal-800  transition duration-300"
              >
                <FaLinkedinIn />
              </a>
            </li>
          </ul>
          &copy; 2024 InsightNexus. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
