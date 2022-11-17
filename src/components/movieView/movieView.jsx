import React from 'react';

export default class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;
        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.image_url} />
                </div>
                <div className="movie-title">
                    <span className="movie-title__label">Title: </span>
                    <span className="movie-title__value">{movie.title}</span>
                </div>
                <div className="movie-description">
                    <span className="movie-description__label">Description: </span>
                    <span className="movie-description__value">{movie.des}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}