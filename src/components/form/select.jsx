import React from "react";
export default class Input extends React.Component{
    constructor(props){
        super(props);
    }
    changeValue(e){
        let val = e.target.value || ''  ;
        this.props.onChange(val)
    }
    render(){
        return(
            <div className="input-box">
                <select type="text" className="select-ele input-ele"  
                    value={this.props.value} 
                    onChange={this.changeValue.bind(this,false)}
                    id={this.props.id || ''}
                >
                     {
                        this.props.options && this.props.options.length > 0 && 
                        this.props.options.map((item,index)=>{
                            return( <option value={item.value} key={index}>{item.title}</option>)
                        })
                    }
                </select>
            </div>
        )
    }
    
}