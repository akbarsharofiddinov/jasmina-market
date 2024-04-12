import { baseURL } from "@/API";
import { useEdisonContext } from "@/context/EdisonContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

type CartProps = {
  isOpen: boolean;
};

const Cart: React.FC<CartProps> = ({ isOpen }: CartProps) => {
  const {
    closeCart,
    cartProducts,
    products,
    totalSumm,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useEdisonContext();
  const [deliveryCost, setDeliveryCost] = useState<IDeliveryResponse>();

  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  let tg = Telegram.WebApp;
  let chat_id = tg.initDataUnsafe.user?.id;

  // Axios request
  async function getDeliveryCost() {
    try {
      const response = await axios.get(`${baseURL}/api/delivery_amount`);
      if (response.status === 200) {
        setDeliveryCost(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit() {
    setLoading(true);
    const dataObj: OrderDataObj = {
      chat_id: chat_id!,
      address,
      comment,
      products: [...cartProducts],
    };
    setTimeout(async () => {
      try {
        const response = await axios.post(`${baseURL}/api/orders`, dataObj);
        if (response.status === 200) {
          tg.close();
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 2000);
  }

  useEffect(() => {
    getDeliveryCost();
  }, []);

  return (
    <>
      <section className={isOpen ? "form-section active" : "form-section"}>
        <div className="container">
          <div className="cart-inner">
            <div className="form-top">
              <span onClick={closeCart}>
                <FaArrowLeft />
              </span>
              <p>Оформление заказа</p>
            </div>
            <div className="cart_products">
              {cartProducts.length > 0 ? (
                cartProducts.map((cartItem) => {
                  const findItem = products?.find((i) => i.id === cartItem.id);
                  return (
                    <div
                      className="product"
                      key={`${cartItem.id}-${cartItem.quantity}_${findItem?.name}`}
                    >
                      <img
                        src={`${baseURL}/${findItem?.image_url}`}
                        alt="food-image"
                      />
                      <div className="product-inner">
                        <p>{findItem?.name}</p>
                        <div className="counters">
                          <button
                            className="minus-btn counterBtn"
                            onClick={() => decreaseCartQuantity(cartItem.id)}
                          >
                            −
                          </button>
                          <p>{cartItem.quantity}</p>
                          <button
                            className="plus-btn counterBtn"
                            onClick={() => increaseCartQuantity(cartItem.id)}
                          >
                            +
                          </button>
                        </div>
                        <p>{findItem?.price}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1 style={{ color: "#ff000d93" }}>Нет товаров в корзине</h1>
                </div>
              )}
            </div>
            <div className="paymentOrder" style={{ padding: "0 10px" }}>
              <p>
                <span>Сумма товара</span> <span>{totalSumm} сум</span>
              </p>
              <p>
                <span>Сумма доставки</span>{" "}
                <span>{deliveryCost?.data.delivery_amount} сум</span>
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="top">
                <div className="addressInput-box">
                  <label>Адрес(ориентир)</label>
                  <input
                    type="text"
                    id="address-input"
                    autoComplete="off"
                    value={address}
                    required
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    onClick={() => {
                      setTimeout(() => {
                        window.scrollTo(0, document.body.scrollHeight);
                      }, 200);
                    }}
                    disabled={cartProducts.length <= 0 ? true : false}
                  />
                </div>
                <div className="comment-box">
                  <label>Комментарий</label>
                  <textarea
                    id="textarea"
                    cols={30}
                    rows={5}
                    autoComplete="off"
                    value={comment}
                    required
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    onClick={() => {
                      setTimeout(() => {
                        window.scrollTo(0, document.body.scrollHeight);
                      }, 200);
                    }}
                    disabled={cartProducts.length <= 0 ? true : false}
                  ></textarea>
                </div>
              </div>
              <div className="orderingBox" id="orderingBox">
                <div className="container">
                  <div className="inner">
                    <p>
                      <span>Общая сумма</span>
                      <span>
                        {cartProducts.length > 0
                          ? totalSumm +
                            Number.parseInt(deliveryCost?.data.delivery_amount!)
                          : 0}{" "}
                        сум
                      </span>
                    </p>
                    <button
                      type="submit"
                      disabled={cartProducts.length === 0 || loading}
                    >
                      {loading ? (
                        <PulseLoader
                          color="#fff"
                          size={7}
                          speedMultiplier={0.6}
                        />
                      ) : (
                        "Оформить заказ"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
