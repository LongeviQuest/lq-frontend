import "./PageNotFound.scss";
import data from "../../config/config.json";

const PageNotFoundPage = () => {
  return (
    <div className="PageNotFound">
      <div className="PageNotFoundText">{data[404]}</div>
    </div>
  );
};

export default PageNotFoundPage;
