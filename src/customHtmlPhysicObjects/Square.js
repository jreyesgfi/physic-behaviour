import React from "react";
import './customObjects.css'
import { globalA, globalTimeSpan } from "./physicConstants";
export default class Square extends React.Component {

    constructor(props){
        super(props);
        this.x= props.x || 150;
        this.y = props.y || 150;
        this.velX = 0;
        this.velY = 0;
        this.lado = props.lado || 100;
        this.state = {y:100, onMovement:true}
        this.onClick = this.onClick.bind(this);
        this.clicked = false
    }
    onClick(){
        this.velX = -this.velX*0.3;
        this.velY = -this.velY*0.3;
        if (this.clicked == false){
            this.clicked = true;
            this.onMovement();
        }

    }

    onMovement(){
        // Check if the movement is available
        if (this.state.onMovement==true){

            // If it is, it changes the position
            // console.log('The position is: (',this.x, this.state.y,').')
            this.setState({y :this.state.y + this.velY},
                async ()=>{
                    const delay = ms => new Promise(res => setTimeout(res, ms));
                    await delay(globalTimeSpan)
                    this.velY += globalA *globalTimeSpan /1000;
                    this.onMovement()
                })
        }
    }

    checkColissions(){}





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