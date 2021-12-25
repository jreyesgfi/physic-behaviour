import {Howl, Howler} from 'howler';
import React from "react";
import './customObjects.css'
import { globalA, globalTimeSpan, powerBottomLimit, powerTopLimit, reboundCoef } from "./physicConstants";

import s1 from './../sounds/s1.mp3'
import { rotateVector, sinusVectors2D, vectorFromTo } from '../MathUtil';

export default class Body2 extends React.Component {
    // we should add the key parameter
    static id = 1;


    constructor(props) {

        //////////////////////////////////
        // change de id
        const id = Body2.id;
        Body2.id += 1;
        super(props);

        //////////////////////////////////
        // set the states
        this.state = {
            angle: null,
            x:null,
            y:null,
            onMovement:null,
        }

        //////////////////////////////////
        // shape
        this.width = props.width || 100;
        this.height = props.height || 150;

        const vertixTopLeff = props.vertixTopLeff || [100,100];
        const angle =  props.angle || 0;

        const initialCenter = this.obtainInitialCenter(vertixTopLeff);
        console.log('initial center', initialCenter)
        const x = initialCenter[0];
        const y = initialCenter[1];
        this.center = ()=> [this.state.x, this.state.y];
        this.vertixTopLeftNoRotated = ()=> [this.state.x - this.width/2, this.state.y - this.height/2];

        //////////////////////////////////
        // dinamic
        this.id = id;
        this.velX = 0;
        this.velY = 0;
        this.angularSpeed = 0;
        this.static = props.static || false;
        const onMovement = false;

        //////////////////////////////////
        // style
        this.background = props.background || 'var(--primario-oscuro-color)';


        //////////////////////////////////
        // binds
        this.soundOfCollision = this.soundOfCollision.bind(this);
        this.vertices = this.vertices.bind(this);


        //////////////////////////////////
        // clicked values
        this.posClicked = null;
        this.clicked = false


        //////////////////////////////////
        // add the engine to control this Body2 collision
        this.engine = props.engine;

        //////////////////////////////////
        // set the states
        this.state = {
            angle:angle,
            x:x,
            y:y,
            onMovement:onMovement,
        }
    }



    // start up the component
    componentDidMount() {
        // add this Body2 to the world controlled by the engine
        this.engine.addBody(this);
        console.log(this.engine.objectsInWorld);
        console.log('the vertices are', this.vertices());
    }

    // initial position of the center
    obtainInitialCenter(vertixTopLeft){
        // obtain de half diagonal in the direction regardless the rotation
        const halfDiagonal = [this.width, this.height].map((distance, index)=>{
            return distance/2 + vertixTopLeft[index]
        });
        return halfDiagonal;
        // invert the rotation apllied in the vertix to retrieve the center
        //return rotateVector(vertixTopLeft, halfDiagonal, -this.state.angle)
    }

    setPositionClicked(position) {
        this.posClicked = position;
        this.stopRotate();

        //if is static set the speed to 0
        if (this.static){
                this.velX = 0;
                this.velY = 0;
        }
    }

    handleDrag(event) {
        const newPosClicked = [event.screenX,event.screenY];
        if (this.posClicked){

            // move the difference
            this.velX = newPosClicked[0] - this.posClicked[0];
            this.velY = newPosClicked[1] - this.posClicked[1];

            this.setState({ 
                x: this.state.x + this.velX, 
                y: this.state.y + this.velY
            });

            // set the position had clicked
            this.posClicked = newPosClicked;
            
        }
        
    }
    


    async setSpeed(collision, newSpeed) {

        if (!this.posClicked){
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
                y: this.state.y + this.velY,
                angle: this.state.angle + this.angularSpeed,
            });
        }
    }

    mySpeed(){
        return [this.velX, this.velY]
    }


    soundOfCollision(power){
        if (power < powerBottomLimit){
            return
        }
        const { Howl, Howler } = require('howler');
        const audio = new Howl({
            src: s1,
            html5: true,
            onend: function () {
                return
            }
        });
        if (power > powerTopLimit){
            audio.volume = 1;
            audio.play();
        }
        audio.volume(power > powerTopLimit ? 1: (power/powerTopLimit)**0.5);
        audio.play();
        
        
    }

    whereToRotate (vertixCollision, power){

        const center = this.center();
        const dir = [this.velX, this.velY];

        // obtain the vector from center to pointCollision
        const centerVertixVector = vectorFromTo(vertixCollision,center);

        // obtain sinus from centerVertirxVector to dir
        const sinus = sinusVectors2D(centerVertixVector, dir);

        // variation of the angle
        let varAngle = -3*sinus *power;

        // rotate depending on the sign of the sinus
        this.angularSpeed = varAngle;
    }

    stopRotate() {
        this.angularSpeed = 0;
    }

    vertices() {
        // establish the initial coordinates of one vertix (this case top left) regardles the rotation
        let vertixTopLeft = this.vertixTopLeftNoRotated();

        // obtain the other vertices by rotation
        let rotatedVertices = [...Array(4).keys()].map((index)=>{
            // apply the global rotation and another 90 degrees to change the vertix to the following one
            return rotateVector(this.center(), vertixTopLeft, this.state.angle + 90 * index)
        })

        return [
            // Pass the vertices
            rotatedVertices
            ,
            // Pass the center
            this.center()

        ]
    }

    render() {
        //////////////////////
        // style
        // retrieve the top left vertix regardless the rotation
        const left = this.vertixTopLeftNoRotated()[0];
        const top = this.vertixTopLeftNoRotated()[1];
        this.style =
        {
            background: this.background,
            width: String(this.width) + 'px',
            height: String(this.height) + 'px',
            position: 'absolute',
            top: String(top) + 'px',
            left: String(left) + 'px',
            transform: 'rotate('+String(this.state.angle)+'deg)',
            //backgroundImage: 'url(' + imgUrl + ')'
        }


        return (
            <div
                style={this.style}
                className="physicalSquare"
                onMouseDown={(event)=>{
                    console.log('mousedown')
                    this.setPositionClicked([event.screenX,event.screenY])
                }}
                onMouseUp={()=>{
                    console.log('mouseup')
                    this.setPositionClicked(null)
                }}
                onMouseMove={(event)=>{
                    this.handleDrag(event)
                }}
                >

            </div>
        )
    }
}