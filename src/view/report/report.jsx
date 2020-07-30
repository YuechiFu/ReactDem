import "@style/report.scss"
import React from "react";
import Editor from '@components/report/editor.jsx';
export default class Report extends React.Component{
    constructor(){
        super();

    }
    render(){
        return(<Editor></Editor>)
    }
}