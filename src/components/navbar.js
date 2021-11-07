import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <div className='container-fluid nav-title'>
                <Link to='/trending-movies'><img width='70px' src="https://play-lh.googleusercontent.com/ZKxqgazA73cF7wdXn1KFZaEGFPLCSm2VvmHTFPtuobIWsk6d9Jvuxr68CGrDLDykBfLN=rw-w250" alt="logo" /></Link>
                <Link to='/trending-movies' style={{textDecoration:'none'}} ><h1> TrendingMovies.com </h1></Link>
                <Link to='/favouritelist' style={{textDecoration:'none'}} ><h4 style={{color:'red'}}>❤</h4><span>Fav</span></Link>
            </div>
        )
    }
}