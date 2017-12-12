import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import styles from './styles.scss'

class Login extends Component {

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
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

        // create an AJAX request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    message: 'Successfully logged in!'
                })
                //this.props.history.push('/dashboard');




this.props.history.push({
                pathname: '/dashboard',
                state: { email: email },
                });


            } else {
                this.setState({
                    message: 'Email or password is incorrect'
                })
               // this.props.history.push('/dashboard');
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
            <div className="banner_green">
                <img src="https://ia601503.us.archive.org/18/items/neverknow_201712/neverknow.png"></img>
            </div>
            <form className="Login" action="/" onSubmit={this.onSubmit}>
                <div className="Login__content">
                    <div>

                        <h1>Home</h1>
                        <br/>
                        <Input label="&emsp;Email&emsp;" onChange={this.onChangeEmail} />
                        <br/><br/>
                        <Input label="Password" onChange={this.onChangePassword} />
                        <br/><br/>

                        <p>{this.state.message}</p>

                        <Input id="submit" type="submit" value = "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Login&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"/>
                        <br/>
                        <h4>New here? Click <Link to="/register">here</Link> to sign up!</h4>

                    </div>
                </div>
            </form>
            <div className="footer">
            <p className="footer_text">Robert J Paul &emsp; Ziyao Li &emsp; Edbert Linardi &emsp; Bo Zheng &emsp; Hari Cheruvu</p></div>
        </div>
    )
}
}

export default Login
