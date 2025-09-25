import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../constants/Colors";
import Pawn from "./pawn";

const Pocket = React.memo(({ playerId }) => {
  console.log("Pocket component rerendered");
  const pawns = useSelector(state => state.game.players.find(p => p.id === playerId)?.pawns);

  return (
    <View style={[styles.container, { backgroundColor: Colors[pawns[0].color] }]}>
      <View style={styles.frame}>
        <View style={styles.pawnContainer}>
          <View style={[styles.pawnCircle, { backgroundColor: Colors[pawns[0].color] }]}>
            {pawns[0]?.moves === 0 && (
              <View style={{ height: 30, width: 28}}> 
                <Pawn pawnData={pawns[0]}/> 
              </View>
            )}
          </View>
          <View style={[styles.pawnCircle, { backgroundColor: Colors[pawns[1].color] }]}>
            {pawns[1]?.moves === 0 && (
              <View style={{ height: 30, width: 28}}> 
                <Pawn pawnData={pawns[1]}/> 
              </View>
            )}
          </View>
        </View>
        <View style={styles.pawnContainer}>
          <View style={[styles.pawnCircle, { backgroundColor: Colors[pawns[2].color] }]}>
            {pawns[2]?.moves === 0 && (
              <View style={{ height: 30, width: 28}}> 
                <Pawn pawnData={pawns[2]}/> 
              </View>
            )}
          </View>
          <View style={[styles.pawnCircle, { backgroundColor: Colors[pawns[3].color] }]}>
            {pawns[3]?.moves === 0 && (
              <View style={{ height: 30, width: 28}}> 
                <Pawn pawnData={pawns[3]}/> 
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "40%",
    height: "100%",
    borderWidth: 1,
    borderColor: Colors.borderColor,
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    height: "70%",
    width: "70%",
    backgroundColor: "white",
    borderColor: Colors.borderColor,
    borderWidth: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  pawnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "40%",
    width: "100%",
  },
  pawnCircle: {
    height: "80%",
    width: "32%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,
  },
});

export default Pocket;
