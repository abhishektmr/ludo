export default function rotate(index) {
    return index == 51 ? '270deg' : index == 25 ? '90deg' : index == 38 ? '180deg' : '0deg' ;
}