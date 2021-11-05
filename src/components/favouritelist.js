import React, { Component } from 'react'

export default class favouritelist extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currentgenre: "All Genres",
            newmovies: [],
            currenttext: ''
        }
    }
    componentDidMount() {
        const genresid = {
            28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama",
            10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance",
            878: "Science Fiction", 10770: "TV Movie", 53: "Thrillers", 10752: "War", 10759: "Act", 37: "Western"
        }

        let localdata = JSON.parse(localStorage.getItem('addedmov') || '[]');
        let temparray = [];
        localdata.forEach((movieobject) => {
            if (!temparray.includes(genresid[movieobject.genre_ids[0]])) {
                temparray.push(genresid[movieobject.genre_ids[0]])
            }
        });
        temparray.unshift("All Genres")
        this.setState({
            genres: [...temparray],
            newmovies: [...localdata]
        })
    }

    activegenre = (genre) => {
        this.setState({
            currentgenre: genre
        })
    }

    sortRatDesc = () => {
        let temp = this.state.newmovies;
        temp.sort((a, b) => b.vote_average - a.vote_average)
        this.setState({
            movies: [...temp]
        })
    }

    sortRatAsc = () => {
        let temp = this.state.newmovies;
        temp.sort((a, b) => a.vote_average - b.vote_average)
        this.setState({
            movies: [...temp]
        })
    }

    deleteMovie = (id) => {
        let newarray = [];
        newarray = this.state.newmovies.filter((movieobject) => movieobject.id !== id)
        this.setState({
            newmovies: [...newarray]
        })
        localStorage.setItem('addedmov', JSON.stringify(newarray))
    }

    render() {
        const genresid = {
            28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama",
            10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance",
            878: "Science Fiction", 10770: "TV Movie", 53: "Thrillers", 10752: "War", 10759: "Act", 37: "Western"
        }

        let { currenttext, newmovies } = this.state;
        let filtermovies = newmovies.filter(item => {
            return item.original_title.toLowerCase().includes(currenttext.toLowerCase())
        });
        
        if (this.state.currentgenre !== "All Genres") {
            filtermovies = this.state.newmovies.filter((movieobject) => genresid[movieobject.genre_ids[0]] === this.state.currentgenre)
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
                                <div>
                                    <form class="d-flex">
                                        <input class="form-control search-box" type="search" placeholder="Search Movies" aria-label="Search" value={this.state.currenttext} onChange={(e) => this.setState({ currenttext: e.target.value })} />
                                    </form>
                                </div>
                                <table class="table">
                                    <thead>
                                        <tr className='text-center'>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col"><i class="fas fa-sort-up m-2" onClick={this.sortRatDesc} />Rating<i class="fas fa-sort-down m-2" onClick={this.sortRatAsc} /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filtermovies.map((movieobject) => (
                                                <tr>
                                                    <td> <img className="img-thumb" src={`https://image.tmdb.org/t/p/original${movieobject.backdrop_path}`} alt='thumb' />{movieobject.original_title}</td>
                                                    <td>{genresid[movieobject.genre_ids[0]]}</td>
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
