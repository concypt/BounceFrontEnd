import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

import styles from "./news.module.css";
import { Link } from "react-router-dom";
import { fetchNews } from "../../api/publicService";
import "react-date-range/dist/styles.css"; // Main css file
import "react-date-range/dist/theme/default.css"; // Theme css file

// imaages
import calender from "../../assets/images/calender.svg";

function News() {
  const {
    data: news,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["News"],
    queryFn: fetchNews,
  });

  const [loadingComplete, setLoadingComplete] = useState(false);
  window.onload = () => {
    setLoadingComplete(true);
  };

  if (isLoading)
    return (
      <LoadingBar
        color="#7e79ff"
        height={3}
        progress={loadingComplete ? 100 : 0}
      />
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
