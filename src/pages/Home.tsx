import {
  Banner,
  Cart,
  Categories,
  Footer,
  Products,
  SearchInput,
} from "@/components";
import { useEdisonContext } from "@/context/EdisonContext";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

function Home() {
  const { isOpen } = useEdisonContext();

  // const navigate = useNavigate();
  // let tg = Telegram.WebApp;

  // useEffect(() => {
  //   if (tg.initDataUnsafe.user?.id === undefined) {
  //     navigate("/error");
  //   } else {
  //     return;
  //   }
  // }, []);

  return (
    <section className="section-home">
      <div className="container">
        <div
          className="home-inner"
          style={isOpen ? { display: "none" } : { display: "block" }}
        >
          <Banner />
          <SearchInput />
          <Categories />
          <Products />
          <Footer />
        </div>
        {/* <FeedbackModal /> */}
        <Cart isOpen={isOpen} />
      </div>
    </section>
  );
}

export default Home;
