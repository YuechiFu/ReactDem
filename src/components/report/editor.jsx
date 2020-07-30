import React from  'react';
import TaskInput from '@components/report/taskInput';
export default class Editor extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="editor-box">
                <div className="editor-container">
                    <form action="" className="report-editor-form">
                        <TaskInput ></TaskInput>
                    </form>
                </div>
            </div>
        )
    }
}