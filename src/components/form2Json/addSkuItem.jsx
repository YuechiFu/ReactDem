import React from "react";
import Select from '@components/form/select';
export default class form2Input extends React.Component{
  constructor(props){
    super(props);
    this.state = {qty:1}
  }
  changeQty(val){
    this.setState({qty:parseInt(val) || 1 })
  }
  addSkuInput(){
    let qty = this.state.qty;
    this.props.onClick(
      new Array(qty).fill({
      sku : "",
      title : ""
    }))
  }

  render(){
    return(
      <div className="add-sku-input-box">
        <div className="add-sku-input-btn btn-box">
          <div className="btn" onClick={this.addSkuInput.bind(this)}>新增</div>
        </div>
        <div className="add-qty-select">
          <Select 
            value = {this.state.qty}
            onChange = {this.changeQty.bind(this)}
            options={ new Array(10).fill('').map((value,index)=>{
              return {
                value : parseInt(index + 1),
                title : index + 1
              }
            })
          }
          ></Select>
        </div>
    </div>
    )
  }
}
