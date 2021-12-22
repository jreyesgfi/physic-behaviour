import React from "react";
import Body from "./Body";
import './customObjects.css'
import { globalA, globalTimeSpan } from "./physicConstants";

export default class Ground extends Body {

    constructor(props){
        try{
            let newProps = {
                width : 400,
                height: 400,
                x: 50,
                y:500,
                engine: props.engine,
            }
            super(newProps);
        }
        catch(error){
            console.log(error)
        }
    }


    // overwrite the method to avoid the gravity
    async continueMovement(){
        try{
            // Check if the movement is available
            if (this.state.onMovement==true){

                // change the speed value
                const delay = ms => new Promise(res => setTimeout(res, ms));
                
                await delay(globalTimeSpan);
                
                this.setState({y :this.state.y + this.velY},()=>{this.continueMovement()});
            }
        }
        catch(error){
            console.log(error);
        }

    }
}