import { StyleSheet, View } from "react-native";
import dimensions from "../../constants/dimensions";
import Pawn from "./pawn";

const { squareDimension, tileDimension } = dimensions;
export default function PawnSquare({ color }) {
    return (<View style={styles.container}>
            <View style={{position: "absolute", left: tileDimension/2, top: tileDimension/2}}>
                <Pawn color={color}></Pawn>
            </View>
            <View style={{position: "absolute", right: tileDimension/2, top: tileDimension/2}}>
                <Pawn color={color}></Pawn>
            </View>
            <View style={{position: "absolute", left: tileDimension/2, bottom: tileDimension/2}}>
                <Pawn color={color}></Pawn>
            </View>
            <View style={{position: "absolute", right: tileDimension/2, bottom: tileDimension/2}}>
                <Pawn color={color}></Pawn>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: squareDimension-2*tileDimension,
        width: squareDimension-2*tileDimension,
    }
});