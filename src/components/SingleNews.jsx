import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../components/singleEvent.module.css";
import LoadingBar from "react-top-loading-bar";
import { fetchNewsDetails } from "../api/publicService.js";
import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";

const SingleNews = ({ newsId }) => {
  //const [news, setNews] = useState(null);

  window.onload = () => {
    setLoadingComplete(true);
  };

  const [loadingComplete, setLoadingComplete] = useState(false);

  const {
    data: news,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["newsDetail", newsId],
    queryFn: () => fetchNewsDetails(newsId),
  });

  if (isLoading) {
    return (
      <LoadingBar
        color="#7e79ff"
        height={3}
        progress={loadingComplete ? 100 : 0}
      />
    );
  }
  if (error) {
    return <p>Errors: {error.message}</p>;
  }

  // useEffect(() => {
  //   const fetchNewsDetails = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://bounce.extrasol.co.uk/api/attenders/news-details/${newsId}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //             "X-Api-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9",
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch news details");
  //       }

  //       const newsData = await response.json();
  //       setNews(newsData.data);
  //     } catch (error) {
  //       console.error("Error fetching news details:", error);
  //     } finally {
  //       setLoadingComplete(true);
  //     }
  //   };

  //   fetchNewsDetails();
  // }, [newsId]);

  return (
    <>
      <div className={styles.newsDetailMainWrapper}>
        <div className={`${styles.event_detail} bounce_bg_circle`}>
          <div className={styles.event_detail_content}>
            <div className={styles.event_main_img}>
              <img
                className={styles.eventImg}
                src={`${news.imagePath}${news.image}`}
                alt="San Francisco"
              />
              <div className={styles.category_main}>
                <h5 className={styles.category_name}>{news.title}</h5>
              </div>
              <div className={styles.heart_icon}>
                <img src="/images/heart.svg" alt="" />
              </div>
            </div>
            <div className={styles.details}>
              <h2>{news.title}</h2>
              <div className={styles.description_heading}>
                <div style={{ maxWidth: "100%" }}>
                  Description:
                  <div
                    dangerouslySetInnerHTML={{ __html: news.description }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SingleNews.propTypes = {
  newsId: PropTypes.number,
};

export default SingleNews;
