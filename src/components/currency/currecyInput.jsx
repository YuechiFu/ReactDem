import React from  "react";
export default class Child extends  React.Component {
    constructor(){
        super();
        
    }
    handleChange(e){
        this.props.onCurrencyInputChange(e.target.value,this.props.currency.code)
    }
    computeCurrency(){
        let inputValue = parseFloat(this.props.inputValue);
        let rate = parseFloat(this.props.currency.rate);
        return parseFloat(inputValue * rate); 
    }
    render(){
        return (
            <div className="currencyInputItem">
                <span>{this.props.currency.code}</span>
                <div className="input-box">
                <input 
                    className="input-ele"  
                    value={this.computeCurrency()}
                    onChange={this.handleChange.bind(this)}
                    />
                </div>
            </div>
            
        )
    }
}