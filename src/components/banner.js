import axios from 'axios';
import React, { Component } from 'react'

export default class banner extends Component {
        constructor() {
          super();
          this.state = {
            topmovies:[]
          }
        }

        async componentDidMount() {
          const apiresult = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=bdd243ea847239dc0799805e63e189f0&language=en-US&page=${this.state.currentpage}`);
          const data = apiresult.data;
          this.setState({
              topmovies: [...data.results]
          })
      }

        render() {
          let {topmovies} = this.state;
    return (
      (topmovies ===0) ? " Refresh Page " :
      <div>
<div id="myCarousel" class="carousel-inner carousel slide slider-banner" data-bs-ride="carousel">
        { 
        topmovies.slice(0, Math.floor(Math.random() * 15)).map( item => (
                <div class=" carousel-item active">
                          <img class="bd-placeholder-img" width="100%" src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false" />
                          <div class="container">
                                <div class="carousel-caption">
                                  <h2 class="banner-title" >Trending Now : "{item.original_title}"</h2>
                                </div>
                        </div>
                </div>
        ))
      }
      </div>
      </div>
    )
  }
}

 
  