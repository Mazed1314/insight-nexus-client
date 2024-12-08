import { motion } from "framer-motion";

const SocialButton = ({ icon, onClick, tooltip }) => {
  return (
    <motion.button
      onClick={onClick}
      className="px-2 border rounded-full btn btn-sm text-xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={tooltip}
    >
      {icon}
    </motion.button>
  );
};

export default SocialButton;
