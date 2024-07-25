import CheckoutPayment from "../components/CheckoutPayment";
import { useLocation } from 'react-router-dom';
const Checkout = () => {
  const location = useLocation();
  const { cartData } = location.state || {};
  return (
    <>
      <div className="bounce_bg_circle">
        <div className="header_div checkout">
          <CheckoutPayment cartData={cartData}/>
        </div>
      </div>
    </>
  );
};

export default Checkout;
