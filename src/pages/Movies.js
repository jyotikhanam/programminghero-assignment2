import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://api.tvmaze.com/shows"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch shows");
      }

      const data = await response.json();

      setMovies(data);
    } catch (error) {
      console.error(error);
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      fetchMovies();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();

      const searchResults = data.map(
        (item) => item.show
      );

      setMovies(searchResults);
    } catch (error) {
      console.error(error);
      setError(
        "Unable to search. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movies-page">

      <header className="movies-header">
        <p className="section-subtitle">EXPLORE OUR COLLECTION</p>
        <h1>Discover Movies & Shows</h1>
        <p>Browse through our collection and discover your next favorite show.</p>
      </header>

      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-box">
          <span className="search-icon"><Search size={20} /></span>
          <input type="text" placeholder="Search for a movie or show..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
          />

          {searchQuery && (
            <button type="button" className="clear-button"
              onClick={() => {
                setSearchQuery("");
                fetchMovies();
              }}
            >
              <X />
            </button>
          )}
        </div>

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && (
        <div className="status-message">
          Loading movies...
        </div>
      )}

      {error && (
        <div className="status-message error">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {movies.length > 0 ? (
            <div className="movie-grid">

              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onDetailsClick={handleDetailsClick}
                />
              ))}

            </div>
          ) : (
            <div className="status-message">
              No movies or shows found.
            </div>
          )}
        </>
      )}

      <MovieModal
        movie={selectedMovie}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Movies;