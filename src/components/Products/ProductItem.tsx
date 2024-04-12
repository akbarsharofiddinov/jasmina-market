import { baseURL } from "@/API";
import { useEdisonContext } from "@/context/EdisonContext";
import { useEffect, useState } from "react";

type ProductItemProps = {
  productData: IProduct;
};

export default function ProductItem({ productData }: ProductItemProps) {
  const [quantity, setQuantity] = useState(0);
  const { getProductQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useEdisonContext();

  useEffect(() => {
    setQuantity(getProductQuantity(productData.id));
  }, [getProductQuantity(productData.id)]);

  const formatPrice = Intl.NumberFormat("en-US");

  return (
    <>
      <div className="food-card">
        <img src={`${baseURL}/${productData.image_url}`} />
        <div className="food-card_body">
          <div className="top">
            <h1 className="food-name">{productData.name}</h1>
            <p className="food-price">
              {formatPrice
                .format(Number.parseInt(productData.price))
                .replace(",", " ")}{" "}
              сум
            </p>
          </div>
          {quantity === 0 ? (
            <button
              className="add-toCart_Btn"
              onClick={() => increaseCartQuantity(productData.id)}
            >
              + Добавить
            </button>
          ) : (
            <div className="counter-box">
              <button
                className="minus"
                onClick={() => decreaseCartQuantity(productData.id)}
              >
                −
              </button>
              <p>{quantity}</p>
              <button
                className="plus"
                onClick={() => increaseCartQuantity(productData.id)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
