import React from "react";
import Body from "./Body";
import './customObjects.css'
import { globalA, globalTimeSpan } from "./physicConstants";

export default class Ground extends Body {

    constructor(props){
        try{
            let newProps = {
                width : 400,
                height: 30,
                x: 50,
                y:600,
                engine: props.engine,
            }
            super(newProps);
        }
        catch(error){
            console.log(error)
        }
    }
}