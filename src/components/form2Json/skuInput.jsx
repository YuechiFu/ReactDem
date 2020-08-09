import React from "react";
import Input from '@components/form/input';
export default class skuInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      skuData : {
        sku : '',
        title : ''
      }
    }
  }
  changeData(key,value){
   
    let obj = {...this.state.skuData};
    obj[key] = value || '';
    this.setState({skuData : obj })
    this.props.change(obj);
  }
  deleteItem(){
    this.props.delete();
  }
  render(){
    return(
      <div className="sku-input-relate">  
        <div className="seq">{this.props.index + 1}</div>
        <div className="sku-input">
          <Input 
            onChange = {this.changeData.bind(this,'sku')}
            value={this.props.value.sku}
            placeholder="输入sku"
          />   
        </div>
        <div className="product-title-input">
          <Input 
            onChange = {this.changeData.bind(this,'title')}
            value={this.props.value.title}
            placeholder="输入标题"
          />   
        </div>
        <div className="del btn" onClick = {this.deleteItem.bind(this)} > 删除 </div>
      </div> 
    )
  }
}
