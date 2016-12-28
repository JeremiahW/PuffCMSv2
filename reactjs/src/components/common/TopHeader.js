import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { smoothlyMenu } from '../layouts/Helpers';
import * as RequestUrl from "../../constants/request-url-constants";
import cookie from 'react-cookie';

class TopHeader extends React.Component {
    constructor(props){
        super(props);
        this.onLogOff = this.onLogOff.bind(this);

    }
    toggleNavigation(e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }

    onLogOff(){
        console.log("onLogOff");
        $.ajax({
            url:RequestUrl.USER_LOG_OUT,
            type:"POST",
            data:{token:cookie.load('token') },
            success:function (response) {
                console.log(response);
                cookie.remove('token', { path: '/' });
                this.props.logoff();
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top white-bg" role="navigation" style={{marginBottom: 0}}>
                    <div className="navbar-header">
                        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " onClick={this.toggleNavigation} href="#"><i className="fa fa-bars"></i> </a>
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li>
                            <a href="#">
                                <i className="fa fa-sign-out"></i> <Button onClick={this.onLogOff}>Log out</Button>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default TopHeader