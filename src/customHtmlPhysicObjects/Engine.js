import {angle2VectorsDegrees, moduleVector, projectVectorInVector, sinusVectors2D, sumTwoVectors, vectorFromTo } from "../MathUtil";
import { globalA, globalTimeSpan } from "./physicConstants";

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


    addObject(body) {
        console.log(this.objectsInWorld)
        this.objectsInWorld.push(body);
    }



    // the timer
    async timer() {
        // call himself after a period of time creating a loop over the time

        // wait to re-evaluate the configuration
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(globalTimeSpan);

        // check the collisions and stop the bodies
        this.checkCollisions();

        // set gravity
        this.setGravity();

        // repeat again
        this.timer();
    }



    // set gravity
    setGravity(){
        for (let body of this.objectsInWorld) {
            if (!body.static){
                const newSpeed = {y : globalA * globalTimeSpan / 200}
                body.setSpeed(false, newSpeed);
            }
        }
    }
    // check all the possible collisions
    checkCollisions() {
        let index = 0
        
        for (let body1 of this.objectsInWorld) {
            for (let body2 of this.objectsInWorld.slice(index + 1, this.objectsInWorld.length)) {


                if (body1 != body2) {
                    
                    // First check if any vertix of body1 is in body2
                    let [verticesColliding, power] = this.areColliding(body1, body2) || [null,null];
                    let objectInCollide = body1;
                    // If not try the other way
                    if (!verticesColliding) {
                        objectInCollide = body2;
                        [verticesColliding, power] = this.areColliding(body2, body1) || [null,null];
                    }
                    if (verticesColliding) {
                        try {
                            [body1,body2].forEach((body)=>{
                                // check if it is static, otherwise change the speed
                                if (!body.static) {
                                    // make it sound
                                    if (power>0){
                                        body.soundOfCollision(power);
                                    }
                                    // make it show up
                                    body.setSpeed(true);
                                }
                            })

                            // rotate it
                            if (objectInCollide.static == false && verticesColliding.length == 1){
                                verticesColliding.forEach((vertix)=>objectInCollide.whereToRotate(vertix, power));
                            }

                            // stop the rotation
                            if (verticesColliding.length > 1){
                                objectInCollide.stopRotate();
                            }
                            
                        }
                        catch (error) { (console.log(error)) }
                    }

                }

            }
            //  check the boundaries constraints 
            //
        }
    }

    areColliding(body1, body2){
        ////////////////////////
        // retrieve the data
         const [body1Vertices, body1Center] = body1.vertices();
         const [body2Vertices, body2Center] = body2.vertices();
 
         ////////////////////////
        // obtain the vector that join the centers
         const vectorCenters = body1Center.map((coordenate, index)=>{
             return coordenate - body2Center[index]
         });
         const distanceCenters = moduleVector(vectorCenters)

         ////////////////////////
        // check if is even possible that both collide
         const diagonal1 = moduleVector( vectorFromTo(body1Vertices[0], body1Center))
         const diagonal2 = moduleVector( vectorFromTo(body2Vertices[0], body2Center))
         if (distanceCenters > (diagonal1 + diagonal2) ){
             return
         }

         ////////////////////////
         // measure how quick the bodies change their position to estimate the acuracy of the impact
         let movementCombined = moduleVector(body1.mySpeed() ) + moduleVector (body2.mySpeed());
         
         // set a limit
         movementCombined = (movementCombined > 3) ? 3 : movementCombined;

         ////////////////////////
        //  create the couple of vertices linked
        let verticesCouples = body2Vertices.map((vertix,index)=>{
            // if we are in the last vertix we bring back to the start point
            if (index==body2Vertices.length-1){
                return [vertix,body2Vertices[0]]
            }
            return [vertix,body2Vertices[index+1]]
        });

        ////////////////////////
        // check if any vertix of body1 is inside the body2
        // this will happen when the angles of the body2's sides seeing from body1 vertix sum to 360 degrees
        const verticesColliding = [];

        body1Vertices.forEach((vertix) =>{
            let angles = verticesCouples.map((verticesCouple)=>{
                const vector1 = vectorFromTo(vertix,verticesCouple[0]);
                const vector2 = vectorFromTo(vertix,verticesCouple[1]);
                return Math.abs( angle2VectorsDegrees(vector1,vector2) );
            });

            const sumAngles = angles.reduce((angle1, angle2)=> angle1 + angle2);
            if (sumAngles > (360 - movementCombined)) {
                verticesColliding.push(vertix);
            }
        })

        // check if any vertix collide has found
        if (verticesColliding.length == 0){
            return
        }
        
        // otherwise return the vertices and the combined movement
        return [verticesColliding, movementCombined]
    }

}