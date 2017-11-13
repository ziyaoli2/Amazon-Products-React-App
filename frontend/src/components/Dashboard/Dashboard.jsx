import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        }
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

    render() {

        if (this.state.isLoggedIn) {
            return(
                <div className="Dashboard">
                    <Card>
                        <h1>Welcome to the App!</h1>
                        <p>You are now logged in.</p>
                    </Card>
                </div>
            )
        } else {
            return(
                <div className="Dashboard">
                    <Card>
                        <h1>You must log in before you can see this page.</h1>
                    </Card>
                </div>
            )
        }
    }
}

export default Dashboard
