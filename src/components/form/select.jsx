import React from "react";
export default class Input extends React.Component{
    constructor(props){
        super(props);
    }
    changeValue(e){
        let val = e.target.querySelector("option:checked").value || ''  ;
        this.props.onChange(val)
    }
    render(){
        return(
            <div className="select-box">
                <select type="text" className="select-ele "  
                    value={this.props.value}
                    onChange={this.changeValue.bind(this)}
                    id={this.props.id || ''}
                >
                     {
                        this.props.options && this.props.options.length > 0 && 
                        this.props.options.map((item,index)=>{
                            return( 
                                <option value={item.value} key={index}>{item.title}</option>)
                        })
                    }
                </select>
            </div>
        )
    }
    
}