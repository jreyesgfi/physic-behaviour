/**  The Object that keeps the tracking of the objects and 
 * detect its collides
*/
class Engine{
    constructor(props){
        this.objectsInWorld = [];
        this.objectsInWorld = ['1','2','3','4'];
        let index = 0
        
    }

    checkCollisions(){
        for (let cuerpo of this.objectsInWorld){
            for (let cuerpo2 of this.objectsInWorld.slice(index + 1,this.objectsInWorld.length)){
                
                console.log(cuerpo,cuerpo2)
                
            }
            index += 1;
        }
    }
}