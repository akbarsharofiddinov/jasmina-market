import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { baseURL } from "@/API";
import { useEdisonContext } from "@/context/EdisonContext";
import { useMyParams } from "@/hooks/useMyParams";
import { PiSmileySad } from "react-icons/pi";
import { MoonLoader } from "react-spinners";

const Products: React.FC = () => {
  const { setProduct, currProducts, setCurrentProducts } = useEdisonContext();
  const [isLoading, setIsLoading] = useState(true);

  const params = useMyParams();

  async function getProducts() {
    try {
      if (params?.length > 0) {
        const response = await axios.get(
          `${baseURL}/api/products?category_id=${params}`
        );
        if (response.status === 200) {
          setCurrentProducts(response.data.data);
          setIsLoading(false);
        }
      } else {
        const response = await axios.get(`${baseURL}/api/products`);
        if (response.status === 200) {
          setProduct(response.data.data);
          setCurrentProducts(response.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, [params]);

  if (currProducts?.length) {
    return (
      <>
        <section className="section-products">
          <div className="container">
            <div className="foods">
              {currProducts.map((item, index) => (
                <ProductItem key={`${item.name}-${index}`} productData={item} />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  } else if (isLoading) {
    return (
      <section className="section-products">
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 150,
            fontSize: "30px",
            color: "#999",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MoonLoader color="#999" speedMultiplier={0.2} />
          </div>
        </div>
      </section>
    );
  } else if (isLoading === false) {
    return (
      <section className="section-products">
        <div
          className="container"
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            marginTop: 50,
            fontSize: "50px",
            color: "#999",
          }}
        >
          <div
            style={{
              textAlign: "center",
            }}
          >
            <PiSmileySad />
            <h1 style={{ fontSize: "30px" }}>Продукты не найдены</h1>
          </div>
        </div>
      </section>
    );
  }
};

export default Products;
