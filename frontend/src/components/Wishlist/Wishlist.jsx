import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'


import styles from './styles.scss'

class Wishlist extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            products: [1,2,3,4,5]
        }

        this.logOut = this.logOut.bind(this);
        this.goProductPage = this.goProductPage.bind(this);
        this.delete = this.delete.bind(this);
        this.shop = this.shop.bind(this);
    }
    goProductPage(){

    }
    delete(){
        console.log("item deleted");
    }
    shop(){

        console.log("go to shop page");
    }
    logOut() {
        axios.get('/api/logout').then( (res) => {
            console.log("Logged out");
        })
    }


    // displayBasics() {
    //     let resultsArray = [item1, item2, item3, item4, item5];

    //     this.state.Basics.map((Basic, i) => {
    //       resultsArray.push(
    //         <div className="col-md-6 col-md-offset-3">
    //           <div className="thumbnail">
    //             <div className="caption">
    //               <h3>{Basic.title}</h3>
    //               <h3>{Basic.numberOfPeople}</h3>
    //               <h3>{Basic.contact}</h3>
    //               <p>{Basic.comment}</p>
    //               <div className="Wishlist">
    //                         <button onClick={this.delete}> delete </button>
    //                         <button onClick={this.shop}> shop </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         );
    //     });

    //     return resultsArray;
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

                            {this.state.products.map((product, index) => (

                                <div className="Wishlist">
                                <p>Item: {product}</p>
                                <button onClick={this.delete}> delete </button>
                                <button onClick={this.shop}> shop </button> 
                                </div>
                            ))}
                    
                             
                    </div>

                        
                    </div>
                </div>

            )
        
    }
}

export default Wishlist