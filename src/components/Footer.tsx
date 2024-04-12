import { useEdisonContext } from "@/context/EdisonContext";

function Footer() {
  const { openCart, totalSumm } = useEdisonContext();

  const formatPrice = Intl.NumberFormat("en-US");

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="totalPrice">
            <h1>Общая сумма</h1>
            <p style={{ display: "flex", gap: 5 }}>
              {formatPrice
                .format(Number.parseInt(totalSumm + ""))
                .replace(",", " ")}{" "}
              сум
            </p>
          </div>
          <button className="order-btn" onClick={openCart}>
            Заказать
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
