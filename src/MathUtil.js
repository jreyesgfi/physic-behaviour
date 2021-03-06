//mod of a vector
export function moduleVector(vector){
    const squaredMod = vector.map((coord)=>coord**2).reduce((c1,c2)=>c1+c2)
    return ( squaredMod )**0.5
}


//return a the vector that join two points
export function vectorFromTo(point1, point2){
    // return de vector
    return point2.map((coord,index)=>{
        // return each component
        return coord - point1[index];
    });
}

export function sumTwoVectors(vector1,vector2){
    return vector1.map((coord,index)=>coord + vector2[index]);
}

export function scalarProduct2D(vector1, vector2){
    return vector1.map((coord,index)=>coord*vector2[index]).reduce((c1,c2)=>c1+c2);
}

export function sinusVectors2D(vector1, vector2){
    const modulesProduct = (moduleVector(vector1) * moduleVector(vector2))
    return (vector1[0]*vector2[1]-vector2[0]*vector1[1])/modulesProduct;
}

export function cosinusVectors(vector1,vector2){
    const modulesProduct = (moduleVector(vector1) * moduleVector(vector2))
    return scalarProduct2D(vector1,vector2)/modulesProduct;
}

// return the angle Between2Vectors in degrees
export function angle2VectorsDegrees(vector1, vector2){
    const angle = Math.acos( cosinusVectors(vector1, vector2) )
    return angle *180 /Math.PI;
}

export function projectVectorInVector(dirVector, vectorToProject){
    return dirVector.map((coord) => coord * cosinusVectors(dirVector,vectorToProject) )
}

export function rotateVector(origin ,end , angle){

    // Change to radians, the unit of angle that the Math functions use
    const angleInRad = Math.PI / 180 * angle;

    // Stablish the initial vector to rotate
    const initialVector = vectorFromTo(origin,end);

    // Define the rotation matrix
    const rotationMatrix =[
        [Math.cos(angleInRad),-Math.sin(angleInRad)],
        [Math.sin(angleInRad),Math.cos(angleInRad)]
    ];

    // Rotate the vector
    const rotatedVector = rotationMatrix.map((row)=>{
        return scalarProduct2D(row,initialVector);
    })

    // Now change the coordinates from bodyFrame to globalFrame
    return sumTwoVectors(origin, rotatedVector);

}