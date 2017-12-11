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
            URL1:"",
            URL2:"",
            URL3:"",
            URL4:"",
            productName:"",
            lastCategoryIndex: 0,
        }
        //this.showURL = this.showURL.bind(this);
        this.logOut = this.logOut.bind(this);
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        this.storeToWishlist = this.storeToWishlist.bind(this);
        this.addToWishlist = this.addToWishlist.bind(this);
        this.getFirstItem = this.getFirstItem.bind(this);
        this.showimage = this.showimage.bind(this);
    }


    showimage(){
        console.log(this.state.image);
    }

    getFirstItem() {
      firstItem(this.state.itemGetter, (result) => {
        console.log(result);
      })
    }

    componentWillMount() {
       // get the last category index from db
       axios.get('/api/DB/'+this.props.location.state.email).then( (res) => {
         const lastCategoryIndex = res.data.data.lastCategoryIndex;
         console.log('res = ', res);
         console.log('lci = ',  lastCategoryIndex);
         this.setState({
           lastCategoryIndex: lastCategoryIndex,
         });
         let newItemGetter = new GetItem(this.state.lastCategoryIndex);
         this.setState({
           itemGetter: newItemGetter,
         })
         firstItem(newItemGetter, (result) => {
           console.log('first = ',result);
           let img = result[0].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
           let img2 = result[0].ImageSets[0].ImageSet;
           let url1 = img2[0].LargeImage[0].URL[0];
           let url2 = img2[1].LargeImage[0].URL[0];
           let url3 = img2[2].LargeImage[0].URL[0];
           let url4 = img2[3].LargeImage[0].URL[0];
           let name = result[0].ItemAttributes[0].Title[0].toString();
         this.setState({

             URL1:url1,
             URL2:url2,
             URL3:url3,
             URL4:url4,
             productName: name
         });
         console.log('this.state.image',this.state.image);
         //console.log('medium image',JSON.stringify(result[0].ImageSets[0].ImageSet[0].MediumImage[1]));
         //console.log('image array', JSON.stringify(resultarray));
         console.log('product ID ',JSON.stringify(result[0].ASIN));
         });
       })

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
         // store last category index
       storeLastCategoryIndex(this.props.location.state.email, this.state.itemGetter.categoryIndex);
       console.log('itemgetter = ',this.state.itemGetter);
       likeItem(this.state.itemGetter, (result) => {
         //console.log(result);
         console.log('like = ',result);
          let img = result[0].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
          let img2 = result[0].ImageSets[0].ImageSet;
          let url1 = '';
          let url2 = '';
          let url3 = '';
          let url4 = '';
          let name = '';
          if(typeof img2[0] !== 'undefined') {
            url1 = img2[0].LargeImage[0].URL[0];
          }
          if(typeof img2[1] !== 'undefined') {
            url2 = img2[1].LargeImage[0].URL[0];
          }
          if(typeof img2[2] !== 'undefined') {
            url3 = img2[2].LargeImage[0].URL[0];
          }
          if(typeof img2[3] !== 'undefined') {
            url4 = img2[3].LargeImage[0].URL[0];
          }
          if(typeof result[0].ItemAttributes[0].Title[0] !== 'undefined') {
            name = result[0].ItemAttributes[0].Title[0].toString();
          }
          /*
          let url2 = img2[1].LargeImage[0].URL[0];
          let url3 = img2[2].LargeImage[0].URL[0];
          let url4 = img2[3].LargeImage[0].URL[0];
          let name = result[0].ItemAttributes[0].Title[0].toString();
          */

        this.setState({

            URL1:url1,
            URL2:url2,
            URL3:url3,
            URL4:url4,
            productName: name
        });
        //window.load();
       })
      console.log('like button clicked');
    }

    dislike(){
        storeLastCategoryIndex(this.props.location.state.email, this.state.itemGetter.categoryIndex);
        console.log('itemgetter = ',this.state.itemGetter);
        dislikeItem(this.state.itemGetter, (result) => {
         //console.log(result);
         console.log('dislike = ',result);
          //let img = result[0].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
          let img2 = result[0].ImageSets[0].ImageSet;
          /*
          let url1 = img2[0].LargeImage[0].URL[0];
          let url2 = img2[1].LargeImage[0].URL[0];
          let url3 = img2[2].LargeImage[0].URL[0];
          let url4 = img2[3].LargeImage[0].URL[0];
          let name = result[0].ItemAttributes[0].Title[0].toString();
          let img = result[0].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
          let img2 = result[0].ImageSets[0].ImageSet;
          */
          let url1 = '';
          let url2 = '';
          let url3 = '';
          let url4 = '';
          let name = '';
          if(typeof img2[0] !== 'undefined') {
            url1 = img2[0].LargeImage[0].URL[0];
          }
          if(typeof img2[1] !== 'undefined') {
            url2 = img2[1].LargeImage[0].URL[0];
          }
          if(typeof img2[2] !== 'undefined') {
            url3 = img2[2].LargeImage[0].URL[0];
          }
          if(typeof img2[3] !== 'undefined') {
            url4 = img2[3].LargeImage[0].URL[0];
          }
          if(typeof result[0].ItemAttributes[0].Title[0] !== 'undefined') {
            name = result[0].ItemAttributes[0].Title[0].toString();
          }
        this.setState({
            URL1:url1,
            URL2:url2,
            URL3:url3,
            URL4:url4,
            productName: name
        });
       })
         // store last category index
      console.log('dislike button clicked');
    }

    storeToWishlist(email, id) {
      console.log('store to wishlist');
      var url = "http://localhost:3000/api/DB/" + String(email) + '/' + String(id);
      axios
                .post(url)
                .then(response => {

                });

    }

    addToWishlist(){
       storeLastCategoryIndex(this.props.location.state.email, this.state.itemGetter.categoryIndex);
       this.storeToWishlist(this.props.location.state.email, this.state.itemGetter.curr._itemId);
       wishListItem(this.state.itemGetter, (result) => {
         console.log(result);
       });
      console.log('addToWishlist button clicked');
    }

    render() {

        if (this.state.isLoggedIn) {
            //this.getFirstItem();
            const imageUrl = this.state.image;
            console.log('url  = ',imageUrl);
            //const ele = <img width='200px' height='200px' src={this.state.image}/>;
            //const bb = url(this.state.image);
            return(
                <div className="Dashboard">
                    <Card>
                        <h1>This is the product page</h1>
                        <Link to="/wishlist">
                            Wishlist
                        </Link>

                        <Link to="/" onClick={this.logOut}>
                            Log out
                        </Link>
                        <h1>{this.state.productName}</h1>
                        <Carousel>
                              <img width='200px' height='200px' src={this.state.URL1}/>
                              <img width='200px' height='200px' src={this.state.URL2}/>
                              <img width='200px' height='200px' src={this.state.URL3}/>
                              <img width='200px' height='200px' src={this.state.URL4}/>
                        </Carousel>

                    </Card>
                        <button onClick={this.like}> like </button>
                        <button onClick={this.dislike}> dislike </button>
                        <button onClick={this.addToWishlist}> Add to wishlist </button>
                        <button onClick={this.showimage}> show image </button>
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

<<<<<<< HEAD
=======

>>>>>>> 591176ea7968e428824358366dd5344e7b0c351a
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
<<<<<<< HEAD
=======

>>>>>>> 591176ea7968e428824358366dd5344e7b0c351a

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
