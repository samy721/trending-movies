import axios from 'axios';
import React, { Component } from 'react'


export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            pagenumber: [1],
            currentpage: 1,
            movies: [],
            favouritelist: [],
            currenttext:''
        }
    }

    async componentDidMount() {
        const apiresult = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=bdd243ea847239dc0799805e63e189f0&language=en-US&page=${this.state.currentpage}`);
        const data = apiresult.data;
        this.setState({
            movies: [...data.results]
        })
    }

    pagechange = async () => {
        console.log(this.state.currentpage);
        const apiresult = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=bdd243ea847239dc0799805e63e189f0&language=en-US&page=${this.state.currentpage}`);
        const data = apiresult.data;
        this.setState({
            movies: [...data.results]
        })
    }

    nextpage = async () => {
        let temparray = []
        for (let i = 1; i <= this.state.pagenumber.length + 1; i++) {
            temparray.push(i);
        }
        this.setState({
            pagenumber: [...temparray],
            currentpage: this.state.currentpage + 1
        }, this.pagechange)
    }

    previouspage = async () => {
        if (this.state.currentpage !== 1) {
            this.setState({
                currentpage: this.state.currentpage - 1
            }, this.pagechange)
        }
    }

    activepage = (value) => {
        if (value !== this.state.currentpage) {
            this.setState({
                currentpage: value
            }, this.pagechange)
        }
    }

    addtofavlist = (favmovie) => {
        let oldData = JSON.parse(localStorage.getItem('addedmov') || '[]');
        if (this.state.favouritelist.includes(favmovie.id)) {
            oldData = oldData.filter((m) => m.id !== favmovie.id)
        } else {
            oldData.push(favmovie)
        }
        localStorage.setItem('addedmov', JSON.stringify(oldData));
        this.checkfavouritelist();
    }

    checkfavouritelist = () => {
        let oldData = JSON.parse(localStorage.getItem('addedmov') || '[]');
        let arrayTemp = oldData.map((mymovies) => mymovies.id)
        this.setState({
            favouritelist: [...arrayTemp]
        })
    }
    
    render(){
        let { currenttext, movies} = this.state;
        let filtermovies = movies.filter(item =>{
            return  item.original_title.toLowerCase().includes(currenttext.toLowerCase())
        });

        return (
            <>
                {
                        <div className="container">
                            <h1 class='text-danger m-2 text-center'>Trending Movies</h1>
                            <div>                           
                                <form class="d-flex">
                                    <input class="form-control search-box" type="search" placeholder="Search Movies" aria-label="Search" value={this.state.currenttext} onChange={(e) => this.setState({ currenttext:e.target.value})} />
                                </form>
                            </div>
                            <div class='movie-list'>
                                {
                                    filtermovies.map((moviesobject) => (
                                        <div class="card movie-card text-white m-2"  >
                                            <img className="banner-img img-fluid" src={`https://image.tmdb.org/t/p/original${moviesobject.backdrop_path}`} alt="" />
                                            <div class='card-img-overlay card-texts'>
                                                <h2 className="card-title">{moviesobject.original_title}</h2>
                                                <div>{
                                                    <a class="btn btn-primary m-1" onClick={() => this.addtofavlist(moviesobject)} >{this.state.favouritelist.includes(moviesobject.id) ? 'Remove from Favourite List' : 'Add to Favourite List'}</a>
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                            <nav class="d-flex justify-content-center p-3" aria-label="...">
                                <ul class="pagination">
                                    <li class="page-item"><span class="page-link" onClick={this.previouspage}>Previous</span></li>
                                    {
                                        this.state.pagenumber.map((value) => (

                                            <li class="page-item"><a class="page-link" onClick={() => this.activepage(value)}>{value}</a></li>

                                        ))
                                    }
                                    <li class="page-item"><a class="page-link" onClick={this.nextpage}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                }
            </>
        )
    }
}
