import "../../assets/style/main.scss";
import React from "react";
import ThreeCanvas from "@components/three/threeCanvas";
import DailyReport from "@components/daily/dailyReport"

export default class Main extends React.Component {
    constructor(){
        super();
        this.state = {
           
        }
    }
    render(){
        return(
            <div className="container"> 
                <DailyReport></DailyReport>
            </div>
            
        )
    }

}