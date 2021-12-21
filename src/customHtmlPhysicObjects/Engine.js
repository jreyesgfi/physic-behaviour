import { globalTimeSpan } from "./physicConstants";

/**  The Object that keeps the tracking of the objects and 
 * detect its collides
*/
export default class Engine {
    constructor(props) {
        this.ground = null;
        this.leftWall = null;
        this.rightWall = null;
        this.objectsInWorld = [];


        this.addBody = (body) => {

            this.objectsInWorld.push(body);

        }

        //start the timer
        this.timer();
    }


    // addObject(body) {
    //     console.log(this.objectsInWorld)
    //     this.objectsInWorld.push(body);
    //     console.log(this.objectsInWorld)
    // }



    // the timer
    async timer() {
        // call himself after a period of time creating a loop over the time

        // wait to re-evaluate the configuration
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(globalTimeSpan);

        // check the collisions and stop the bodies
        this.checkCollisions();

        // repeat again
        //this.timer();
    }

    // check all the possible collisions
    checkCollisions() {
        let index = 0
        
        for (let body1 of this.objectsInWorld) {
            for (let body2 of this.objectsInWorld.slice(index + 1, this.objectsInWorld.length)) {


                if (body1 != body2) {
                    
                    // First check if any vertix of body1 is in body2
                    let collide = this.areColliding2(body1, body2);

                    // If not try the other way
                    if (!collide) {

                        collide = this.areColliding2(body2, body1);

                    }

                    if (collide) {
                    }
                    try {
                        console.log('changing the movement to ', !collide)
                        body1.setOnMovement(!collide);
                        body2.setOnMovement(!collide);
                    }
                    catch (error) { (console.log(error)) }

                }

            }
            //  check the boundaries constraints 
            //
        }
    }


    // The new version of are colliding
    areColliding2(body1, body2) {

        // retrieve the data
        const [body1Vertices, body1Center] = body1.vertices();
        const [body2Vertices, body2Center] = body2.vertices();

        //  create the couple of vertices licked
        let verticesCouples = body2Vertices.map((vertix,index)=>{
            // if we are in the last vertix we bring back to the start point
            if (index==body2Vertices.length-1){
                return [vertix,vertix]
            }
            return [vertix,body2Vertices[index+1]]
        });
        console.log(verticesCouples)
        
        // initialize the collide value to false
        let collide = false;
        
        // check if any vertix1 for the body1 have two opposite vertix of body2, 180degres
        body1Vertices.forEach(vertix1 => {
            verticesCouples.forEach(verticesCouple => {
                
                // Check if we have already reached a collision
                if (collide == false) {
                    
                    
                    //////////////////////////////////
                    // Define the two vectors with common point in vertix1

                    // for each vector in vectors
                    const vectors = verticesCouple.map((vector)=>{
                        console.log(vector)
                        // for each coordenate in vector
                        return vector.map((coordenate, index) => {
                            // obtain the difference
                            return coordenate - vertix1[index];
                        });
                    })

                    /////////////////////////////////////
                    // define the vector module

                    const productModules = vectors.map((vector)=>{
                        // each vector module
                        return vector.reduce((c1,c2) => (c1^2 + c2^2)^0.5)
                    }).reduce((m1,m2)=> m1 * m2 )

                    
                    //////////////////////////////////////////////////
                    // Evaluate the dot product

                    // We use map to create the array an track it coordenates and reduce to keep the dotProduct value
                    const dotProduct = vectors.reduce((v1,v2)=>{
                        return v1[0] * v2[0] + v1[1] * v2[1];
                    })

                    // dotProduct = vectors[0].map((coordenate, index) => {
                    //     return coordenate * vectors[1][index];
                    // }).reduce((m, n) => m + n);

                    ////////////////////////////////////////
                    // obtain the cos(angle) and compare to -1
                    const cosAngle = dotProduct / productModules;
                    console.log(cosAngle)

                    // if the cos in close to -1 the vertix is into the body2
                    if (cosAngle > -1.02 && cosAngle < -0.98){
                        collide = true;
                    } 

                }

            })
        })
        // we return the collide outcome
        return collide;

    }

}