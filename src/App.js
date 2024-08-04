import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsList from "./components/NewsList";
import NewsGal from "./components/NewsGal";
import NewsListing from "./components/NewsListing";
import SearchBar from "./components/SearchBar";
import Favorites from "./components/Favorites";
import logo from "./assets/imgs/Logo.svg";
import "./assets/css/style.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("business");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [view, setView] = useState("news");
  const [isActive, setIsActive] = useState(false);

  const handleMenuClick = () => {
    setIsActive(!isActive);
  };

  const apiKey = "545fc41090db457a8ea377ea2b78fd45";
  const apiUrl = `https://newsapi.org/v2/`;


  const retryRequest = async (url, retries = 3, delay = 1000) => {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      if (retries === 0 || error.response?.status !== 429) {
        throw error;
      }
      await new Promise(res => setTimeout(res, delay));
      return retryRequest(url, retries - 1, delay);
    }
  };

  useEffect(() => {
// Top headlines
    const fetchTopHeadlines = async () => {
      setLoading(true);
      try {
        const response = await retryRequest(
          `${apiUrl}top-headlines?q=${searchTerm}&apiKey=${apiKey}&pageSize=5`
        );
        setTopHeadlines(response.data.articles);
      } catch (err) {
        setError(err);
      }
    };
    // Latest from BBC
    const fetchLatestNews = async () => {
      setLoading(true);
      try {
        const response = await retryRequest(
          `${apiUrl}everything?q=bbc&apiKey=${apiKey}&pageSize=5`

        );
        setLatestNews(response.data.articles);
      } catch (err) {
        setError(err);
      }
    };
    // All news based on search
    const fetchAllNews = async () => {
      if (searchTerm) {
        setLoading(true);
        try {
          const response = await retryRequest(
            `${apiUrl}everything?q=${searchTerm}&apiKey=${apiKey}&pageSize=12`
          );
          setArticles(response.data.articles);
        } catch (err) {
          setError(err);
        }
      }
    };

    fetchTopHeadlines();
    fetchLatestNews();
    fetchAllNews();

    // Set loading to false after all fetches are complete
    setLoading(false);

  }, [searchTerm]);
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFavoriteToggle = (article) => {
    const isFavorite = favorites.some((fav) => fav.url === article.url);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.url !== article.url)
      : [...favorites, article];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleRemoveFavorite = (article) => {
    const updatedFavorites = favorites.filter((fav) => fav.url !== article.url);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <a className="logo" onClick={() => setView("news")}>
            <img src={logo} alt="" className="logo-img" />
          </a>
          <ul className={`nav ${isActive ? "active" : ""}`}>
            <li className="nav-item">
              <a href="" className="nav-link">
                World
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Business
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Lifestyle
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Creator
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Stories
              </a>
            </li>
          </ul>
          <div className="quick-action">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
            <div className="fav" onClick={() => setView("favorites")}>
              <svg
                className="icn-svg"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.9454 0.8982C14.5518 -0.733813 11.596 0.0277934 10.0003 1.89554C8.40454 0.0277934 5.44878 -0.74288 3.05516 0.8982C1.78582 1.76861 0.987945 3.23742 0.933545 4.78783C0.80661 8.30573 3.92557 11.1255 8.68561 15.4503L8.77628 15.5319C9.46535 16.1575 10.5262 16.1575 11.2152 15.5229L11.315 15.4322C16.075 11.1164 19.1849 8.29666 19.067 4.77877C19.0126 3.23742 18.2148 1.76861 16.9454 0.8982ZM10.091 14.0994L10.0003 14.19L9.90962 14.0994C5.59385 10.1916 2.74689 7.60759 2.74689 4.9873C2.74689 3.17395 4.1069 1.81394 5.92025 1.81394C7.31653 1.81394 8.67654 2.71155 9.15708 3.95369H10.8526C11.324 2.71155 12.684 1.81394 14.0803 1.81394C15.8937 1.81394 17.2537 3.17395 17.2537 4.9873C17.2537 7.60759 14.4067 10.1916 10.091 14.0994Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div
              className={`mobile-menu ${isActive ? "active" : ""}`}
              onClick={handleMenuClick}
            >
              <svg
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="icn-svg "
              >
                <path
                  d="M17 1H5M17 8H1M17 15H9"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {view === "news" ? (
        <>
          {loading ? (
            <section className="section section--banner">
              <div className="container">
                <div className="banner-content">
                  <h4>Welcome to News</h4>
                  <h2>
                    Immerse yourself in stories that
                    <span className="text-primary">inspire</span>,
                    <span className="text-primary"> educate</span>, and
                    <span className="text-primary"> entertain</span>.
                  </h2>
                  <h4>Please wait we're getting the latest news for you....</h4>
                </div>
              </div>
            </section>
          ) : error ? (
            <p>Error fetching news: {error.message}</p>
          ) : (
            <>
              <section className="section section--banner">
                <div className="container">
                  <div className="banner-content">
                    <h4>Welcome to News</h4>
                    <h2>
                      Immerse yourself in stories that
                      <span className="text-primary">inspire</span>,
                      <span className="text-primary"> educate</span>, and
                      <span className="text-primary"> entertain</span>.
                    </h2>
                  </div>
                </div>
              </section>
              <section class="section section--two-col">
                <NewsGal articlesGal={latestNews} />
                <NewsListing articlesGal={topHeadlines} />
              </section>
              <NewsList
                articles={articles}
                onFavoriteToggle={handleFavoriteToggle}
                favorites={favorites}
              />
              <footer className="footer">
                <div className="footer-content">
                  <p>Copyright © News 2024</p>
                </div>
              </footer>
            </>
          )}
        </>
      ) : (
        <Favorites
          favorites={favorites}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}
    </>
  );
}

export default App;
