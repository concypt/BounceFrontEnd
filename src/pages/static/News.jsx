import { useEffect, useState } from "react";
import styles from "./news.module.css";
import { Link, NavLink } from "react-router-dom";
import "react-date-range/dist/styles.css"; // Main css file
import "react-date-range/dist/theme/default.css"; // Theme css file
import Reveal from "../../components/utils/Reveal.jsx";

// imaages
import promoteImg2 from "../../assets/images/promote_img2.png";
import calender from "../../assets/images/calender.svg";
import promoteImg from "../../assets/images/promote_img.png";

function News() {
  return (
    <>
      <div className="bounce_bg_circle">
        <div className={styles.aboutMain}>
          <dir className={`header_div ${styles.headerBlog}`}>
            <div class={styles.cardContainer}>
              <h1>Latest News</h1>
              <div className={styles.mainBlog}>
                <div className={styles.blogCards}>
                  <Link>
                    <img src={promoteImg2} alt="" />
                    <h2>
                      Formula 1 Returns to Las Vegas For The First Time ...
                    </h2>
                  </Link>
                  <div className={styles.blogInfo}>
                    <img src={calender} className={styles.blogCalnder} alt="" />
                    <p>02 Dec.2023</p>
                  </div>
                </div>
                <div className={styles.blogCards}>
                  <Link>
                    <img src={promoteImg} alt="" />
                    <h2>
                      Formula 1 Returns to Las Vegas For The First Time ...
                    </h2>
                  </Link>
                  <div className={styles.blogInfo}>
                    <img src={calender} className={styles.blogCalnder} alt="" />
                    <p>02 Dec.2023</p>
                  </div>
                </div>
                <div className={styles.blogCards}>
                  <Link>
                    <img src={promoteImg2} alt="" />
                    <h2>
                      Formula 1 Returns to Las Vegas For The First Time ...
                    </h2>
                  </Link>
                  <div className={styles.blogInfo}>
                    <img src={calender} className={styles.blogCalnder} alt="" />
                    <p>02 Dec.2023</p>
                  </div>
                </div>
                <div className={styles.blogCards}>
                  <Link>
                    <img src={promoteImg2} alt="" />
                    <h2>
                      Formula 1 Returns to Las Vegas For The First Time ...
                    </h2>
                  </Link>
                  <div className={styles.blogInfo}>
                    <img src={calender} className={styles.blogCalnder} alt="" />
                    <p>02 Dec.2023</p>
                  </div>
                </div>
                <div className={styles.blogCards}>
                  <Link>
                    <img src={promoteImg} alt="" />
                    <h2>
                      Formula 1 Returns to Las Vegas For The First Time ...
                    </h2>
                  </Link>
                  <div className={styles.blogInfo}>
                    <img src={calender} className={styles.blogCalnder} alt="" />
                    <p>02 Dec.2023</p>
                  </div>
                </div>
                <div className={styles.blogCards}>
                  <Link>
                    <img src={promoteImg2} alt="" />
                    <h2>
                      Formula 1 Returns to Las Vegas For The First Time ...
                    </h2>
                  </Link>
                  <div className={styles.blogInfo}>
                    <img src={calender} className={styles.blogCalnder} alt="" />
                    <p>02 Dec.2023</p>
                  </div>
                </div>
              </div>
            </div>
          </dir>
        </div>
      </div>
    </>
  );
}

export default News;
