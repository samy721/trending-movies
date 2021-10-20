import React, { Component } from 'react'
// import { movies } from './getmovies'

export default class Watchlist extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currentgenre: "All Genres",
            movies: [],
            currentText:''
        }
    }
    componentDidMount() {
        const genresid = {
            28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
            80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thrillers", 10752: "War", 10759: "Act", 37: "Western",
        }

        let localdata = JSON.parse(localStorage.getItem('added-movies') || '[]');
        let temparray = [];
        localdata.forEach((movieobject) => {
            if (!temparray.includes(genresid[movieobject.genre_ids[0] || movieobject.genre_ids[1]])) {
                temparray.push(genresid[movieobject.genre_ids[0] || movieobject.genre_ids[1]])
            }
        });
        temparray.unshift("All Genres")
        this.setState({
            genres: [...temparray],
            movies: [...localdata]
        })
    }

    activegenre = (genre) => {
        this.setState({
            currentgenre: genre
        })
    }

    sortPopDesc = () => {
        let temp = this.state.movies;
        temp.sort((a, b) => b.popularity - a.popularity)
        this.setState({
            moives: [...temp]
        })
    }

    sortPopAsc = () => {
        let temp = this.state.movies;
        temp.sort((a, b) => a.popularity - b.popularity)
        this.setState({
            moives: [...temp]
        })
    }

    sortRatDesc = () => {
        let temp = this.state.movies;
        temp.sort((a, b) => b.vote_average - a.vote_average)
        this.setState({
            moives: [...temp]
        })
    }

    sortRatAsc = () => {
        let temp = this.state.movies;
        temp.sort((a, b) => a.vote_average - b.vote_average)
        this.setState({
            moives: [...temp]
        })
    }

    deleteMovie = (id) => {
        let newarray = [];
        newarray = this.state.movies.filter((movieobject) => movieobject.id !== id)
        this.setState({
            movies: [...newarray]
        })
        localStorage.setItem('added-movies', JSON.stringify(newarray))
    }

    render() {
        // console.log(this.state.movies);
        const genresid = {
            28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
            80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thrillers", 10752: "War", 10759: "Act", 37: "Western",
        }
        let filterarray = [];
        if (this.state.currentText === '') {
            filterarray = this.state.movies;
            console.log(filterarray)
        } else {
            let filterarray = this.state.movies.filter((movieobject) => {
            return movieobject.original_title.toLowerCase().includes(this.state.currentText.toLowerCase())
            })
        }

        // if (this.state.currentgenre === "All Genres") {
        //     filterarray = this.state.movies
        // }
        // else
        if (this.state.currentgenre !== "All Genres") {
            filterarray = this.state.movies.filter((movieobject) => genresid[movieobject.genre_ids[0]] === this.state.currentgenre)
        }
        return (
            <div>
                <div className="main container-fluid">
                    <div className="row">
                        <div className="col-lg-3 ">
                            <ul class="list-group p-3">
                                {
                                    this.state.genres.map((genreslist) => (
                                        this.state.currentgenre === genreslist ?
                                            <li class="list-group-item listitems">{genreslist}</li> :
                                            <li class="list-group-item" onClick={() => this.activegenre(genreslist)}>{genreslist}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-lg-9">
                            <div className="row">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control input-group-text m-3 bg-light" placeholder="Search Movie Name" value={this.state.currentText} onChange={(e) => this.setState({ currentText: e.target.value })} />
                                </div>
                            </div>
                            <div className="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col"><i class="fas fa-sort-up m-2" onClick={this.sortPopDesc} />Popularity<i class="fas fa-sort-down m-2" onClick={this.sortPopAsc} /></th>
                                            <th scope="col"><i class="fas fa-sort-up m-2" onClick={this.sortRatDesc} />Rating<i class="fas fa-sort-down m-2" onClick={this.sortRatAsc} /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterarray.map((movieobject) => (
                                                <tr>
                                                    <td> <img className="img-thumb" src={`https://image.tmdb.org/t/p/original${movieobject.backdrop_path}`} alt='thumb' />{movieobject.original_title || movieobject.name}</td>
                                                    <td>{genresid[movieobject.genre_ids[0]] || 'NA'}</td>
                                                    <td>{movieobject.popularity}</td>
                                                    <td>{movieobject.vote_average}</td>
                                                    <td><button type="button" class="btn btn-danger" onClick={() => this.deleteMovie(movieobject.id)}>Delete</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
