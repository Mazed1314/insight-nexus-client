import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import companies from "../../../public/companies.json";

const Companies = () => {
  return (
    <div className="">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={3}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className=""
      >
        {companies.map((item) => (
          <>
            <SwiperSlide className="py-8 px-2">
              <img
                src={item.location}
                className="h-10 md:h-14 w-32 md:w-40 mx-auto"
              />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
};

export default Companies;
