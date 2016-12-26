import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, Location } from 'react-router';

class Navigation extends Component {

    componentDidMount() {
        const { menu } = this.refs;
        $(menu).metisMenu();
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    secondLevelActive(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                    <ul className="nav metismenu" id="side-menu" ref="menu">
                        <li className="nav-header">
                            <div className="dropdown profile-element"> <span>
                             </span>
                                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                            <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">Example user</strong>
                             </span> <span className="text-muted text-xs block">Example position<b className="caret"></b></span> </span> </a>
                                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                    <li><a href="#"> Logout</a></li>
                                </ul>
                            </div>
                            <div className="logo-element">
                                IN+
                            </div>
                        </li>
                        <li className={this.activeRoute("/clientList")}>
                            <Link to="/clientlist"><i className="fa fa-th-large"></i> <span className="nav-label">查看客户</span></Link>
                        </li>
                        <li className={this.activeRoute("/itemList")}>
                            <Link to="/itemList"><i className="fa fa-th-large"></i> <span className="nav-label">查看收费项</span></Link>
                        </li>
                        <li className={this.activeRoute("/orderList")}>
                            <Link to="/orderList"><i className="fa fa-th-large"></i> <span className="nav-label">查看订单</span></Link>
                        </li>

                        <li className={this.activeRoute("/orderAdd")}>
                            <Link to="/orderAdd"><i className="fa fa-th-large"></i> <span className="nav-label"> 添加订单 </span></Link>
                        </li>

                        <li className={this.activeRoute("/prepaid")}>
                            <Link to="/prepaid"><i className="fa fa-th-large"></i> <span className="nav-label">充值</span></Link>
                        </li>
                    </ul>

            </nav>
        )
    }
}

export default Navigation