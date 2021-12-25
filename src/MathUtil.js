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

export function sinusVectors2D(vector1, vector2){
    return vector1[0]*vector2[1]-vector2[0]*vector1[1];
}

export function scalarProduct2D(vector1, vector2){
    return vector1.map((coord,index)=>coord*vector2[index]).reduce((c1,c2)=>c1+c2);
}

export function rotateVector(origin ,end , angle){
    origin = [1,1]
    end = [2,1]
    angle = 180
    console.log('coseno es',Math.cos(Math.PI))
    // Change to radians, the unit of angle that the Math functions use
    const angleInRad = Math.PI / 180 * angle;
    console.log(angleInRad)
    // Stablish the initial vector to rotate
    const initialVector = vectorFromTo(origin,end);
    console.log(initialVector)
    // Define the rotation matrix
    const rotationMatrix =[
        [Math.cos(angleInRad),-Math.sin(angleInRad)],
        [Math.sin(angleInRad),Math.cos(angleInRad)]
    ];
    console.log(rotationMatrix)

    // Rotate the vector
    const rotatedVector = rotationMatrix.map((row)=>{
        return scalarProduct2D(row,initialVector);
    })

    // Now change the coordinates from bodyFrame to globalFrame
    return sumTwoVectors(origin, rotatedVector);

}