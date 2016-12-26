/**
 * Created by wangji on 12/22/2016.
 */

import React from "react";

export default class ResultHeader extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <thead>
            <tr>
                <td>项目</td>
                <td>价格</td>
                <td>实收价格</td>
                <td>数量</td>
                <td>单位</td>
                <td>备注</td>
                <td></td>
            </tr>
            </thead>
        )
    }
}