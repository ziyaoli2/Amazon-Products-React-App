import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

class Home extends Component {
    render() {
        return(
            <div>
            <div className="pre_banner"></div>
            <div className="banner_green">
                <img src="https://ia601503.us.archive.org/18/items/neverknow_201712/neverknow.png"></img>
            </div>
            <div className="Home">
                <div>
                    <h1>Welcome to neverknow!</h1>

                    <span>
                        <Link to="/login">
                            <Button>
                                Login
                            </Button>
                        </Link>

                        <Link to="/register">
                            <Button>
                                Register
                            </Button>
                        </Link>
                    </span>

                    <br />
                </div>
            </div>
            <div className="footer">
            <p className="footer_text">Robert J Paul &emsp; Ziyao Li &emsp; Edbert Linardi &emsp; Bo Zheng &emsp; Hari Cheruvu</p></div>

            </div>
        )
    }
}

export default Home
