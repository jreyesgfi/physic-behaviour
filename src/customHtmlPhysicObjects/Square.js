import React from "react";
import './customObjects.css'
export default class Square extends React.Component {

    constructor(props){
        super(props);
        this.x= props.x || 150;
        this.y = props.y || 150;
        this.velX = 0;
        this.velY = 3;
        this.lado = props.lado || 100;
        this.state = {y:400, onMovement:true}
        this.onClick = this.onClick.bind(this);
   
    }
    onClick(){
        if (this.state.onMovement==true){
            console.log('La posición es: (',this.x, this.state.y,').')
            this.setState({y :this.state.y + this.velY},
                async ()=>{
                    const delay = ms => new Promise(res => setTimeout(res, ms));
                    await delay(20)
                    this.onClick()
                })
        }
        

    }
    render(){
        const style=
        {
            background:'red',
            width: String(this.lado) + 'px',
            height: String(this.lado) +'px',
            position: 'absolute',
            top: String(this.state.y) + 'px',
            left: String(this.x) + 'px',
            //backgroundImage: 'url(' + imgUrl + ')'
        }  
        
        return (
            <div  
            style={style} 
            className="physicalSquare"
            onClick={this.onClick}>
                {this.state.y}
            </div>
        )
    }
}