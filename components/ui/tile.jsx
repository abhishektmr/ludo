import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import rotate, { rotateArrow } from "../../helpers/RotateUtility";
import { selectAllPawns } from "../../redux/selectors";
import Pawn from "./pawn";

const Tile = React.memo(
  ({
    id,
    width,
    height,
    backgroundColor,
    isSafePoint,
    isArrowPoint,
    arrowColor,
  }) => {
    // console.log("Tile component rerendered for id ", id);

    const allPawns = useSelector(selectAllPawns);
    const pawnsOnTile = allPawns.filter((pawn) => pawn.tileId === id);
    // console.log("Pawns on tileId: ", id, " ", pawnsOnTile);

    // 🔑 Calculate a grid layout for N pawns
    const getPawnStyle = (index, total) => {
      const baseSize = 28;
      // shrink size based on number of pawns (up to a limit)
      const scale = total === 1 ? 1 : total <= 4 ? 0.75 : 0.6;
      const size = baseSize * scale;

      // Compute grid rows/columns (smallest square grid that fits all pawns)
      const columns = Math.ceil(Math.sqrt(total));
      const rows = Math.ceil(total / columns);

      const col = index % columns;
      const row = Math.floor(index / columns);

      return {
        position: "absolute",
        height: size,
        width: size*0.9,
        left: `${(col + 0.32) * (100 / columns)}%`,
        top: `${(row + 0.6) * (100 / rows)}%`,
        transform: [
          { translateX: -(size * 0.33) },
          { translateY: -(size / 2) },
        ],
      };
    };

    return (
      <View
        key={id}
        style={[styles.container, { height, width, backgroundColor }]}
      >
        {isSafePoint && (
          <FontAwesome
            name="star-o"
            size={25}
            color="black"
            style={{ position: "absolute" }}
          />
        )}
        {isArrowPoint && (
          <Ionicons
            name="arrow-forward"
            size={24}
            color={arrowColor}
            style={{
              position: "absolute",
              transform: [{ rotate: rotateArrow(id) }],
            }}
          />
        )}

        {pawnsOnTile.map((pawn, index) => (
          <View key={pawn.id} style={getPawnStyle(index, pawnsOnTile.length)}>
            <Pawn pawnData={pawn} />
          </View>
        ))}

        {/* {pawnsOnTile.map((pawn) => (
          <Pawn key={pawn.id} pawnData={pawn} />
        ))} */}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderWidth: 0.25,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});

export default Tile;
