import { Calendar, Star } from "lucide-react";
function MovieCard({ movie, onDetailsClick }) {

  const image = movie.image?.medium || "https://via.placeholder.com/300x450?text=No+Image";
  const year = movie.premiered ? new Date(movie.premiered).getFullYear() : "N/A";
  const rating = movie.rating?.average || "N/A";

  return (
    <article className="movie-card">
      <div className="movie-image-container">
        <img src={image} alt={movie.name} className="movie-image"/>
      </div>

      <div className="movie-info">
        <h2>{movie.name}</h2>
        <div className="movie-meta">
          <span><Star size={15} fill="currentColor" /> {rating}</span>
          <span>•</span>
          <span><Calendar size={15} /> {year}</span>
          <span>•</span>
          <span>{movie.language}</span>
        </div>

        <button className="details-button" onClick={() => onDetailsClick(movie)}>
          See Details
        </button>
      </div>
    </article>
  );
}

export default MovieCard;