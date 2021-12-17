import Matter, { Body } from "matter-js";
import React from "react";
import { render } from "react-dom";


export default class SquareCustom extends React.Component {

    constructor(props) {
        super(props);
        this.x = props.x || 200;
        this.y = props.y || 200;
        this.lado = props.lado || 200;
        this.world = props.world
        this.body = Matter.Bodies.rectangle(this.x, this.y, this.lado, this.lado);
        
        Matter.Composite.add(this.world, this.body);

        this.state = {y:this.body.y}
        this.translate();
        console.log(this.body)
    }

    translate(){
        Matter.Body.translate(this.body, {x:300, y:200});
        this.render()
    }
        
    render(){
        return(
            <Body.rectangle x={this.x} y={this.y} width={this.lado} height={this.lado}>
            </Body.rectangle>
        )
    }
}
