import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./CheckoutPayment.module.css";

//images
import cardIcon from "../assets/images/checkout-card-icon.svg";
import visaImg from "../assets/images/checkout-visa.svg";
import masterImg from "../assets/images/checkout-mastercard.svg";
import americanImg from "../assets/images/checkout-american.svg";
import dummyImg from "../assets/images/dummy.png";

const schema = z.object({
  cardName: z.string().min(1, "Card Name is required"),
  email: z.string().email("Invalid email address"),
  cardNumber: z.string().length(16, "Card Number must be 16 digits"),
});

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.checkout}>
      <div className={styles.largeColumn}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formCheckout}>
          <div className="billingDetails">
            <h5 className={styles.textWithLines}>Billing Details</h5>
            <div className={styles.formGroup}>
              <input {...register("cardName")} placeholder="Name on Card" />
            </div>
            <div className={styles.formGroup}>
              <input {...register("email")} placeholder="Email" />
            </div>
            <div className={styles.formGroup}>
              <div className={styles.wrapInputIcon}>
                <input {...register("cardNumber")} placeholder="Card Number" />
                <img src={cardIcon} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.paymentOptions}>
            <p className={styles.paymentSupportedTextWrap}>Supported</p>
            <div className={styles.paymentImages}>
              <img src={visaImg} alt="Visa" className={styles.paymentImage} />
              <img
                src={masterImg}
                alt="Mastercard"
                className={styles.paymentImage}
              />
              <img
                src={americanImg}
                alt="American Express"
                className={styles.paymentImage}
              />
            </div>
          </div>
          <div className="userDetails">
            <h5 className={styles.textWithLines}>User Details</h5>
            <div className={styles.twoFormGroups}>
              <div className={styles.formGroup}>
                <input {...register("fname")} placeholder="First Name" />
              </div>
              <div className={styles.formGroup}>
                <input {...register("lname")} placeholder="Last Name" />
              </div>
            </div>
            <div className={styles.twoFormGroups}>
              <div className={styles.formGroup}>
                <input {...register("email2")} placeholder="Email" />
              </div>
              <div className={styles.formGroup}>
                <input {...register("phone")} placeholder="Phone" />
              </div>
            </div>
            <div className={styles.formGroup}>
              <input
                {...register("instagram")}
                placeholder="Instagram Handle"
              />
            </div>
            <button className="loginButton remove-margin" type="submit">
              <span>Pay with card</span>
            </button>
          </div>
        </form>
      </div>
      <div className={styles.smallColumn}>
        <div className={styles.eventInfoCheckout}>
          <img src={dummyImg} alt="" />
          <div className={styles.eventAbout}>
            <h3>Thames Chase Talks: Built Heritage</h3>
            <p>Bristol, UK</p>
          </div>
        </div>
        <div className={styles.ticketAbout}>
          <h3>Parade Ticket</h3>
          <h5>1 * £ 30.00 + £ 3.00 Fee</h5>
        </div>
        <div className={styles.ticketTotal}>
          <span>Total</span>
          <span>£ 30.00</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
