import { useEffect } from 'react';

const MovieModal = ({ movie, onClose }) => {
	useEffect(() => {
		const handleEscape = (event) => {
			if (event.key === 'Escape') onClose();
		};

		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [onClose]);

	if (!movie) return null;

	const { title, poster_path, vote_average, original_language, release_date, overview } = movie;

	return (
		<div className="movie-modal" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="movie-modal-title">
			<div className="movie-modal-content" onClick={(event) => event.stopPropagation()}>
				<button type="button" className="movie-modal-close" onClick={onClose} aria-label="Close">
					×
				</button>

				<img
					src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
					alt={title}
					className="movie-modal-poster"
				/>

				<div className="movie-modal-details">
					<h3 id="movie-modal-title">{title}</h3>

					<div className="content">
						<div className="rating">
							<img src="/star.svg" alt="star" />
							<p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
						</div>
						<span>•</span>
						<p className="lang">{original_language}</p>
						<span>•</span>
						<p className="year">{release_date?.split('-')[0] ?? 'N/A'}</p>
					</div>

					<p className="movie-modal-overview">{overview || 'No overview available.'}</p>
				</div>
			</div>
		</div>
	);
};

export default MovieModal;
