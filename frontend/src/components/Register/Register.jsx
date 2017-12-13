import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router'

import styles from './styles.scss'


class Register extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                password: '',
                email: ''
            },

            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        // create a string for an HTTP body message
        const name = encodeURIComponent(this.state.user.username);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `name=${name}&email=${email}&password=${password}`;

        // create an AJAX POST request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/register');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log('The form is valid');
                this.setState({
                    message: 'Registered!'
                })
                //this.props.history.push('/dashboard');
                this.props.history.push({
                                pathname: '/dashboard',
                                state: { email: email },
                                });
            } else {
                this.setState({
                    message: 'The email you have entered is already registered'
                })
            }
        });
        xhr.send(formData);
    }

    onChangeEmail(e) {
        const user = this.state.user;
        user.email = e.target.value;
        this.setState({
            user
        })
    }

    onChangePassword(e) {
        const user = this.state.user;
        user.password = e.target.value;
        this.setState({
            user
        })
    }

    render() {
        return(
            <div>
                <div className="pre_banner"></div>
                <div className="banner_blue">
                    <img src="https://ia601503.us.archive.org/18/items/neverknow_201712/neverknow.png"></img>
                </div>
                <form className="Register" action="/" onSubmit={this.onSubmit}>
                    <div className="Register__content">
                        <div>
                            <h1>Register</h1>
                            <br/>
                            <Input label="&emsp;Email&emsp;" onChange={this.onChangeEmail} />
                            <br/><br/>
                            <Input label="Password" type="password" onChange={this.onChangePassword} />
                            <br/><br/>
                            <p>{this.state.message}</p>
                            <Input id = "submit" type="submit" value = "&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Sign Up&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;"/>
                            <h4>Already registered? Click <Link to="/login">here</Link> to Login!</h4>


                        </div>
                    </div>
                </form>
                <div className="footer">
                <p className="footer_text">Robert J Paul &emsp; Ziyao Li &emsp; Edbert Linardi &emsp; Bo Zheng &emsp; Hari Cheruvu</p></div>
            </div>
    )
}
}

export default Register
