import "../../assets/style/main.scss";
import React from "react";
import Daily from "../daily/daily";
import Currency from "../currency/currency";
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
<<<<<<< HEAD:react-demo/src/components/main/main.jsx
                <DailyReport></DailyReport>
=======
                <Currency></Currency>
                {/* <Daily></Daily> */}
>>>>>>> f38cd2c1880e1d2a2dc2b0017dce2c68f9a67add:src/components/main/main.jsx
            </div>
            
        )
    }

}