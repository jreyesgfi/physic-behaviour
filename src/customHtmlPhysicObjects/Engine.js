/**  The Object that keeps the tracking of the objects and 
 * detect its collides
*/
class Engine{
    constructor(props){
        this.ground = null
        this.leftWall = null
        this.rightWall = null
        this.objectsInWorld = ['1','2','3','4'];
        
        
    }

    checkCollisions(){
        let index = 0
        for (let body1 of this.objectsInWorld){
            for (let body2 of this.objectsInWorld.slice(index + 1,this.objectsInWorld.length)){
                
                console.log(body1,body2)

            }
            //  check the boundaries constraints 
            if (this.ground.x > body1.circle.x - body1.circle.r){

                console.log('detente');
            } 

            index += 1;
        }
    }

    // Return if two bodies are colliding or not
    areColliding(body1,body2){
        // T=top, B=bottom, L=left, R=right
        // const [body1TL, body1TR, body1BL, body1BR, body1center] = body1.vercites()
        
        const [body1vertices, body1center] = body1.vercites();
        const [body2vertices, body2center] = body2.vercites();

        // Define the distance between 
        // the vertix of body1 and the center of body2
        let vertixChosed11 = null;
        let vertixChosed12 = null;

        body1vertices.foreach(vertix=>{
                // define the distance calculating the squares of the diferences
                diference = 0;
                diference += vertix.foreach((coordenate, index) => (coordenate - body2center[index])**2  );
                
                // select the two closer to the other center
                if (!vertixChosed11 || diference < vertixChosed11[1]) {
                    vertixChosed11 = [vertix, diference ]
                }
                else if (!vertixChosed12 || diference < vertixChosed12[1]) {
                    vertixChosed12 = [vertix, diference ]
                }
            }
        )
        // vertix of body2 and the center of body1
        let vertixChosed21 = null;
        let vertixChosed22 = null;

        body2vertices.foreach(vertix => {
            // define the distance calculating the squares of the diferences
            diference = 0;
            diference += vertix.foreach((coordenate, index) => (coordenate - body1center[index]) ** 2);

            // select the two closer to the other center
            if (!vertixChosed21 || diference < vertixChosed21[1]) {
                vertixChosed21 = [vertix, diference];
            }
            else if (!vertixChosed22 || diference < vertixChosed22[1]) {
                vertixChosed22 = [vertix, diference];
            }
        }
        )
        
        // check if they are too spaced to touch each other
        diagonal2 += body2vertices[0].foreach((coordenate, index) => (coordenate - body2center[index])**2 )
        diagonal2 = diagonal2**0.5
        // if the closer point of body1 is further away than the point of body2 to the center2, they dont collide
        if (vertixChosed11[1]**0.5  > diagonal2) {
            return false
        }
        
        // Determine if they collide
        body1ChosenVertices = [vertixChosed11,vertixChosed12];
        body2ChosenVertices = [vertixChosed21,vertixChosed22];
        
        // body1center body2chosenvertices   
        body2vertices.foreach(vertix => {

            
        }
        )
        

    }
}