import React from "react";
export default class Input extends React.Component{
    constructor(props){
        super(props);
    }
    changeValue(isClear,e){
        let val = isClear ? '' : e.target.value  ;
        val = val.replace(/^\s+|\s+$/,'');
        this.props.onChange(val)
    }
    render(){
        return(
            <div className="input-box">
                {
                    (!this.props.nodeName || this.props.nodeName == 'input') && 
                    <input type="text" className="input-ele"  
                        value={this.props.value} 
                        onChange={this.changeValue.bind(this,false)}
                        id={this.props.id||''}
                        placeholder = {this.props.placeholder || ''}
                    />
                }

                {
                    this.props.nodeName == 'textarea' && 
                    <textarea type="text" className="input-ele"  
                        value={this.props.value} 
                        onChange={this.changeValue.bind(this,false)}
                        id={this.props.id || ''}
                        placeholder = {this.props.placeholder || ''}
                    ></textarea>
                }
               
                <span className="clear-btn" onClick={this.changeValue.bind(this,true)}>clear</span>
            </div>
        )
    }
    
}