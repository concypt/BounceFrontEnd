import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";

import styles from "./news.module.css";
import { Link, NavLink } from "react-router-dom";
import { fetchNews } from "../../api/publicService";
import "react-date-range/dist/styles.css"; // Main css file
import "react-date-range/dist/theme/default.css"; // Theme css file

// imaages
// import promoteImg2 from "../../assets/images/promote_img2.png";
import calender from "../../assets/images/calender.svg";
// import promoteImg from "../../assets/images/promote_img.png";

function News() {
  const {
    data: news,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["News"],
    queryFn: fetchNews,
  });
  // const [loadingComplete, setLoadingComplete] = useState(false);

  if (isLoading)
    return (
      <div
        style={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ textAlign: "center", width: "100%" }}>Loading...</p>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="bounce_bg_circle">
        <div className={styles.aboutMain}>
          <dir className={`header_div ${styles.headerBlog}`}>
            <div className={styles.cardContainer}>
              <h1>Latest News</h1>
              <div className={styles.mainBlog}>
                {news.map((newsrow) => (
                  <div key={newsrow.id} className={styles.blogCards}>
                    <Link to={`/news/${newsrow.id}`}>
                      <img
                        src={`${newsrow.imagePath}${newsrow.image}`}
                        alt=""
                      />
                      <h2>
                        {newsrow.title.length > 50
                          ? `${newsrow.title.substring(0, 50)}...`
                          : newsrow.title}
                      </h2>
                    </Link>
                    <div className={styles.blogInfo}>
                      <img
                        src={calender}
                        className={styles.blogCalnder}
                        alt=""
                      />
                      <p>{moment(newsrow.created_at).format("DD MMM.YYYY")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </dir>
        </div>
      </div>
    </>
  );
}

export default News;
