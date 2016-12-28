import React from 'react';
import Progress from '../common/Progress';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import TopHeader from '../common/TopHeader';
import { correctHeight, detectBody } from './Helpers';
import LoginView from '../user/login';
import PrintOrderView from '../print/print-order';
import PrintPrepaidReceiptView from '../print/print-prepaid-receipt';
import PrintStore from '../../stores/print/print-store';

import {ModuleConstants} from '../../constants/module-constants';

import * as RequestUrl from "../../constants/request-url-constants";
import cookie from 'react-cookie';

class Main extends React.Component {
    constructor(props){
        super(props);
        this.getComponment = this.getComponment.bind(this);
        this.onLoginCallback = this.onLoginCallback.bind(this);
        this.onStatusCheck = this.onStatusCheck.bind(this);
        this.onLogoffCallback = this.onLogoffCallback.bind(this);

        this.onPrintOrderCallback = this.onPrintOrderCallback.bind(this);
        this.onPrintReceiptCallback = this.onPrintReceiptCallback.bind(this);
        this.onPrintCompleted = this.onPrintCompleted.bind(this);

        this.getMain = this.getMain.bind(this);

        this.state = {
            module:ModuleConstants.LOGIN,
        }
    }

    onLoginCallback(){
        this.setState({ module:ModuleConstants.MAIN});
    }

    onLogoffCallback(){
        this.setState({ module:ModuleConstants.LOGIN});
    }

    onStatusCheck(){
        console.log("onStatusCheck");
        $.ajax({
            url:RequestUrl.GET_USER_STATE,
            type:"POST",
            data:{token:cookie.load('token')},
            success:function (response) {
                console.log(response);
                if(response.result == true){
                    this.setState({ module:ModuleConstants.MAIN});
                }
                else{
                    this.setState({ module:ModuleConstants.LOGIN});
                }
            }.bind(this)
        });
    }

    onPrintOrderCallback(){
        this.setState({module:ModuleConstants.PRINT_ORDER});
    }
    onPrintReceiptCallback(){
        this.setState({module:ModuleConstants.PRINT_PREPAID_RECEIPT});
    }
    onPrintCompleted(){
        this.setState({module:ModuleConstants.MAIN});
    }

    getComponment(){
        var compomenet;
        switch (this.state.module){
            case ModuleConstants.MAIN:
                compomenet = this.getMain();
                break;
            case ModuleConstants.PRINT_ORDER:
                compomenet = (<PrintOrderView />);
                break;
            case ModuleConstants.PRINT_PREPAID_RECEIPT:
                compomenet = (<PrintPrepaidReceiptView />);
                break;
            case ModuleConstants.LOGIN:
                compomenet = (<LoginView callback={this.onLoginCallback}/>);
                break;
            default:
                compomenet = (<LoginView callback={this.onLoginCallback}/>);
                break;
        }
        return compomenet;
    }
    getMain(){
        let wrapperClass = "white-bg " + this.props.location.pathname;
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
    render() {
        return (
            this.getComponment()
        )
    }

    componentDidMount() {
        this.onStatusCheck();

        PrintStore.addPrintOrderListener(this.onPrintOrderCallback);
        PrintStore.addPrintPrepaidReceiptListener(this.onPrintReceiptCallback);
        PrintStore.addPrintCompletedListener(this.onPrintCompleted);

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

    componentWillUnmount(){
        PrintStore.removePrintOrderListener(this.onPrintOrderCallback);
        PrintStore.removePrintCompletedListener(this.onPrintReceiptCallback);
        PrintStore.removePrintPrepaidReceiptListener(this.onPrintCompleted);
    }
}

export default Main
