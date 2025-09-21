import { Dimensions } from "react-native";

const boardDimension = Dimensions.get('window').width;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

// Derive other values
const squareDimension = boardDimension / 2.5;
const tileDimension = (squareDimension / 2) / 3;
const centerSquareDimension = boardDimension - 2 * squareDimension;

const dimensions = {
    boardDimension,
    squareDimension,
    tileDimension,
    centerSquareDimension,
    deviceHeight,
    deviceWidth
};

export default dimensions;
