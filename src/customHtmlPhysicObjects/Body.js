import React from "react";
import './customObjects.css'
import { globalA, globalTimeSpan } from "./physicConstants";
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
        this.vertices = this.vertices.bind(this);
        this.continueMovement = this.continueMovement.bind(this);
        this.setOnMovement = this.setOnMovement.bind(this);
        this.clicked = false


        this.engine = props.engine;
        

    }



    // start up the component
    componentDidMount() {

        // add this body to the world controlled by the engine
        this.engine.addBody(this);
        console.log(this.engine.objectsInWorld);
    }

    onClick() {
        this.velX = -this.velX * 0.3;
        this.velY = -this.velY * 0.3;

        // Iniciamos el movimiento
        this.setOnMovement(true);
    }


    async setSpeed(collision, newSpeed) {
        
        try{
            // change the speed

            if (collision) {
                this.velX *= -0.3;
                this.velY *= -0.3;
            }
            else{
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


    async continueMovement() {
        try {
            // Check if the movement is available
            if (this.state.onMovement == true) {

                // change the speed value
                const delay = ms => new Promise(res => setTimeout(res, ms));

                await delay(globalTimeSpan);

                this.velY += globalA * globalTimeSpan / 200;

                this.setState({ y: this.state.y + this.velY }, () => { this.continueMovement() });
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    setOnMovement(newValue) {

        // verify if the current value is changing
        if (this.state.onMovement != newValue) {
            this.setState({
                onMovement: newValue,
            }, () => {
                // calling the loop of movement
                this.continueMovement();
            });

        }
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


        return (
            <div
                style={this.style}
                className="physicalSquare"
                onClick={this.onClick}>
                {this.state.y}
            </div>
        )
    }
}