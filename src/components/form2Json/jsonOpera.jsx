import React from  "react"
import ClipBoard from "clipboard";


export default class JsonOpera extends React.Component{
  constructor(props){
    super(props)
  }
  

  componentDidMount(){
    new ClipBoard('.copy-json-data');
  }

  render(){
    return(
      <div className="json-opera-box">
        <div className="copy-json-data btn"
          data-clipboard-action="copy" 
          data-clipboard-target="#copy-json-target" 
        >COPY</div>
      </div>
    )
  }
}