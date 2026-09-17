import { Calendar, Star, X } from "lucide-react";
function MovieModal({ movie, onClose }) {
  if (!movie) {
    return null;
  }

  const image = movie.image?.original || movie.image?.medium || "https://via.placeholder.com/600x900?text=No+Image";

  const rating = movie.rating?.average || "N/A";

  const releaseDate = movie.premiered ? new Date(movie.premiered).toLocaleDateString() : "N/A";

  const genres = movie.genres && movie.genres.length > 0 ? movie.genres.join(", ") : "N/A";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="movie-modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={22} />
        </button>

        <div className="modal-image-container">
          <img src={image} alt={movie.name} className="modal-image"/>
        </div>

        <div className="modal-content">
          <h2>{movie.name}</h2>

          <div className="modal-meta">
            <span><Star size={15} fill="currentColor" /> {rating}</span>
            <span>•</span>
            <span><Calendar size={15} /> {releaseDate}</span>
          </div>

          <p className="modal-genre">
            <strong>Genre:</strong> {genres}
          </p>

          <div className="modal-summary">
            <h3>Overview</h3>

            <div
              dangerouslySetInnerHTML={{
                __html: movie.summary || "<p>No summary available.</p>",
              }}
            />
          </div>

          <button className="modal-close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;