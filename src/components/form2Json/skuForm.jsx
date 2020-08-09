import React from "react";
import SkuInput from "@components/form2Json/skuInput"
export default class form2Input extends React.Component{
  constructor(props){
    super(props);
  }
  changeSkuData(index,newVal){
    let arr = [...this.props.skuList];
    arr[index] = newVal;
    this.props.change(arr)
  }
  deleteSkuItem(index){
    let arr = [...this.props.skuList];
    arr.splice(index,1)
    this.props.change(arr)
  }

  render(){
    return(
        <div className="form-box">
          <form className="sku-relate-form">
            <div className="sku-input-list">
              {this.props.skuList && this.props.skuList.map((value,index)=>{
                return(
                  <SkuInput
                    index = {index}
                    value = {value}
                    change = {this.changeSkuData.bind(this,index)}
                    delete = {this.deleteSkuItem.bind(this,index)}
                    key = {index}
                  ></SkuInput>
                )
              })}
            </div>
          </form>
        </div>
    )
  }
}
