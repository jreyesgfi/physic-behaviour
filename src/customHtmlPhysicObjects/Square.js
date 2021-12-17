import React from "react";
import './customObjects.css'
export default class Square extends React.Component {

    constructor(props){
        super(props);
        this.x= props.x || 150;
        this.y = props.y || 150;
        this.lado = props.lado || 100;
        this.state = {y:70}
        this.onClick = this.onClick.bind(this);
   
    }
    onClick(){
        console.log('La posición es: (',this.x, this.y,').')
        this.setState({y :this.state.y +10}) 
    }
    render(){
        const style=
        {
            background:'red',
            width: String(this.lado) + 'px',
            height: String(this.lado) +'px',
            position: 'absolute',
            top: String(this.x) + 'px',
            left: String(this.state.y) + 'px',
            //backgroundImage: 'url(' + imgUrl + ')'
        }  
        
        return (
            <div  
            style={style} 
            className="physicalSquare"
            onClick={this.onClick}>
                {this.state.y}
            </div>
        )
    }
}