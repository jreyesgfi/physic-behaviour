import React from "react";
import Body from "./Body";
import './customObjects.css'
import { globalA, globalTimeSpan } from "./physicConstants";

export default class Square extends Body {

    constructor(props){
        try{
            let newProps = {...props, lado: 100};
            super(newProps);
        }
        catch(error){
            console.log(error)
            super(props)
        }

        try{
            this.style.background = 'red';
        }
        catch(error){console.log(error)}
    }

    componentDidMount() {

        // add this body to the world controlled by the engine
        this.engine.addBody(this);
        console.log(this.engine.objectsInWorld);

        // editing the style
        
        
   }
}