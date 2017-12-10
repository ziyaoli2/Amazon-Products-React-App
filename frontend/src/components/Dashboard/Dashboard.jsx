'use strict';

import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { GetItem, firstItem, likeItem, dislikeItem, wishListItem, storeLastCategoryIndex } from '../../../../backend/main.js'
import axios from 'axios'

import styles from './styles.scss'
import Carousel from 'nuka-carousel'


class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: true,
            itemGetter: {},
        }

        this.logOut = this.logOut.bind(this);
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        this.addToWishlist = this.addToWishlist.bind(this);
        this.storeToWishlist = this.storeToWishlist.bind(this);
        this.getFirstItem = this.getFirstItem.bind(this);
    }

    getFirstItem() {
      firstItem(this.state.itemGetter, (result) => {
        console.log(result);
      })
    }

    componentWillMount() {
      let newItemGetter = new GetItem(0);
      this.setState({
        itemGetter: newItemGetter,
      })
      firstItem(newItemGetter, (result) => {
        console.log('first = ',result);
      });
      storeLastCategoryIndex('abc',0);
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
        let itemGetter = new GetItem(0);
        this.setState({itemGetter});
        console.log(this.state);

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

    storeToWishlist(email, id) {
      console.log('store to wishlist');
      //storeWishList(this.curr.itemId);
      var url = "http://localhost:3000/api/DB/" + String(email) + '/' + String(id);
      axios
                .post(url)
                .then(response => {

                });

    }

    addToWishlist(){
      this.storeToWishlist('abc', 'bcd');
      storeLastCategoryIndex('abc',0);
      console.log('addToWishlist button clicked');
    }

    render() {

        if (this.state.isLoggedIn) {
            //this.getFirstItem();
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

/**
'use strict';

import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'
import Carousel from 'nuka-carousel'


import { GetItem, firstItem, likeItem, dislikeItem, wishListItem } from '../../../../backend/main.js'
//get email in the props and call axios get to get the wishlist //

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true
        }
        this.logOut = this.logOut.bind(this);
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        this.addToWishlist = this.addToWishlist.bind(this);
        this.handleProp=this.handleProp.bind(this);
    }

    handleProp(props) {
          console.log('get email from props' + this.props.location.state.email);
          //return props.Empnumber;
    }

    componentWillMount() {
        console.log('this is the first item');
        let itemGetter = new GetItem(0);
        firstItem(itemGetter, (result) => {
            console.log('first = ',JSON.stringify(result));
        });
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
                        <button onClick={this.handleProp}> get email </button>
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

**/
