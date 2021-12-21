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
    }
}