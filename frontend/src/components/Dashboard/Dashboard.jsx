'use strict';

import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'
import Carousel from 'nuka-carousel'


class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: true
        }

        this.logOut = this.logOut.bind(this);
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        this.addToWishlist = this.addToWishlist.bind(this);
    }

    componentDidMount() {
        axios.get('/api/profile').then( (res) => {
            console.log(res);
            this.setState({
                isLoggedIn: true
            })
        }).catch( (err) => {
            this.setState({
                isLoggedIn: false
            })
        })
    }

    logOut() {
        axios.get('/api/logout').then( (res) => {
            console.log("Logged out");
        })
    }
    like(){
      console.log('like button clicked');
    }

    dislike(){
      console.log('dislike button clicked');
    }
    addToWishlist(){
      console.log('addToWishlist button clicked');
    }

    render() {

        if (this.state.isLoggedIn) {
            return(
                <div className="Dashboard">
                    <Card>
                        <h1>Welcome to the App!</h1>
                        <p>You are now logged in.</p>
                        <h1>This is the product page</h1>
                        <Link to="/wishlist">
                            Wishlist
                        </Link>
                        <Link to="/" onClick={this.logOut}>
                            Log out
                        </Link>
                        <Carousel>
                              <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1"/>
                              <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2"/>
                              <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3"/>
                              <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4"/>
                        </Carousel>
                    </Card>
                        <button onClick={this.like}> like </button>
                        <button onClick={this.dislike}> dislike </button>
                        <button onClick={this.addToWishlist}> Add to wishlist </button>
                </div>

            )
        } else {
            return(
                <div className="Dashboard">
                    <Card>
                        <h1>The email or password is incorrect</h1>
                        <Link to="/">
                            Back
                        </Link>
                    </Card>
                </div>
            )
        }
    }
}

export default Dashboard
