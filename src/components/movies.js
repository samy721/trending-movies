import axios from 'axios';
import React, { Component } from 'react'
// import { movies } from './getmovies'

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            pagenumber: [1],
            currentpage: 1,
            movies: [],
            watchlist:[]
        }
    }
    async componentDidMount() {
        const apiresult = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=bdd243ea847239dc0799805e63e189f0&language=en-US&page=${this.state.currentpage}`);
        const moviesdata = apiresult.data;
        // console.log(data);
        this.setState({
            movies: [...moviesdata.results]
        })
    }
    pagechange = async () => {
        console.log("page change karo");
        console.log(this.state.currentpage);
        const apiresult = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=bdd243ea847239dc0799805e63e189f0&language=en-US&page=${this.state.currentpage}`);
        const moviesdata = apiresult.data;
        this.setState({
            movies: [...moviesdata.results]
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
        if(value!==this.state.currentpage){
            this.setState({
                currentpage:value
            }, this.pagechange)
        }

    }
    addtowacthlist = (favmovie) => {
let oldData = JSON.parse(localStorage.getItem('added-movies') || '[]');
if(this.state.watchlist.includes(favmovie.id)){
oldData = oldData.filter((m)=> m.id != favmovie.id )
}else{
    oldData.push(favmovie)
}
localStorage.setItem('added-movies', JSON.stringify(oldData));
console.log(oldData);
this.checkwatchlist();
}
checkwatchlist =() =>{
    let oldData = JSON.parse(localStorage.getItem('added-movies') || '[]');
    let arrayTemp = oldData.map((mymovies)=>mymovies.id)
    this.setState({
        watchlist: [...arrayTemp]
    })
}
    render() {
        // let movie = movies.results
        return (
            <>
                {
                    this.state.movies.length === 0 ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <div className="container">
                            <h2 class='section-title'>Latest Released Movies</h2>
                            <div class='movie-list'>
                                {
                                    this.state.movies.map((moviesobject) => (
                                        <div class="card movie-card text-white m-2" onMouseEnter={() => this.setState({ hover: moviesobject.id })} >
                                            <img className="banner-img img-fluid" src={`https://image.tmdb.org/t/p/original${moviesobject.backdrop_path}`} alt="" />
                                            <div class='card-img-overlay card-texts'>
                                                <h6 className="card-title banner-title">{moviesobject.original_title || moviesobject.name}</h6>
                                                <div>{
                                                    this.state.hover === moviesobject.id &&
                                                    <a class="btn btn-primary m-1" onClick={()=>this.addtowacthlist(moviesobject)} >{this.state.watchlist.includes(moviesobject.id) ? 'Remove from Watch List' : 'Add to Watch List'}</a>
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
