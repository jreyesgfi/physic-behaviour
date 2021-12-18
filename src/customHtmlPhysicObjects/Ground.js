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
                x: 0,
                y:200,
                engine: props.engine,
            }
            super(newProps);
        }
        catch(error){
            console.log(error)
        }
    }
}