import React from "react";
import Body from "./Body";
import './customObjects.css'
import { globalA, globalTimeSpan } from "./physicConstants";

export default class Square extends Body {

    constructor(props){
        try{
            let newProps = {...props,
                height: 45,
                width: 45,
                angle:20,
                background: '#30a14e'};
            super(newProps);
        }
        catch(error){
            console.log(error)
            super(props)
        }
    }

}