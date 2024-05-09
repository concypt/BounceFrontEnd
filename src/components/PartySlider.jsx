import Reveal from "./utils/Reveal.jsx";
import styles from "./partySlider.module.css";
//images
import partyImage1 from "../assets/images/party.jpg";
import partyImage2 from "../assets/images/part2.jpg";
import partyImage3 from "../assets/images/party3.jpg";
import partyImage4 from "../assets/images/party4.jpg";
import partyImage5 from "../assets/images/party5.jpg";
import partyImage6 from "../assets/images/party6.jpg";

export default function PartySlider() {
  return (
    <Reveal width="100%" delay="0.2">
      <div className={styles.partyImagesWrapper}>
        <div className={styles.partyImagesContainer}>
          <div className={styles.partyImages}>
            <img
              src={partyImage1}
              className="img1"
              alt="Picture of party with Bounce"
            />
            <img
              src={partyImage2}
              className="img2"
              alt="Picture of party with Bounce"
            />
            <img
              src={partyImage3}
              className="img3"
              alt="Picture of party with Bounce"
            />
            <img
              src={partyImage4}
              className="img4"
              alt="Picture of party with Bounce"
            />
            <img
              src={partyImage5}
              className="img5"
              alt="Picture of party with Bounce"
            />
            <img
              src={partyImage6}
              className="img6"
              alt="Picture of party with Bounce"
            />
          </div>
          <div className={styles.partyImages}>
            <img
              src={partyImage1}
              className="img1"
              alt="Picture of party with Bounce"
            />
            <img
              src={partyImage2}
              className="img2"
              alt="Picture of party with Bounce"
            />
            <img
              src={partyImage3}
              className="img3"
              alt="Picture of party with Bounce"
            />
            <img
              src={partyImage4}
              className="img4"
              alt="Picture of party with Bounce"
            />
            <img
              src={partyImage5}
              className="img5"
              alt="Picture of party with Bounce"
            />
            <img
              src={partyImage6}
              className="img6"
              alt="Picture of party with Bounce"
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
