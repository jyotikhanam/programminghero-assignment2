import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <main className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <p className="hero-subtitle">DISCOVER • EXPLORE • ENJOY</p>
            <h1>Discover Your Next<span> Favorite Movie</span></h1>
            <p className="hero-description">Explore a world of movies and TV shows. Find your favorites,
              discover something new, and enjoy detailed information about
              every show.</p>
            <Link to="/movies" className="hero-button">Explore Now</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;