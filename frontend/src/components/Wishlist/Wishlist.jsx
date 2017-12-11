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
            products: []
        }
        this.logOut = this.logOut.bind(this);
        this.goProductPage = this.goProductPage.bind(this);
        this.delete = this.delete.bind(this);
        this.shop = this.shop.bind(this);
        //this.handleProp = this.handleProp.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    goProductPage(){

    }

    delete(e) {
        this.refresh();
        console.log(String(e.target.value));
        let id = String(e.target.value);
        // console.log(id+'delete from wishlist');
        var url = "http://localhost:3000/api/DB/12" + '/' + id;
      axios
                .delete(url)
                .then(response => {
                        console.log(String(id));
                });
      this.refresh();
    }

    refresh(){
        var url = "http://localhost:3000/api/DB/12";
      axios
                .get(url)
                .then(response => {
                        console.log(JSON.stringify(response.data.data));
                                this.setState({
                                    products:response.data.data
                                });
                });       
    }

    handleProp(props) {
          console.log('get email from props' + this.props.location.state.email);
           //return props.Empnumber;
     }


    logOut() {
        axios.get('/api/logout').then( (res) => {
            console.log("Logged out");
        })
    }

    shop(){
            console.log('shop button clicked');
         window.open('https://www.amazon.com/');
    }
     componentWillMount(){
            //let email = this.props.location.state.email;
            var url = "http://localhost:3000/api/DB/12";
      axios
                .get(url)
                .then(response => {
                        console.log(JSON.stringify(response.data.data));
                                this.setState({
                                    products:response.data.data
                                });
                });       
     }
     // componentDidMount(){
     //        //let email = this.props.location.state.email;
     //        var url = "http://localhost:3000/api/DB/12";
     //  axios
     //            .get(url)
     //            .then(response => {
     //                    console.log(JSON.stringify(response.data.data));
     //                            this.setState({
     //                                products:response.data.data
     //                            });
     //            });
     // }

    render() {
            return(
                <div>  
                    <h1>This is the wishlist page</h1>
                    <Link to="/" onClick={this.logOut}>
                            Log out
                    </Link>
                    <div>
                    <Link to="/dashboard" onClick={this.goProductPage}>
                            product page
                    </Link>


                    <div>
                        {this.state.products.map((item, index) => (

                           <div className="Wishlist" key={index} value={item} >
                                <p>{item}</p>
                                <button  value={item} onClick={this.delete}> delete </button>
                                <button  value={item} onClick={this.shop}> shop </button> 
                           </div>

                        ))}

                    </div>

  
                    </div>
                </div>

            )
        
    }
}

export default Wishlist