import React from 'react';
import Progress from '../common/Progress';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import TopHeader from '../common/TopHeader';
import { correctHeight, detectBody } from './Helpers';
import LoginView from '../user/login';
import * as RequestUrl from "../../constants/request-url-constants";

class Main extends React.Component {
    constructor(props){
        super(props);
        this.getComponment = this.getComponment.bind(this);
        this.onLoginCallback = this.onLoginCallback.bind(this);
        this.onStatusCheck = this.onStatusCheck.bind(this);
        this.onLogoffCallback = this.onLogoffCallback.bind(this);
        this.state = {
            isLoggedIn:false,
        }
    }
    onLoginCallback(){
        this.setState({isLoggedIn:true});
    }
    onLogoffCallback(){
        this.setState({isLoggedIn:false});
    }
    onStatusCheck(){
        $.ajax({
            url:RequestUrl.GET_USER_STATE,
            type:"POST",
            data:{username:this.state.username, password:this.state.password},
            success:function (response) {
                console.log(response);
                if(response.result == true){
                    this.setState({isLoggedIn:true});
                }
                else{
                    this.setState({isLoggedIn:false});
                }
            }.bind(this)
        });
    }

    getComponment(){
        let wrapperClass = "white-bg " + this.props.location.pathname;
        if(this.state.isLoggedIn){
            return ( <div id="wrapper">
                <Progress />
                <Navigation location={this.props.location}/>
                <div id="page-wrapper" className={wrapperClass}>
                    <TopHeader logoff={this.onLogoffCallback} />
                    {this.props.children}
                    <Footer />
                </div>
            </div>)
        }
        else{
            return  (<LoginView callback={this.onLoginCallback}/>)
        }
    }
    render() {

        return (
            this.getComponment()
        )
    }
    componentDidMount() {
        this.onStatusCheck();
        // Run correctHeight function on load and resize window event
        $(window).bind("load resize", function() {
            correctHeight();
            detectBody();
        });

        // Correct height of wrapper after metisMenu animation.
        $('.metismenu a').click(() => {
            setTimeout(() => {
                correctHeight();
            }, 300)
        });
    }
}

export default Main
