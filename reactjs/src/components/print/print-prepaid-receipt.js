/**
 * Created by wangji on 12/28/2016.
 */
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import PrintDispatcher from '../../actions/print/print-creator';

export default class PrintPrepaidReceipt extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        $('body').addClass('white-bg');

    }

    componentWillUnmount(){
        $('body').removeClass('white-bg');
    }

    onCancel(){
        PrintDispatcher.PrintCompleteAction("");
    }
    render(){
        return <div>我要打印收据.<Button onClick={this.onCancel}>取消</Button></div>
    }
}