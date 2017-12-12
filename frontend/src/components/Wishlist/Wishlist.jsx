import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link, BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { Router} from 'react-router';


import styles from './styles.scss'

class Wishlist extends Component {
  constructor(props) {
      super(props);
      this.state = {
          isLoggedIn: false,
          products: this.props.location.state.products,
          productAll:[],
          singleProduct: {
              id: "",
              image: "",
              URL:"",
          },
          obj: []
      }
      this.logOut = this.logOut.bind(this);
      this.goProductPage = this.goProductPage.bind(this);
      this.delete = this.delete.bind(this);
      this.shop = this.shop.bind(this);
      //this.handleProp = this.handleProp.bind(this);
      this.refresh = this.refresh.bind(this);
      this.test = this.test.bind(this);

  }

  test(){
      console.log(this.state.productAll);
  }
  goProductPage(){

       //e.preventDefault();
       let email = encodeURIComponent(this.props.location.state.email);
       this.props.history.push({
                               pathname: '/dashboard',
                               state: { email: email },
                               });

  }



  delete(item){
  const newState = this.state.obj;
  if (newState.indexOf(item) > -1) {
    newState.splice(newState.indexOf(item), 1);
    this.setState({obj: newState})
  }
      let id = String(item.id);
      // console.log(id+'delete from wishlist');
      var url = "/api/DB/" + String(this.props.location.state.email) + '/' + id;
       axios
              .delete(url)
              .then(response => {
                      console.log(String(id));
              });


}

  refresh(tempObj){
      this.setState({obj:tempObj});
  }


  logOut() {
      axios.get('/api/logout').then( (res) => {
          console.log("Logged out");
      })
  }

  shop(object){
       //let URL = String(e.target.);

       console.log(object.URL);
       window.open(object.URL);
  }


   componentWillMount(){
     // let productAll = this.state.productAll;
      //let temp = [];
      let array = this.state.products;
      //let singleProduct = this.state.singleProduct;
      for (var i =0; i< array.length; i++){
          //console.log('########################')
          console.log(array[i]);
          let id = array[i];

          if(id[0]=='B'){
              var url = "/itemLookup" + '/' + String(id);
          axios
                  .get(url)
                  .then(response => {

                          let image = response.data[0].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
                          let URL = response.data[0].DetailPageURL[0];

                                  const productAll = this.state.productAll;
                                  productAll[id] = {id: id, image: image, URL:URL};
                                  this.setState(productAll);

                           console.log('product all 1');
                           console.log(this.state.productAll);
                           let dictionary = this.state.productAll;
                           var values = Object.keys(dictionary).map(function(key){
                              return dictionary[key];
                          });
                           console.log(JSON.stringify(values));
                           this.setState({obj:values});
                           console.log(this.state.obj);
                  });

          }

      }
      //this.setState({productAll:temp});
      //this.setState({productAll});
      console.log('product all 2');
          console.log(JSON.stringify(this.state.productAll));

   }



  render() {

      const listItems = this.state.obj.map((p, i) =>

              <div  key={i} >
                  <img width='200px' height='200px' src={p.image}/>
                  <button onClick={this.shop.bind(this,p)}> shop</button>
                  <button onClick={this.delete.bind(this,p)}> delete</button>
              </div>

          );


          return(
              <div>
                  <h1>This is the wishlist page</h1>
                  <Link to="/" onClick={this.logOut}>
                          Log out
                  </Link>
                  <div>
                  <button onClick={this.goProductPage}> Product Page </button>
                  <button onClick={this.test}> test </button>
                  <div>

                  {listItems}

                  </div>


                  </div>
              </div>

          )

  }
}

export default Wishlist
