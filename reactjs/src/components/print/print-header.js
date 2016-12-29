import React from 'react';

export default class ReceiptHeader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div>
            {this.props.batchId}
        </div>)
    }
}