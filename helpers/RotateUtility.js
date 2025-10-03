export function rotateArrow(index) {
    return index == 51 ? '270deg' : index == 25 ? '90deg' : index == 38 ? '180deg' : '0deg' ;
}

export function rotatePawn(color) {
    return color === 'green' ? '90deg' : color === 'blue' ? '180deg' : color === 'yellow' ? '270deg' : '0deg'
}