import {Howl, Howler} from 'howler';
import React from "react";
import './customObjects.css'
import { globalA, globalTimeSpan, powerLimit, reboundCoef } from "./physicConstants";

import s1 from './../sounds/s1.mp3'
export default class Body extends React.Component {
    // we should add the key parameter
    static id = 0;


    constructor(props) {
        // change de id
        const id = Body.id;
        Body.id += 1;
        props['key'] = id;
        super(props);

        this.state = {
            x: props.x || 100,
            y: props.y || 100,
            onMovement: false
        };

        // dinamic
        this.id = id;
        this.velX = 0;
        this.velY = 0;
        this.width = props.width || 100;
        this.height = props.height || 150;
        this.static = props.static || false;

        // style
        this.background = props.background || 'var(--primario-oscuro-color)';



        this.onClick = this.onClick.bind(this);
        this.soundOfCollision = this.soundOfCollision.bind(this);
        this.vertices = this.vertices.bind(this);
        this.posClicked = null;


        // add the speaker


        this.engine = props.engine;
        

    }



    // start up the component
    componentDidMount() {

        // add this body to the world controlled by the engine
        this.engine.addBody(this);
        console.log(this.engine.objectsInWorld);
    }


    // handle mouse events
    onClick(event) {
        console.log(event.screenX)
    }

    handleDragStart(object) {
        console.log(object)
        const newPosClicked = [object.screenX,object.screenY];
        if (this.posClicked){
            // move the difference
            this.setState({ 
                x: this.state.x + newPosClicked[0] - this.posClicked[0], 
                y: this.state.y + newPosClicked[1] - this.posClicked[1]});
        }
        // set the position had clicked
        this.posClicked = newPosClicked;

        
    }
    


    async setSpeed(collision, newSpeed) {

        try{
            // change the speed

            if (collision) {
                // bounce or stop
                this.velX *= this.velX**2 > 0.01 ? -reboundCoef: -1;
                this.velY *= this.velY**2 > 0.01 ? -reboundCoef: -1;
            }
            else{
                // else check if we are increasing the speed
                this.velX += newSpeed.x || 0;
                this.velY += newSpeed.y || 0;

            }
            
            // set the position
            this.setState({ 
                x: this.state.x + this.velX, 
                y: this.state.y + this.velY });
        }
        catch(error){

        }
    }

    mySpeed(){
        return [this.velX, this.velY]
    }


    soundOfCollision(power){
        const { Howl, Howler } = require('howler');
        const audio = new Howl({
            src: s1,
            html5: true,
            onend: function () {
                console.log('Finished!');
            }
        });
        audio.volume(power > powerLimit ? 1: (power/powerLimit)**0.5);
        audio.play();
    }

    vertices() {

        return [
            // Pass the vertices
            [
                [this.state.x, this.state.y],
                [this.state.x + this.width, this.state.y],
                [this.state.x, this.state.y + this.height],
                [this.state.x + this.width, this.state.y + this.height]
            ],
            // Pass the center
            [this.state.x + this.width / 2, this.state.y + this.height / 2]

        ]
    }


    render() {
        // style
        this.style =
        {
            background: this.background,
            width: String(this.width) + 'px',
            height: String(this.height) + 'px',
            position: 'absolute',
            top: String(this.state.y) + 'px',
            left: String(this.state.x) + 'px',
            //backgroundImage: 'url(' + imgUrl + ')'
        }

        document.body.onmousedown = function(event) { 
            this.handleDragStart(event);
        }
        return (
            <div
                style={this.style}
                className="physicalSquare"
                onMouseDown={(event)=>{
                    console.log('hola')
                    this.handleDragStart(event)
                }}>
            </div>
        )
    }
}