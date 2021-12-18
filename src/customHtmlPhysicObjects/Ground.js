import React from "react";
import Body from "./Body";
import './customObjects.css'
import { globalA, globalTimeSpan } from "./physicConstants";

export default class Ground extends Body {

    constructor(){
        try{
            let props = {
                width : 400,
                height: 30,
                x: 0,
                y:600,
            }
            super(props);
        }
        catch(error){
            console.log(error)
        }
    }
}