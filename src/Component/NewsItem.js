import React from "react";

const NewsItem = (props) => {
  
    let { title, description, imageUrl, newsUrl, author, date } = props;
    return (
      <>
        <div className="my-3">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src={
                imageUrl
                  ? imageUrl: "https://media.istockphoto.com/id/637696304/photo/patan.jpg?s=2048x2048&w=is&k=20&c=8Y2YB8oWnPb17Gl2dIKjm7GanOtnC2OSWLPrIUmnGuQ="
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  by {author ? author : "Unknown"} on{" "}
                  {new Date(date).toGMTString()}
                </small>
              </p>
              <a href={newsUrl} className="btn btn-dark btn-sm">
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  
}

export default NewsItem;
