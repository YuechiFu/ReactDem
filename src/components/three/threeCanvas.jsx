import React from "react";
import react from "react/cjs/react.development";
import init3D from "@controls/font";
export default class extends React.Component{
  constructor(){
    super();
    this.state = {
      inputVal:""
    }

  }
  changeVal(e){
    this.setState({
      inputVal:e.target.value
    })
  }
  componentDidUpdate(){
    console.log(document.getElementById("3d-canvas"));
    init3D(this.state.inputVal);
  }
  componentDidMount(){
    console.log(document.getElementById("3d-canvas"))
    init3D(this.state.inputVal);
  }
  render(){
    return( 
      <div className="three-container">
        <div id="3d-canvas" style={{'width':'100%','height':'100px','margin':'0 auto'}}></div>
        <input type="text" onBlur={this.changeVal.bind(this)}/>
      </div>
      
    )
  }
}