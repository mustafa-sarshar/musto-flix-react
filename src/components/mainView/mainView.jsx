import React from "react";

import MovieCard from "../movieCard/movieCard";
import MovieView from "../movieView/movieView";

export default class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            "movies": [
                {
                    "_id": "636c17f1e0500da3314455a8",
                    "title": "Silence of the Lambs",
                    "des": "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
                    "director_id": "636541bf216291acecb8d8f5",
                    "genre_id": "636541f9216291acecb8d8fb",
                    "image_url": "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
                    "featured": true
                },
                {
                    "_id": "636c17f1e0500da3314455a9",
                    "title": "Titanic",
                    "des": "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
                    "director_id": "636541bf216291acecb8d8f7",
                    "genre_id": "636541f9216291acecb8d8fe",
                    "image_url": "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
                    "featured": true,
                    "stars": [
                        "636c17efe0500da33144559f",
                        "636c17efe0500da3314455a0",
                        "636c17efe0500da3314455a1"
                    ]
                },
                {
                    "_id": "636c17f1e0500da3314455aa",
                    "title": "Terminator 2: Judgment Day",
                    "des": "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten-year-old son John from a more advanced and powerful cyborg.",
                    "director_id": "636541bf216291acecb8d8f7",
                    "genre_id": "636541f9216291acecb8d900",
                    "image_url": "https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
                    "featured": true
                }
            ],
            "selectedMovie": null
        }
    }
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }
    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) {
            return <div className="main-view">The list is empty!</div>;
        } else {
            return (
                <div className="main-view">
                    {
                        selectedMovie
                            ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
                            : movies.map(movie => (
                                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                            ))
                    }
                </div>
            );
        }
    }
}