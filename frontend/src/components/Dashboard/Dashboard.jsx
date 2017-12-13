'use strict';

import React, { Component } from 'react'
import { Button, Card, Icon, Label, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { GetItem, firstItem, likeItem, dislikeItem, wishListItem, storeLastCategoryIndex } from '../../../../backend/main.js'
import axios from 'axios'

import styles from './styles.scss'
import Carousel from 'nuka-carousel'

class Dashboard extends Component {

  constructor(props) {
      super(props);
      this.state = {

          isLoggedIn: true,
          itemGetter: {},
          URL1:"",
          URL2:"",
          URL3:"",
          URL4:"",
          productName:"",
          products:[]
      }
      //this.showURL = this.showURL.bind(this);
      this.logOut = this.logOut.bind(this);
      this.like = this.like.bind(this);
      this.dislike = this.dislike.bind(this);
      this.storeToWishlist = this.storeToWishlist.bind(this);
      this.addToWishlist = this.addToWishlist.bind(this);
      this.getFirstItem = this.getFirstItem.bind(this);
      this.showimage = this.showimage.bind(this);
      this.gotoWishlist = this.gotoWishlist.bind(this);
      this.unique = this.unique.bind(this);
  }

  showimage(){
      console.log(this.state.image);
  }
  unique(){
    console.log(this.state.products);
  }

  getFirstItem() {
    firstItem(this.state.itemGetter, (result) => {
      console.log(result);
    })
  }

  // componentWillMount() {
  //    // get the last category index from db

  //     let newItemGetter = new GetItem(0);
  //     this.setState({
  //       itemGetter: newItemGetter,
  //     })
  //     firstItem(newItemGetter, (result) => {
  //       console.log('first = ',result);
  //       let img = result[0].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
  //       let img2 = result[0].ImageSets[0].ImageSet;
  //       let url1 = img2[0].LargeImage[0].URL[0];
  //       let url2 = img2[1].LargeImage[0].URL[0];
  //       let url3 = img2[2].LargeImage[0].URL[0];
  //       let url4 = img2[3].LargeImage[0].URL[0];
  //       let name = result[0].ItemAttributes[0].Title[0].toString();
  //     this.setState({

  //         URL1:url1,
  //         URL2:url2,
  //         URL3:url3,
  //         URL4:url4,
  //         productName: name
  //     });
  //     console.log('this.state.image',this.state.image);
  //     //console.log('medium image',JSON.stringify(result[0].ImageSets[0].ImageSet[0].MediumImage[1]));
  //     //console.log('image array', JSON.stringify(resultarray));
  //     console.log('product ID ',JSON.stringify(result[0].ASIN));
  //     });

  //   }



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

      axios.get('/api/DB/'+this.props.location.state.email).then((response) => {
        const lastCategoryIndex = response.data.data.lastCategoryIndex;
        console.log('r = ', response);
        let newItemGetter = new GetItem(lastCategoryIndex);
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

       let url = "/api/DB/" + String(this.props.location.state.email);
    axios
              .get(url)
              .then(response => {
                      console.log(JSON.stringify(response.data.data));
                              let array = response.data.data.wishList;

                              let unique = [...new Set(array)];


                              // for (var i= 0; i< unique.length; i++){

                              // console.log(unique[i]);
                              // console.log(unique[i][0]);
                              // }

                              this.setState({
                                  products: unique
                              });

                              console.log('trimmed products in dashboard');
                              console.log(this.state.products);

              });
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
        }else{
          url2 = url1;
        }
        if(typeof img2[2] !== 'undefined') {
          url3 = img2[2].LargeImage[0].URL[0];
        }
        else{
          url3 = url2;
        }
        if(typeof img2[3] !== 'undefined') {
          url4 = img2[3].LargeImage[0].URL[0];
        }
        else{
          url4 = url3;
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
        }else{
          url2 = url1;
        }
        if(typeof img2[2] !== 'undefined') {
          url3 = img2[2].LargeImage[0].URL[0];
        }
        else{
          url3 = url2;
        }
        if(typeof img2[3] !== 'undefined') {
          url4 = img2[3].LargeImage[0].URL[0];
        }
        else{
          url4 = url3;
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
    var url = "/api/DB/" + String(email) + '/' + String(id);
    //  "/api/DB/
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
    let url = "/api/DB/" + String(this.props.location.state.email);
    axios
              .get(url)
              .then(response => {
                      console.log(JSON.stringify(response.data.data));
                      console.log(JSON.stringify(response.data.data.wishList));
                              let array = response.data.data.wishList;
                              let unique = [...new Set(array)];
                              // for (var i= 0; i< unique.length; i++){

                              //   if(unique[i][0]!='B'){
                              //     unique.filter((item, index) => (index !== i));
                              //   }

                              // }

                              // for (var i= 0; i< unique.length; i++){

                              // console.log(unique[i]);
                              // console.log(unique[i][0]);
                              // }

                              this.setState({
                                  products: unique
                              });
                              console.log('trimmed products in dashboard');
                              console.log(this.state.products);

              });

     this.like();

  }
  gotoWishlist(){
       //e.preventDefault();
       let url = "/api/DB/" + String(this.props.location.state.email);
    axios
              .get(url)
              .then(response => {
                      console.log(JSON.stringify(response.data.data));
                      console.log(JSON.stringify(response.data.data.wishList));
                              let array = response.data.data.wishList;
                              let unique = [...new Set(array)];
                              // for (var i= 0; i< unique.length; i++){

                              //   if(unique[i][0]!='B'){
                              //     unique.filter((item, index) => (index !== i));
                              //   }

                              // }

                              // for (var i= 0; i< unique.length; i++){

                              // console.log(unique[i]);
                              // console.log(unique[i][0]);
                              // }

                              this.setState({
                                  products: unique
                              });
                              console.log('trimmed products in dashboard');
                              console.log(this.state.products);

                                let email = encodeURIComponent(this.props.location.state.email);
                               let products = this.state.products;
                               console.log('converted in dashboard');
                               console.log(products);


                               this.props.history.push({
                                                       pathname: '/wishlist',
                                                       state: { email: email ,
                                                                products: products
                                                       },

                                                       });

              });



  }

  render() {

      if (this.state.isLoggedIn) {
          //this.getFirstItem();
          const imageUrl = this.state.image;
          console.log('url  = ',imageUrl);
          //const ele = <img width='200px' height='200px' src={this.state.image}/>;
          //const bb = url(this.state.image);
          return(
           <div>
             <div className = "navbar">
                <img src="https://ia601503.us.archive.org/18/items/neverknow_201712/neverknow.png"></img>

                    <Button as = {Link} content = 'Logout' icon = 'sign out' id = "logout" to = "/" onClick={this.logOut}></Button>
                <Button content = 'Wishlist' icon = 'cart' id = "wishlist" onClick={this.gotoWishlist}></Button>
             </div>
              <div className="Dashboard">
                  <Card className = "panel" color = "grey">

                      <Button size = "massive" color = "grey" icon = "add to cart" onClick={this.addToWishlist}></Button>


                      <Label size = "large">{this.state.productName}</Label>

                      <Carousel>
                            <img width='200px' height='200px' src={this.state.URL1}/>
                            <img width='200px' height='200px' src={this.state.URL2}/>
                            <img width='200px' height='200px' src={this.state.URL3}/>
                            <img width='200px' height='200px' src={this.state.URL4}/>
                      </Carousel>

                  </Card>
                      <Button size = "massive" color = "grey" icon = "thumbs up" onClick={this.like}></Button>
                      <Button size = "massive" color = "grey" icon = "thumbs down" onClick={this.dislike}></Button>

             </div>
             <div className="footer">
           <p className="footer_text">Robert J Paul &emsp; Ziyao Li &emsp; Edbert Linardi &emsp; Bo Zheng &emsp; Hari Cheruvu</p></div>
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
