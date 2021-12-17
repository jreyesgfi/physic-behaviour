import React from "react";
import './customObjects.css'

export default class Square extends React.Component {

    constructor(props){
        super(props);
        this.x = props.x || 200;
        this.y = props.y || 200;
        this.lado = props.lado || 200;
        try{
            this.style = {
                background:'red',
                width: String(this.lado) + 'px',
                height: String(this.lado) +'px',
                position: 'absolute',
                top: '200px',
                left: '200px',
                //backgroundImage: 'url(' + imgUrl + ')'
            }
        }catch(e){
            console.log(e)
        }
    }

    render(){
        return (
            <div  style={this.style} className="physicalSquare">
                HOLA
            </div>
        )
    }
}