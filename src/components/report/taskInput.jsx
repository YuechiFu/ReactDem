import React from "react";
import Input from '@components/form/input';
import Select from '@components/form/select';
export default class taskInput extends React.Component{
    constructor(){
        super();
        this.state ={
            taskTitle : "",
            timer:0,
            subTasks:[],
        }
    }
    inputTaskTitle(value){
        console.log(value)
        this.setState({taskTitle:value})
    }
    addSubtask(index,value){
        let val = ''
        let arr = this.state.subTasks.slice();
        if( index >= 0){
            val = value || ''
            arr[index] = val;
        }else{
            arr.push(val)
        }
        this.setState({ subTasks : arr})
        console.log(this.state.subTasks)
    }
    render(){
        return(
            
            <div className="task-input-box">
                <div className="task-title-input">
                   <Input 
                    value={this.state.taskTitle}
                    onChange = {this.inputTaskTitle.bind(this)}
                    id="task-title-input-#3231312"
                   ></Input>
                </div>
                <div className="task-timer">
                    <Select></Select>
                </div>

                {   
                    this.state.subTasks.length >0 && 
                    <div className="sub-task-input-box">
                        <div className="sub-task-input">
                            {this.state.subTasks.map((value,index)=>{
                                return(<Input 
                                    value={value} 
                                    onChange = {this.addSubtask.bind(this,index)}></Input> )
                            })}
                        </div>
                    </div>
                }
                <div className="add-subtask-box">
                    <div className="add-subtask-btn btn" onClick={this.addSubtask.bind(this,-1)}>+</div>
                </div>
               
                
            </div>

        )
    }
}