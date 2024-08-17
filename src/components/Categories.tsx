import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosClose } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMyParams } from "@/hooks/useMyParams";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/API";

export default function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const queary = Number.parseInt(useMyParams());

  async function getCategories() {
    try {
      const response = await axios.get(`${baseURL}/api/categories`);
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="container">
      <Swiper
        slidesPerView={"auto"}
        freeMode={true}
        className="categorySwiper"
        spaceBetween={10}
      >
        <SwiperSlide>
          <Link
            to={`/`}
            className={
              useLocation().search.length > 0
                ? "category_item"
                : "category_item active"
            }
          >
            Все
          </Link>
        </SwiperSlide>
        {categories.map((category, index) => (
          <SwiperSlide key={`${category.name}-${index}`}>
            <Link
              to={`?q=${category.id}`}
              className={
                category.id === queary
                  ? "category_item active"
                  : "category_item"
              }
            >
              <span
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                <IoIosClose />
              </span>
              {category.name}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
