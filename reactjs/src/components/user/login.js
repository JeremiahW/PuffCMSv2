/**
 * Created by wangji on 12/27/2016.
 */
import React from 'react';
import {Button} from 'react-bootstrap';
import * as RequestUrl from "../../constants/request-url-constants";

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.onBtnSubmit = this.onBtnSubmit.bind(this);
        this.state = {
            username:"",
            password:""
        }
    }

    componentDidMount(){
        $('body').addClass('white-bg');
    }

    componentWillUnmount(){
        $('body').removeClass('white-bg');
    }

    onBtnSubmit(){
        $.ajax({
            url:RequestUrl.POST_USER_LOGIN,
            type:"POST",
            data:{username:this.state.username, password:this.state.password},
            success:function (response) {
                if(response.result == true){
                    console.log(response);
                    this.props.callback();
                }
            }.bind(this)
        });
    }

    handleChange(name, event) {
        var newState = {};
        newState[name] = event.target.value;
        this.setState(newState);
    }
    render(){
        return (<div className="middle-box text-center loginscreen animated fadeInDown">
            <div>

                <h3>PuffCMS客户及订单管理系统</h3>
                 <p></p>
                    <form className="m-t" role="form" >
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username" required="" onChange={this.handleChange.bind(this, "username")}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" required=""onChange={this.handleChange.bind(this, "password")}/>
                        </div>
                        <Button className="btn btn-primary block full-width m-b" onClick={this.onBtnSubmit}>登录</Button>
                    </form>
                <p className="m-t"> <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small> </p>
            </div>
        </div>)
    }
}