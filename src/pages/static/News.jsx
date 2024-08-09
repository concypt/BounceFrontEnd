import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./news.module.css";
import { Link } from "react-router-dom";
import { fetchNews } from "../../api/publicService";

// images
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


  if (isLoading) {
    return (
      <>
        <div className="bounce_bg_circle">
          <div className={styles.aboutMain}>
            <div className={`header_div ${styles.headerBlog}`}>
              <div className={styles.cardContainer}>
                <h1>
                  <Skeleton width={400} />
                </h1>
                <div className={styles.mainBlog}>
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className={styles.blogCards}>
                      <div className={styles.cardHeader}>
                      <Skeleton
                        height={270}
                        borderTopRadius={18}
                        marginbottom={10}
                      />
                        <div className={styles.categoryNews}>
                          <Skeleton width={50} height={20} />
                        </div>
                      </div>
                      
                      <div className={styles.cardBody}>
                        <h2>
                          <Skeleton />
                        </h2>
                        <div className={styles.blogInfo}>
                          <Skeleton width={20} height={20} />
                          <p>
                            <Skeleton width={100} />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="bounce_bg_circle">
        <div className={styles.aboutMain}>
          <div className={`header_div ${styles.headerBlog}`}>
            <div className={styles.cardContainer}>
              <h1>Latest News</h1>
              <div className={styles.mainBlog}>
                {news.map((newsrow) => (
                  <div key={newsrow.id} className={styles.blogCards}>
                    <Link to={`/news/${newsrow.id}`}>
                      <div className={styles.cardHeader}>
                        <img
                          src={`${newsrow.imagePath}${newsrow.image}`}
                          alt=""
                        />
                        <div className={styles.categoryNews}>
                          {newsrow.category.name}
                        </div>
                      </div>
                      <div className={styles.cardBody}>
                        <h2>
                          {newsrow.title.length > 50
                            ? `${newsrow.title.substring(0, 50)}...`
                            : newsrow.title}
                        </h2>
                        <div className={styles.blogInfo}>
                          <img
                            src={calender}
                            className={styles.blogCalnder}
                            alt=""
                          />
                          <p>
                            {moment(newsrow.created_at).format("DD MMM.YYYY")}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default News;
