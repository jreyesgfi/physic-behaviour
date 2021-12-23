//retur a the vector that join two points
export function vectorFromTo(point1, point2){
    // return de vector
    return point1.map((coord,index)=>{
        // return each component
        return coord - point2[index];
    });
}

export function sinusVectors2D(vector1, vector2){
    return vector1[0]*vector2[1]-vector2[0]*vector1[1];
}