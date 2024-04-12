import React from "react";
// import { Autoplay } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
import banner from "../images/banner.jpg";

const Banner: React.FC = () => {
  // const [banners, setBanners] = useState<IBanner[]>([]);

  // async function getBanners() {
  //   try {
  //     const response = await axios.get(`${baseURL}/api/banners`);
  //     if (response.status === 200) {
  //       setBanners([...response.data]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getBanners();
  // }, []);

  return (
    <div className="banner">
      <div className="container">
        {/* <Swiper
        className="bannerSwiper"
        autoplay={{ delay: 3000 }}
        loop={true}
        modules={[Autoplay]}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={`${banner.title}-${index}`}>
            <img src={`${baseURL}/${banner.image_url}`} alt="" />
          </SwiperSlide>
        ))}
      </Swiper> */}
        <img src={banner} alt="" />
      </div>
    </div>
  );
};

export default Banner;
