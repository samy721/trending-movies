import { movies } from "./getmovies";
import React, { Component } from 'react'

export default class banner extends Component {
    render() {
        let movie = movies.results[8];
        return (
            <>
                {
                    movie === "" ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <div class="card banner-card container-fluid mb-3">
                            <img className="banner-img img-fluid" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" />
                            <div class="card-body">
                                <h5 className="card-title banner-title">{movie.original_title}</h5>
                                <p className="card-text banner-text">{movie.overview}</p>
                                <p class="card-text"><small class="text-muted">Last updated 50 min ago</small></p>

                            </div>
                        </div>
                }
            </>
        )
    }
}