import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const Signup = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-blue-100 md:py-32 py-5"
    >
      <div className="container mx-auto text-center p-5 ">
        <div className="relative">
          <h1 className="md:text-5xl font-bold text-3xl my-5">Sign up free</h1>
          <p className="my-4 md:w-[40%] mx-auto">
            Our platform dedicated to gathering valuable insights through
            user-friendly and efficient surveys
          </p>
          <motion.img
            src={"/images/survey-3d.png"}
            width={220}
            height={100}
            className="absolute -left-[20px] -top-[90px] hidden md:inline"
            style={{
              translateY,
            }}
          ></motion.img>

          <motion.img
            src={"/flexibility.png"}
            width={220}
            height={100}
            className="absolute -right-[20px] -top-[-30px] hidden md:inline"
            style={{
              translateY,
            }}
          ></motion.img>
        </div>
        <div className="flex items-center justify-center gap-5 ">
          <button className="btn bg-yellow-500 text-white">
            <a href="/register">Get for free</a>
          </button>
          <button className=" flex items-center gap-1">
            Learn more
            <span>
              <ArrowRight className="h-6 w-6 text-gray-600" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Signup;
