// src/NewsDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const NewsDetail = () => {
  const { id } = useParams(); // Get article ID from URL parameters
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Fetch article details
    const fetchArticle = async () => {
      setLoading(true);
      try {
        // Mock fetch - replace this with your own logic or data
        const response = await fetch(`https://newsapi.org/v2/everything?apiKey=ad23f24f6762478995a4f62590458e25&q=${id}`);
        const data = await response.json();
        setArticle(data.articles[0]); // Assuming the article is at index 0
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching article: {error.message}</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <div>
      <button onClick={() => history.goBack()}>Back</button>
      <h1>{article.title}</h1>
      <p><strong>Source:</strong> {article.source.name}</p>
      <p><strong>Author:</strong> {article.author}</p>
      <p><strong>Published At:</strong> {article.publishedAt}</p>
      <p>{article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
  );
};

export default NewsDetail;
