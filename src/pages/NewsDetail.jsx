import { useParams } from "react-router-dom";
import SingleNews from "../components/SingleNews";

const NewsDetail = () => {
  const { newsId } = useParams();

  return (
    <>
      <SingleNews newsId={newsId} />
    </>
  );
};

export default NewsDetail;
