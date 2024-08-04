import React from "react";

const Favorites = ({ favorites, onRemoveFavorite }) => {
  return (
    <>
      <section className="section section--more-news">
        <div className="container">
          <div className="section__head">
            <div className="heading">
              <h3>Favorite News</h3>
            </div>
          </div>
          <div className="section__body">
            {favorites.length === 0 ? (
              <p>No favorite news articles yet.</p>
            ) : (
              <div className="card-listing">
                {favorites.map((article) => (
                  <div className="card" key={article.url}>
                    <div className="card__head">
                      <img src={article.urlToImage} alt="" />
                    </div>
                    <div className="card__body">
                      <span className="source-name">
                        {article.source.name}{" "}
                      </span>
                      <h4 className="title">{article.title}</h4>
                      <a  className="text-primary" onClick={() => onRemoveFavorite(article)}>
                        Remove from favourite
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Favorites;
