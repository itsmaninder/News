// src/NewsList.js
import React from "react";

const NewsList = ({ articles, onFavoriteToggle, favorites }) => {
  return (
    <>
      <section className="section section--more-news">
        <div className="container">
          <div className="section__head">
            <div className="heading">
              <h3>Latest News</h3>
            </div>
          </div>
          <div className="section__body">
            <div className="card-wrap">
              {articles.map((article) => (
                <div className="card" key={article.url}>
                  <div className="card__head">
                    <img src={article.urlToImage} alt="" />
                  </div>
                  <div className="card__body">
                    <span className="source-name">{article.source.name} </span>
                    <h4 className="title">{article.title}</h4>
                    <p className="desc">{article.description}</p>
                    <a className="text-primary" onClick={() => onFavoriteToggle(article)}>
                      {favorites.some((fav) => fav.url === article.url)
                        ? "Remove from favourite"
                        : "Add to Favorite"}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsList;
