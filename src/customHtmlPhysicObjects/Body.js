import React from "react";
import './customObjects.css'
import { globalA, globalTimeSpan } from "./physicConstants";
export default class Body extends React.Component {

    // we should add the key parameter
    static id = 0;


    constructor(props){
        // change de id
        const id = Body.id;
        Body.id += 1;
        props['key'] = id;
        super(props);


        this.id = id;
        this.velX = 0;
        this.velY = 0;
        this.width = props.width || 100;
        this.height = props.height || 150;
        this.state = {
            x:props.x || 100,
            y:props.y || 100,
            onMovement:true };
        this.onClick = this.onClick.bind(this);
        this.vertices = this.vertices.bind(this);
        this.onMovement = this.onMovement.bind(this);
        this.setOnMovement = this.setOnMovement.bind(this);
        this.clicked = false


        // add this body to the world controlled by the engine
        this.engine = props.engine;
        this.engine.addBody(this);
        this.engine.objectsInWorld.forEach((element,index) => {
            if (element.id %2){
                this.engine.objectsInWorld.pop(index);
            }
        });
        console.log(this.engine.objectsInWorld);

        


        // Tries
        let array = [3,23,16,4,5]

    }
    onClick(){
        this.velX = -this.velX*0.3;
        this.velY = -this.velY*0.3;
        
        // Iniciamos el movimiento
        this.setOnMovement(true);

    }

    onMovement(){
        // Check if the movement is available
        console.log("In movement: ", this.state.onMovement)
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
    setOnMovement(newValue){
        this.setState({
            onMovement:newValue
        }, () => 
        {   console.log(this.state.onMovement)
            this.onMovement()});
    }

    vertices(){

        return [
            // Pass the vertices
            [
                [this.state.x,this.state.y],
                [this.state.x + this.width, this.state.y],
                [this.state.x, this.state.y + this.height],
                [this.state.x + this.width, this.state.y + this.height]
            ],
            // Pass the center
            [this.state.x + this.width/2, this.state.y + this.height/2]
            
        ]
    }

    checkColissions(){}





    render(){
        const style=
        {
            background:'red',
            width: String(this.width) + 'px',
            height: String(this.height) +'px',
            position: 'absolute',
            top: String(this.state.y) + 'px',
            left: String(this.state.x) + 'px',
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