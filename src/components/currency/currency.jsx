import React from "react";
import "../../assets/style/common.scss";
import CurrencyInput from './currecyInput'
export default  class Demo1 extends React.Component{
    constructor(){
        super();
        this.state ={
            currencyValue : 0,
            resultValue:0,
            currencyList:{
                usd : {
                    symbol : "$",
                    code:"usd",
                    rate:7.0,
                },
                cny:{
                    symbol : "¥",
                    code:"cny",
                    rate : 1.0
                }
            }
        }
    }
    handleChange(value,key){
         this.setState({resultValue:value})
        value = parseFloat(value);
        let rate = parseFloat(this.state.currencyList[key]["rate"]);
        let result = parseFloat(value*rate);
        if(!isNaN(result)){
            result = this.state.currencyList[key]["symbol"] + result;
            this.setState({resultValue:result})
        }

        // this.setState({resultValue:result})
    }
    render(){
        return(
            <div className='page-wrapper'>  
                <h3>汇率换算</h3>
                {
                    Object
                    .values(this.state.currencyList)
                    .map((item,index)=>{
                        return (
                            <CurrencyInput 
                                currency = {item}
                                onCurrencyInputChange={this.handleChange.bind(this)}
                                inputValue={this.state.resultValue}
                                key = {index}
                            ></CurrencyInput>
                        )
                    })
                }
            </div>
        )
    }
}