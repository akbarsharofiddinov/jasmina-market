import { useEdisonContext } from "@/context/EdisonContext";

function Footer() {
  const { openCart, totalSumm } = useEdisonContext();

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="totalPrice">
            <h1>Общая сумма</h1>
            <p style={{ display: "flex", gap: 5 }}>
              {totalSumm}
              <span>сум</span>
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
