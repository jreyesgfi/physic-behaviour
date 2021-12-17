/**  The Object that keeps the tracking of the objects and 
 * detect its collides
*/
class Engine{
    constructor(props){
        this.objectsInWorld = [];
        
    }

    checkCollisions(){
        for ((cuerpo, index) of this.objectsInWorld){
            for (cuerpo2 of this.objectsInWorld.slice(index,-0)){

            }
        }
    }
}