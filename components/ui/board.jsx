import { StyleSheet, View } from "react-native";
import dimensions from "../../constants/dimensions";
import { Path1Data, Path2Data, Path3Data, Path4Data } from "../../helpers/PathData";
import Pocket from "./pocket";
import Tile from "./tile";
import Centre from "./Triangles";
import Triangles from "./Triangles";
import Destination from "./destination";
const { deviceWidth } = dimensions;

const Board = () => {
  console.log("Board component rerendered");

  return (
    <View style={styles.boardContainer}>
      <View style={styles.pocketContainer}>
        <Pocket playerId={2} />
        <View style={styles.verticalPath}>
          {Path3Data.map(path => (
            <Tile
              key={path.id}
              id={path.id}
              backgroundColor={path.color}
              isSafePoint={path.isSafePoint}
              isArrowPoint={path.isArrowPoint}
              arrowColor={path.arrowColor}
              height="16.666%"
              width="33.333%"
            />
          ))}
        </View>
        <Pocket playerId={3} />
      </View>

      <View style={styles.horizontalPathContainer}>
        <View style={styles.horizontalPath}>
          {Path2Data.map((path) => (
            <Tile
              key={path.id}
              id={path.id}
              backgroundColor={path.color}
              isSafePoint={path.isSafePoint}
              isArrowPoint={path.isArrowPoint}
              arrowColor={path.arrowColor}
              width="16.666%"
              height="33.333%"
            />
          ))}
        </View>

        <View style={styles.centreSquare}>
            <Destination/>
        </View> 

        <View style={styles.horizontalPath}>
          {Path4Data.map((path) => (
            <Tile
              key={path.id}
              id={path.id}
              backgroundColor={path.color}
              isSafePoint={path.isSafePoint}
              isArrowPoint={path.isArrowPoint}
              arrowColor={path.arrowColor}
              width="16.666%"
              height="33.333%"
            />
          ))}
        </View>
      </View>

      <View style={styles.pocketContainer}>
        <Pocket playerId={1} />
        <View style={styles.verticalPath}>
          {Path1Data.map((path) => (
            <Tile
              key={path.id}
              id={path.id}
              backgroundColor={path.color}
              isSafePoint={path.isSafePoint}
              isArrowPoint={path.isArrowPoint}
              arrowColor={path.arrowColor}
              height="16.666%"
              width="33.333%"
            />
          ))}
        </View>
        <Pocket playerId={4} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    width: deviceWidth,
    height: deviceWidth,
    padding: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  pocketContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "40%",
    backgroundColor: "white",
  },
  verticalPath: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "20%",
    height: "100%",
  },
  horizontalPathContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "20%",
    width: "100%",
  },
  horizontalPath: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "100%",
    width: "40%",
  },
  centreSquare: {
    alignItems: "center",
    ustifyContent: "center", 
    height: "100%", 
    width: "20%",
    backgroundColor: "pink"
  }
});

export default Board;