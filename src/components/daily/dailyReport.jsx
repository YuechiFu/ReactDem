import React from "react";
import DateFormat from "../dateFormat/dateFormat";
import "../../assets/style/daily.scss";
import Editor from "@components/daily/editor"
export default class DailyReport extends React.Component{
  constructor(){
    super();
    this.state ={

    }
  }
  render(){
    return(
      <Editor></Editor>
    )
  }
} 