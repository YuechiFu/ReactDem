import React from "react";
import DateFormat from "../dateFormat/dateFormat";
import "@style/daily.scss";
import ClipBoard from "clipboard";
export default class Editor extends React.Component{
    constructor(props){
        super();
        this.state = {
                isVisible : false,
                date:"",
                isDelay : false ,
                delayReason : "",
                list:[{
                    title : "",
                    time : 0,
                    subtasks : [],
                    results : [],
                    resultContent : ''
                }],
                submitTime :"",
        }
    }
    componentDidMount(){
       
    }
    onDelayRadio(e,isDelay){
        console.log(isDelay)
        this.setState({isDelay:e.target.value})
    }
    onDelayReasonInput(e){
        this.setState({delayReason:e.target.value})
    }
 
    onTaskModify(keyword,item,index,isInput,e){
        let list  = [...this.state.list];
        list[index][keyword] = isInput ?  e.target.value : '' ;
        this.setState({list}) 
    }
    onSubtaskTitleInput(item,index,subIndex,isInput,e){
        let list  = [...this.state.list];
        list[index]["subtasks"][subIndex]["title"] = isInput ?  e.target.value : '' ;
        this.setState({list})
    }
    onDeleteTask(item,index,e){
        let list = [...this.state.list]
        list.splice(index,1);
        this.setState({list})
    }
    onAddTask(){
        let list = [...this.state.list];
        list.push({
            title : "",
            time : 0,
            subtasks : [],
            results : [],
            resultContent : ''
        })
        this.setState({list});
        
    }
    onDeleteSubtask(item,index,subIndex){
        let list = [...this.state.list];
        list[index]["subtasks"].splice(subIndex,1);
        this.setState({list})
    }
    onDAddSubtask(index){
        let list = [...this.state.list];
        list[index]["subtasks"].push({title:""});
        this.setState({list})
    }
    showContent(){
        this.setState({isVisible:!this.state.isVisible})
    }
    componentDidMount(){
        new ClipBoard('.copy-task-contents');}
    render(){
        return(
            <div className="page-wrapper" >
                <div className="task-form-box">
                    <div className="task-form">
                        <div className="form-item delay-radio">
                            <div className="form-item-wrapper">
                                <div className="item-input">
                                    <div className="input-box">
                                        <label htmlFor="task-finish" className={this.state.isDelay ? "" : "checked"}>finished</label>
                                        <input  type="radio"         
                                                className="radio-ele" 
                                                name="delay" 
                                                value = {''}
                                                id = "task-finish"
                                                onChange = {this.onDelayRadio.bind(this)}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="task-delay" className={this.state.isDelay ? "checked" : ""}>delay</label>
                                        <input  type="radio"         
                                                className="radio-ele" 
                                                name="delay" 
                                                value = {true}
                                                id = "task-delay"
                                                onChange = {this.onDelayRadio.bind(this)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.isDelay && 
                            <div className="form-item delay-reason-input">
                                <div className="form-item-wrapper">
                                    <div className="item-input">
                                        <div className="input-box">
                                            <textarea 
                                                name="delay-reason" 
                                                className="input-ele" 
                                                id="delay-reason" 
                                                placeholder="" 
                                                onChange={this.onDelayReasonInput.bind(this)}
                                                value={this.state.delayReason}
                                                >
                                                
                                            </textarea>
                                            task.delayReason.length && <div className="clear-btn" onClick = {()=>this.setState({delayReason:''})}>x</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="form-task-list-input-box">
                            <div className="form-task-list-input">
                                {
                                   this.state.list.map(function(item,index){
                                        return (
                                            <div className="form-item task-list-item" key={'form-task-'+index}>
                                                <div className="form-item-wrapper">
                                                    <div className="item-input">
                                                        <div className="input-box">
                                                            <input type="text" className="task-title-input input-ele"
                                                            id={'task'+index+'title'}
                                                            placeholder={'task '+(index+1)+' title'}
                                                            value={item.title}
                                                            onChange = {this.onTaskModify.bind(this,'title',item,index,true)}
                                                            />
                                                            item.title.length && <div className="clear-btn" onClick = {this.onTaskModify.bind(this,'title',item,index,false)}>x</div>
                                                        </div>
                                                        <div className="input-box">
                                                            <input type="text" 
                                                                    className="task-time-input input-ele" 
                                                                    id={'task-'+index+'-time-input'}
                                                                    value={item.time}
                                                                    onChange = {this.onTaskModify.bind(this,'time',item,index,true)}
                                                                    placeholder={'task '+index+' spend'}
                                                                    />
                                                            <select 
                                                                name={'task-'+index+'-time'}
                                                                className="select-ele"
                                                                id={'task-'+index+'-time-select'}
                                                                value={item.time}
                                                                onChange={this.onTaskModify.bind(this,'time',item,index,true)}
                                                                >
                                                                <option value={0}  disabled>0 h</option>
                                                                {
                                                                    new Array(24).fill('').map((op,h)=>(<option key={h} value={(h+1)*0.5}> {(h+1)*0.5}h </option> ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="input-box">
                                                            <textarea 
                                                                className="task-content-input input-ele" 
                                                                id={'task-'+index+'-content'}
                                                                value={item.resultContent}
                                                                onChange={this.onTaskModify.bind(this,'resultContent',item,index,true)}
                                                            ></textarea>
                                                            item.resultContent.length && <div className="clear-btn" onClick = {this.onTaskModify.bind(this,'resultContent',item,index,false)}>x</div>
                                                        </div>
                                                        {   item.subtasks.length && 
                                                            <div className="subtask-input-list-box">
                                                                <div className="subtask-input-list">
                                                                    {item.subtasks.map((subItem,subIndex)=>(
                                                                        <div className="subtask-input-item" key={'subtask-input-'+subIndex}>
                                                                            <div className="subtask-input input-box">
                                                                                <input type="text"          
                                                                                    className="subtask-input-ele input-ele" 
                                                                                    id={'task-'+index+'-subtask-'+subIndex}
                                                                                    placeholder={'subtask-'+(subIndex+1) }
                                                                                    value={subItem.title}
                                                                                    onChange={this.onSubtaskTitleInput.bind(this,item,index,subIndex,true)}
                                                                                />
                                                                                subItem.title.length && <div className="clear-btn" onClick = {this.onSubtaskTitleInput.bind(this,item,index,subIndex,false)}>x</div>
                                                                            </div>
                                                                            <div className="btn-box">
                                                                                <div className="delete-btn btn" onClick={this.onDeleteSubtask.bind(this,item,index,subIndex)}></div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            
                                                        }
                                                         <div className="btn-box add-subtask"><div className="btn add-subtask-btn" onClick={this.onDAddSubtask.bind(this,index)}>+</div></div>
                                                    </div>
                                                    <div className="task-delete-btn  btn" onClick={this.onDeleteTask.bind(this,item,index)}>x</div>
                                                </div>
                                            </div>
                                        ) 
                                   }.bind(this))
                                }
                               
                            </div>
                            <div className="btn-box add-task">
                            <div className="add-task-btn btn" onClick={this.onAddTask.bind(this)}>add a new task</div>
                        </div>
                        </div>
                    </div>
                </div>
            
                <div  className={this.state.isVisible ?'visible task-format-content-box':'task-format-content-box' }>
                    <div className="task-format-content" id="task-contents">
                        <div className="content-wrapper">
                            <h2 className="task-date"><DateFormat format="yyyy-MM-dd"></DateFormat> <span>{this.state.isDelay ? '需延期' : '无延期'}</span></h2> 
                            <div className="delay-reason-info">
                                {this.state.isDelay && <span>延期原因:</span> }
                                {this.state.delayReason && <span>{this.state.delayReason}</span>}
                            </div>
                            <p>——————————————————</p>
                            <div className="task-list-content-box">
                                <div className="task-list-content">
                                    {
                                        this.state.list.map((item,index)=>(
                                            <div className="task-item-content"
                                                key={index}
                                                data-index={index}
                                            >
                                                <h3 className="task-item-title">◉ 任务 {index+1} : <span></span>{item.title}</h3>
                                                <div className="task-item-time" >◉ 耗时<span> : </span>{item.time}h</div>
                                                <div className="task-item-result">
                                                    <span>◉ 量化产出 : {item.resultContent}</span>
                                                    {item.subtasks.length > 0 && <ul>
                                                    <p><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>-------</p>
                                                        {
                                                            item.subtasks.map((subItem,subIndex)=>(
                                                                <li key={'p'+subIndex}>
                                                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                                    <span>{subIndex+1}.</span>
                                                                    <span >{subItem.title}</span>
                                                                </li>
                                                            ))
                                                        }
                                                    
                                                    </ul>
                                                    }
                                                    <p style={{'overflow':'hidden'}}>——————————————————</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    </div>
                
                
                <div 
                    className="copy-btn copy-task-contents btn" 
                    data-clipboard-action="copy" 
                    data-clipboard-target="#task-contents" 
                    onClick={this.showContent.bind(this)}
                    >copy</div> 
                <div className="showContent-btn btn" onClick={this.showContent.bind(this)}>{this.state.isVisible ? 'hide' : 'show'}</div>

            </div>
        )
    }
}