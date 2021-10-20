import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <div className='container site-title'>
                <Link to='/' style={{textDecoration:'none', marginRight:'20px'}} ><h1>Trending Movies </h1></Link>
                <Link to='/watchlist' style={{textDecoration:'none'}} ><h1> Watch List  ❤ </h1></Link>
            </div>
        )
    }
}