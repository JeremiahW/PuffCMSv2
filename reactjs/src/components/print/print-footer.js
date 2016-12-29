import React from 'react';


export default class ReceiptFooter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div>
            {this.props.comment}
        </div>)
    }
}