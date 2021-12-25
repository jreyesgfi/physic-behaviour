import React from "react";
import Body from "./Body";
import './customObjects.css'
import { globalA, globalTimeSpan } from "./physicConstants";

export default class Square extends Body {

    constructor(props){
        try{
            const height = props.height || 45;
            const width = props.height || 45;
            let newProps = {...props,
                height: height,
                width: width,
                angle:40,
                background: '#30a14e'};
            super(newProps);
        }
        catch(error){
            console.log(error)
            super(props)
        }
    }

}