import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import dimensions from "../../constants/dimensions";
import PawnSquare from "./pawnSquare";

const { tileDimension, boardDimension, centerSquareDimension, squareDimension } = dimensions;

export default function Square({ layoutStyle, isHomeSquare, isTile }) {
    return(
    <View style={[layoutStyle, isHomeSquare ? styles.homeSquare : isTile ? styles.tile : styles.square]}>
        {!isHomeSquare && !isTile && <View style={styles.innerSquare}>
                                            <PawnSquare color={layoutStyle.backgroundColor}/>
                                     </View>}
        {isTile && layoutStyle.find(obj => 'isSafePoint' in obj)?.isSafePoint && <View style={{ alignItems: "center"}}>
                                                                                        <FontAwesome name="star-o" size={25} color="black"/>
                                                                                  </View>}
    </View>);
}

const styles = StyleSheet.create({
    square: {
        flex:1,
        height: squareDimension,
        width: squareDimension,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        borderWidth: .5
    },
    innerSquare: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        height: squareDimension-2*tileDimension,
        width: squareDimension-2*tileDimension,
        backgroundColor: "white",
        // padding: 2*tileDimension,
        borderColor: "black",
        borderWidth: .5,
        
    },
    homeSquare: {
        width: boardDimension-(2*squareDimension),
        height: boardDimension-(2*squareDimension),
        borderWidth: centerSquareDimension/2,
        borderTopColor: "blue",
        borderLeftColor: "green",
        borderBottomColor: "red",
        borderRightColor: "yellow"
    }, 
    tile: {
        height: tileDimension,
        width: tileDimension
    }
});

