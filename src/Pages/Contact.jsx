import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const ContactDetails = ({ icon, text }) => (
  <motion.p
    className="flex items-center"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
  >
    <span className="mr-4 text-teal-600">{icon}</span>
    <span>{text}</span>
  </motion.p>
);

const ContactFormField = ({ label, type = "text", placeholder, rows }) => (
  <motion.label
    className="block"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <span className="mb-1">{label}</span>
    {type === "textarea" ? (
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="p-2 block w-full bg-gray-100 border rounded-md"
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        className="block bg-gray-100 border p-2 w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75"
      />
    )}
  </motion.label>
);

const Contact = () => {
  return (
    <div>
      <Helmet>
        <title>InsightNexus | Contact</title>
      </Helmet>
      <motion.section
        className="py-6 rounded-t-md text-gray-600 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mt-10 grid max-w-6xl md:min-h-screen grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          {/* Contact Details */}
          <motion.div
            className="py-6 md:py-0 md:px-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-teal-600">Get in touch</h1>
            <p className="pt-2 pb-4">
              Fill in the form to start a conversation
            </p>
            <div className="space-y-4">
              <ContactDetails
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                text="2312 GSE Street, Chittagong, Bangladesh"
              />
              <ContactDetails
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                }
                text="123456789"
              />
              <ContactDetails
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                }
                text="insight@nexus.com"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            noValidate=""
            className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <ContactFormField label="Full name" placeholder="Leroy Jenkins" />
            <ContactFormField
              label="Email address"
              type="email"
              placeholder="leroy@jenkins.com"
            />
            <ContactFormField
              label="Message"
              type="textarea"
              placeholder="Write here"
              rows="3"
            />
            <motion.button
              type="button"
              className="self-center px-8 py-3 text-lg text-white rounded hover:bg-teal-500 bg-teal-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </motion.form>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
