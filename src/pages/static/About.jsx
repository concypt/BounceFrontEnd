import styles from "./about.module.css";
import Reveal from "../../components/utils/Reveal.jsx";

// imaages
import promoteImg2 from "../../assets/images/promote_img2.png";
import tick from "../../assets/images/tick.svg";

function About() {
  return (
    <>
      <div className="bounce_bg_circle">
        <div className={styles.aboutMain}>
          <Reveal width="100%" delay="0.2" amount="0.5">
            <div className={`promote_section ${styles.aboutPromote}`}>
              <div className="promote_div">
                <img src={promoteImg2} alt="" />

                <div className="promote_content">
                  <h2>Our Services</h2>

                  <div className="checks">
                    <div className="promote_checks">
                      <img src={tick} alt="" />
                      <p>
                        The all in one ticketing platform that keeps i t simple.
                      </p>
                    </div>

                    <div className="promote_checks">
                      <img src={tick} alt="" />
                      <p>
                        To get started, we just need a few details from
                        yourself. Once approved, you’re ready to sell out your
                        event on Bounce.
                      </p>
                    </div>

                    <div className="promote_checks">
                      <img src={tick} alt="" />
                      <p>
                        With a generous industry beating 7.5% fee, you can rely
                        on Bounce to bring you simple, intuitive ticketing
                        solutions for your event brand.
                      </p>
                    </div>
                  </div>
                  {/* <div className="promote_btn">
                    <a href="" className="global_button_one">
                      {" "}
                      <span>Discover more</span>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

export default About;
