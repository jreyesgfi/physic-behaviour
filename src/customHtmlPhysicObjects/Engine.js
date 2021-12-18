/**  The Object that keeps the tracking of the objects and 
 * detect its collides
*/
class Engine {
    constructor(props) {
        this.ground = null
        this.leftWall = null
        this.rightWall = null
        this.objectsInWorld = ['1', '2', '3', '4'];


    }

    checkCollisions() {
        let index = 0
        for (let body1 of this.objectsInWorld) {
            for (let body2 of this.objectsInWorld.slice(index + 1, this.objectsInWorld.length)) {
                
                // First check if any vertix of body1 is in body2
                const collide = this.areColliding2(body1,body2);

                // If not try the other way
                if (!collide){
                    collide = this.areColliding2(body2,body1);
                }

                body1.state.setOnMovement(!collide);

            }
            //  check the boundaries constraints 
            if (this.ground.x > body1.circle.x - body1.circle.r) {

                console.log('detente');
            }

            index += 1;
        }
    }


    // The new version of are colliding
    areColliding2(body1,body2){
        
        // retrieve the data
        const body1Vertices= body1.vercites[0];
        const [body2Vertices, body2Center] = body2.vercites();

        // check the angle between a center and a vertix of body2 from the vertix of body1

        // define the var collide to sign up the collides

        let collide = 0
        collide += body1Vertices.foreach(vertix1 => {
            return body2Vertices.foreach(vertix2 => {

                ///////////////////////////////////////////7
                // Define the two vectors with common point in vertix1

                // vertix to vertix
                const vector1 = vertix1.map((coordenate, index) => {
                    return coordenate - vertix2[index];
                })

                // vertix to center
                const vector2 = vertix2.map((coordenate, index) => {
                    return coordenate - body2Center[index];
                })

                //////////////////////////////////////////////////
                // Evaluate the dot product// obtain the dot product
                const dotProduct = 0;
                dotProduct += vector1.foreach((coordenate, index) => coordenate * vector2[index]);

                // if dot product is positive, the body1Vertix is in body2Shape
                if (dotProduct >= 0) {
                    return 1;
                }
                return 0;
            })
        })

        // if at any moment the return was 1 they collide
        if (collide > 0) {
            return true
        }

        // else false
        return false




    }







    // Return if two bodies are colliding or not
    areColliding(body1, body2) {
        // T=top, B=bottom, L=left, R=right
        // const [body1TL, body1TR, body1BL, body1BR, body1center] = body1.vercites()

        const [body1vertices, body1center] = body1.vercites();
        const [body2vertices, body2center] = body2.vercites();

        // Define the distance between 
        // the vertix of body1 and the center of body2
        let vertixChosed11 = null;
        let vertixChosed12 = null;

        body1vertices.foreach(vertix => {
            // define the distance calculating the squares of the diferences
            diference = 0;
            diference += vertix.foreach((coordenate, index) => (coordenate - body2center[index]) ** 2);

            // select the two closer to the other center
            if (!vertixChosed11 || diference < vertixChosed11[1]) {
                vertixChosed11 = [vertix, diference]
            }
            else if (!vertixChosed12 || diference < vertixChosed12[1]) {
                vertixChosed12 = [vertix, diference]
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
        diagonal2 += body2vertices[0].foreach((coordenate, index) => (coordenate - body2center[index]) ** 2)
        diagonal2 = diagonal2 ** 0.5
        // if the closer point of body1 is further away than the point of body2 to the center2, they dont collide
        if (vertixChosed11[1] ** 0.5 > diagonal2) {
            return false
        }

        // Determine if they collide
        const body1ChosenVertices = [vertixChosed11, vertixChosed12];
        const body2ChosenVertices = [vertixChosed21, vertixChosed22];

        
        let collide = 0;

        // body1Center body2ChosenVertices
        collide += body2ChosenVertices.foreach(vertix2 => {

            return body1ChosenVertices.foreach(vertix1 => {

                // obtain the two vectors

                // the vector vertixBody2 centerBody1
                const vector2 = vertix2.map((coordenate, index) => {
                    return coordenate - body1center[index];
                })

                // the vector vertixBody1 centerBody1
                const vector1 = vertix1.map((coordenate, index) => {
                    return coordenate - body1center[index];
                })

                // obtain the dot product
                const dotProduct = 0
                dotProduct += vector1.foreach((coordenate, index) => coordenate * vector2[index])

                // if dot product is positive, the body2Vertix is in body1Shape
                if (dotProduct >= 0) {
                    return 1;
                }
                return 0;

            })

        })

        // body2Center body1ChosenVertices
        collide += body1ChosenVertices.foreach(vertix1 => {

            return body2ChosenVertices.foreach(vertix2 => {

                // obtain the two vectors

                // the vector vertixBody2 centerBody1
                const vector2 = vertix2.map((coordenate, index) => {
                    return coordenate - body2center[index];
                })

                // the vector vertixBody1 centerBody1
                const vector1 = vertix1.map((coordenate, index) => {
                    return coordenate - body2center[index];
                })

                // obtain the dot product
                const dotProduct = 0
                dotProduct += vector1.foreach((coordenate, index) => coordenate * vector2[index])

                // if dot product is positive, the body2Vertix is in body1Shape
                if (dotProduct >= 0) {
                    return 1;
                }
                return 0;

            })

        })

        // if at any moment the return was 1 they collide
        if (collide > 0) {
            return true
        }
        else {
            return false
        }
    }

}