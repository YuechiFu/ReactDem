import React from "react";  
import Main from "@view/main/main"
import Report from "@view/report/report";
import Form2Json from "@view/form2Json/form2Json";
class App extends React.Component{
  // eslint-disable-next-line 
  constructor(){
    super(); 
  }
  remInit(){
    let width = document.documentElement.getBoundingClientRect().width;
    let size ;
    if(width <= 375) size = 100
    if(width > 375)  size = width / 375 * 100
    if(width > 768)  size = width / 768 * 100
    if(width > 1200) size = width / 1200 * 100
    document.documentElement.style.fontSize = size   + "px"
  }
  setMeta(){
    let meta  = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
   if(document.head.querySelector("meta[name='viewport']")){
    document.head.querySelector("meta[name='viewport']").content = meta.content;
   }else{
    document.head.appendChild(meta)
   }
  }
  render(){
    let self = this ;
    this.remInit();
    this.setMeta();
    window.addEventListener("resize",self.remInit);

    return(
      // <Main></Main>
      // <Report> </Report>
      <Form2Json></Form2Json>
    )
  }
}
export default App;