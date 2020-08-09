import React from "react";
import SkuForm from "@components/form2Json/skuForm"
import AddSkuBtn from "@components/form2Json/addSkuItem"
import JsonOpera from "@components/form2Json/jsonOpera"
import JsonContent from "@components/form2Json/jsonContent"

import "@style/form2Json.scss"
export default class form2Input extends React.Component{
  constructor(){
    super();
    this.state={
      skuList:[{
        sku : "",
        title : ""
      }],
    }
  }
  changeFormData(skuList){  
    this.setState({skuList:skuList})
  }
  addSkuItem(arr){
    console.log(arr)
    this.setState({skuList : [...this.state.skuList,...arr]})
  }

 
  render(){
    return(
      <div className="page-wrapper">
          <SkuForm
            skuList = {this.state.skuList}
            change = {this.changeFormData.bind(this)}
          ></SkuForm>
          <JsonContent skuList = {this.state.skuList}></JsonContent>
          <div className="bottom-box">
            <AddSkuBtn onClick = {this.addSkuItem.bind(this)}></AddSkuBtn>
            <JsonOpera></JsonOpera>
          </div>
      </div>
    )
  }
}
