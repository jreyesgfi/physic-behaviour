import {Howl, Howler} from 'howler';
import React from "react";
import './customObjects.css'
import { globalA, globalTimeSpan, powerLimit, reboundCoef } from "./physicConstants";

import s1 from './../sounds/s1.wav'
import { rotateVector, sinusVectors2D, vectorFromTo } from '../MathUtil';

export default class Body extends React.Component {
    // we should add the key parameter
    static id = 0;


    constructor(props) {
        //////////////////////////////////
        // change de id
        const id = Body.id;
        Body.id += 1;
        props['key'] = id;
        super(props);

        //////////////////////////////////
        // shape
        this.width = props.width || 100;
        this.height = props.height || 150;

        const vertixTopLeff = props.vertixTopLeff || [100,100];
        this.state = {angle: props.angle || 0};

        const initialCenter = this.obtainInitialCenter(vertixTopLeff);
        this.state = {
            x: initialCenter[0],
            y: initialCenter[1],
        };
        this.center = ()=> [this.state.x, this.state.y];

        //////////////////////////////////
        // dinamic
        this.id = id;
        this.velX = 0;
        this.velY = 0;
        this.static = props.static || false;
        this.state = {
            onMovement: false
        }

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
        // add the engine to control this body collision
        this.engine = props.engine;
        

    }



    // start up the component
    componentDidMount() {

        // add this body to the world controlled by the engine
        this.engine.addBody(this);
        console.log(this.engine.objectsInWorld);
        console.log(this.vertices());
    }

    // initial position of the center
    obtainInitialCenter(vertixTopLeft){

        // obtain de half diagonal in the direction regardless the rotation
        const halfDiagonal = [this.width, this.height].map((distance, index)=>{
            return distance/2 + vertixTopLeft[index]
        });

        // invert the rotation apllied in the vertix to retrieve the center
        return rotateVector(vertixTopLeft, halfDiagonal, -this.angle)
    }

    setPositionClicked(position) {
        this.posClicked = position;

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
                y: this.state.y + this.velY });
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
                return
            }
        });
        audio.volume(power > powerLimit ? 1: (power/powerLimit)**0.5);
        audio.play();
    }

    whereToRotate (vertixCollision, power){

        const center = [this.state.x + this.width / 2, this.state.y + this.height / 2];
        const dir = [this.velX, this.velY];

        // obtain the vector from center to pointCollision
        const centerVertixVector = vectorFromTo(vertixCollision,center);

        // obtain sinus from centerVertirxVector to dir
        const sinus = sinusVectors2D(centerVertixVector, dir);

        // variation of the angle
        let varAngle = 2 ;

        // rotate depending on the sign of the sinus
        if (sinus < 0){
            varAngle *= -1;
        }
        this.setState({angle: this.state.angle + varAngle});

    }

    vertices() {

        // establish the initial coordinates of one vertix (this case top left) regardles the rotation
        let topLeftVertix = this.noRotatedVertixTopLeft();

        // now rotate it
        topLeftVertix = rotateVector(this.center);

        // obtain the other vertices by rotation
        let rotatedVertices = [...Array(4).keys()].map((index)=>{
            return rotateVector(this.center, topLeftVertix, this.angle + 90*index)
        })

        /*const initialVertices = [
            [this.state.x - this.width/2, this.state.y + this.height/2],
            [this.state.x + this.width/2, this.state.y + this.height/2],
            [this.state.x - this.width/2, this.state.y - this.height/2],
            [this.state.x + this.width/2, this.state.y - this.height/2]
        ];*/

        // rotate them
        let rotatedVertices = initialVertices.map((endPoint)=>rotateVector(center,endPoint,this.state.angle));
        return [
            // Pass the vertices
            rotatedVertices
            ,
            // Pass the center
            center

        ]
    }

   noRotatedVertixTopLeft(){
        // Pass the center
        return [this.state.x - this.width/2, this.state.y + this.height/2];
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