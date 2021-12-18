import React from "react";
import Body from "./Body";
import './customObjects.css'
import { globalA, globalTimeSpan } from "./physicConstants";

export default class Square extends Body {

    constructor(props){
        try{
            const lado = props.lado || 100
            let newProps = props;
            super(props);
        }
        catch(error){
            console.log(error)
            super(props)
        }
    }
}