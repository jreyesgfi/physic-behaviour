import World from "matter-js";
import React from "react";


export default class SquareCustom extends React.Component {

    static cretateObject = null;
    constructor(props) {
        super(props);
        props.functToCreate();
        this.body = SquareCustom.createObject;
    }
        
    render(){
        return
    }
}
