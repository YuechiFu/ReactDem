import React from  "react"
import ClipBoard from "clipboard";


export default class JsonOpera extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      jsonString : '',
      jsonData : [],
      warningContent : []
    }
  }
  formatData(nextProps){
   let arr = [...nextProps.skuList];
   let newArr = []
   let obj = {};
   let warning = []
    arr.map((item,index)=>{
     if(item.sku && item.title){
      if(item.sku in obj ){
        warning.push('第'+(index+1)+'项的sku跟第'+(obj[item.sku]+1)+'项冲突了!')
        return 
      }
      obj[item.sku] = index
      newArr.push(item);
     }else if(!item.sku && item.title){
      warning.push('第'+(index+1)+'项的sku别忘记填写哦!')
    }else if(item.sku && !item.title){
      warning.push('第'+(index+1)+'项的标题别忘记填写哦!')
    }
     

   })
   this.setState({warningContent : warning}) 
   this.setState({jsonData : newArr})
  }
  stringData(){
    let orEle = document.getElementById("json-format-target");
    if(!orEle) return 
    let str = orEle.innerText;
    str = str.replace(/\s+/g,'')
    document.getElementById('copy-json-target').innerText = str ;
  }
  componentWillReceiveProps(props){
    this.formatData(props)
  }
  componentDidUpdate(){
    this.stringData();
  }
  componentDidMount(){
    this.stringData();
  }

  render(){
    return(
        <div className="json-content-box">
          {
            this.state.warningContent.length > 0  &&  
            <div className="warning-content">
              {this.state.warningContent.map((value,index)=>{
                return(<div className="warinig-tip-item" key={index}>{value}</div>)
              })}
            </div> 
          }
          {
            this.state.jsonData.length > 0 && 
              <div className="json-content json-format-content" id="json-format-target" > 
                <div className="json-start">{'{'}</div>
                  <ul>
                    {
                      this.state.jsonData.map((item,index)=>{
                        return(
                            item.sku && item.title && 
                              <li className="json-item" key = {index}><span>"{item.sku}":</span><span>"{item.title}"</span>{index < this.state.jsonData.length-1 && <span>,</span>}</li>
                          )
                      }) 
                    }
                  </ul>
                  <div className="json-end">{'}'}</div>
              </div> 
              
          }
          <div id="copy-json-target"> </div>
        </div> 
    )
  }


  
}