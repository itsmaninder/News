import React, { useState } from "react";

const NewsGal = ({ articlesGal }) => {
  const [count] = useState(5); 

  return (
    <div class="section-gallery">
      <div className="section__head">
        <div className="heading">
          <h3>Trending News</h3>
        </div>
      </div>
      <div className="section__body">
        <div className="card-gallery">
          {articlesGal.slice(0, count).map((article) => (
            <div className="card" key={article.url}>
              <div className="card__head">
                <img src={article.urlToImage} alt={article.title} />
              </div>
              <div className="card__body">
                <span className="source-name">{article.source.name}</span>
                <h4 className="title">{article.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsGal;
