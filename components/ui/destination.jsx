// import { useSelector } from "react-redux";
// import Triangles from "./Triangles";
// import { selectAllPawns } from "../../redux/selectors";
// import { View } from "react-native";
// import { triangleAnchors } from "../../util/gameUtils";
// import CompletedPawns from "./completedPawns";

// export default function Destination() {
//     const allPawns = useSelector(selectAllPawns);
//     const groupedPawns = {
//         red: allPawns.filter(p => p.color === "red" && p.moves === 57),
//         green: allPawns.filter(p => p.color === "green" && p.moves === 57),
//         blue: allPawns.filter(p => p.color === "blue" && p.moves === 57),
//         yellow: allPawns.filter(p => p.color === "yellow" && p.moves === 57)
//     };
//     console.log("Destination rendered ");
//     console.log("grouped red pawns ", groupedPawns.red);
//     console.log("grouped green pawns ", groupedPawns.green);
//     console.log("grouped blue pawns ", groupedPawns.blue);
//     console.log("grouped yellow pawns ", groupedPawns.yellow);

//     return(
//         <View style={{height: "100%", width: "100%", position: "relative"}}>
//             <Triangles/>
//             <CompletedPawns color="red" completedPawns={groupedPawns.red}/>
//             <CompletedPawns color="green" completedPawns={groupedPawns.green}/>
//             <CompletedPawns color="blue" completedPawns={groupedPawns.blue}/>
//             <CompletedPawns color="yellow" completedPawns={groupedPawns.yellow}/>
//         </View>
//     );
// }

import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import Svg, { Polygon } from "react-native-svg";
import { Colors } from "../../constants/Colors";
import dimensions from "../../constants/dimensions";
import Pawn from "./pawn";
import { selectCompletedPawns } from "../../redux/selectors";
import { rotatePawn } from "../../helpers/RotateUtility";

const { deviceWidth } = dimensions;
const size = deviceWidth / 5;

// Calculate positions for completed pawns in each triangle
const getCompletedPawnPositions = (triangleColor, pawnCount) => {
  const positions = [];
  const centerX = size / 2;
  const centerY = size / 2;
  
  if (pawnCount === 1) {
    // Two pawns - arranged based on triangle orientation
    if (triangleColor === 'red') {
      positions.push({ x: centerX - 10, y: centerY + 20 });
    } else if (triangleColor === 'green') {
      positions.push({ x: centerX - 40, y: centerY - 10 });
    } else if (triangleColor === 'blue') {
      positions.push({ x: centerX - 10, y: centerY - 40 });
    } else {
      positions.push({ x: centerX + 20, y: centerY - 10 });
    }
  } else if (pawnCount === 2) {
    // Two pawns - arranged based on triangle orientation
    if (triangleColor === 'red') {
      positions.push({ x: centerX - (size * .3), y: centerY + (size * .27) });
      positions.push({ x: centerX + 1.5, y: centerY + (size * .27) });
    } else if (triangleColor === 'green') {
      positions.push({ x: centerX - (size * .54), y: centerY - (size * .3) });
      positions.push({ x: centerX - (size * .54), y: centerY + 1.5 });
    } else if (triangleColor === 'blue') {
      positions.push({ x: centerX - (size * .3), y: centerY - (size * .54) });
      positions.push({ x: centerX + 1.7, y: centerY - (size * .54) });
    } else {
      positions.push({ x: centerX + (size * .27), y: centerY - (size * .3) });
      positions.push({ x: centerX + (size * .27), y: centerY + 1.5 });
    }
  } else if (pawnCount === 3) {
    if (triangleColor === 'red') {
      positions.push({ x: centerX - (size * .3), y: centerY + (size * .27) });
      positions.push({ x: centerX + (size * .03), y: centerY + (size * .27) });
      positions.push({ x: centerX - (size * .14), y: centerY + (size * .1) });
    } else if (triangleColor === 'green') {
      positions.push({ x: centerX - (size * .54), y: centerY - (size * .3) });
      positions.push({ x: centerX - (size * .54), y: centerY + (size * .03) });
      positions.push({ x: centerX - (size * .4), y: centerY - (size * .13) });
    } else if (triangleColor === 'blue') {
      positions.push({ x: centerX - (size * .3), y: centerY - (size * .54) });
      positions.push({ x: centerX + (size * .03), y: centerY - (size * .54) });
      positions.push({ x: centerX - (size * .14), y: centerY - (size * .35) });
    } else {
      positions.push({ x: centerX + (size * .27), y: centerY - (size * .3) });
      positions.push({ x: centerX + (size * .27), y: centerY + (size * .03) });
      positions.push({ x: centerX + (size * .13), y: centerY - (size * .13) });
    }
  } else if (pawnCount === 4) {
    if (triangleColor === 'red') {
      positions.push({ x: centerX - (size * .3), y: centerY + (size * .27) });
      positions.push({ x: centerX + (size * .03), y: centerY + (size * .27) });
      positions.push({ x: centerX - (size * .14), y: centerY + (size * .1) });
      positions.push({ x: centerX - (size * .14), y: centerY + (size * .34) });
    } else if (triangleColor === 'green') {
      positions.push({ x: centerX - (size * .54), y: centerY - (size * .3) });
      positions.push({ x: centerX - (size * .54), y: centerY + (size * .03) });
      positions.push({ x: centerX - (size * .4), y: centerY - (size * .13) });
      positions.push({ x: centerX - (size * .6), y: centerY - (size * .13) });
    } else if (triangleColor === 'blue') {
      positions.push({ x: centerX - (size * .3), y: centerY - (size * .54) });
      positions.push({ x: centerX + (size * .03), y: centerY - (size * .54) });
      positions.push({ x: centerX - (size * .14), y: centerY - (size * .35) });
      positions.push({ x: centerX - (size * .14), y: centerY - (size * .6) });
    } else {
      positions.push({ x: centerX + (size * .27), y: centerY - (size * .3) });
      positions.push({ x: centerX + (size * .27), y: centerY + (size * .03) });
      positions.push({ x: centerX + (size * .13), y: centerY - (size * .13) });
      positions.push({ x: centerX + (size * .35), y: centerY - (size * .13) });
    }
  }
  
  return positions;
};

const Destination = () => {
  // Get all completed pawns (moves === 57) grouped by color
  const completedPawns = useSelector(selectCompletedPawns);

  console.log("Destination component: completedPawns: ", completedPawns);

  return (
    <View style={styles.container}>
      {/* Four colored triangles */}
      <Svg width="100%" height="100%" style={styles.svg}>
        {/* Red triangle (bottom) */}
        <Polygon 
          points={`0,${size} ${size},${size} ${size/2},${size/2}`} 
          fill={Colors.red}
        />
        
        {/* Green triangle (left) */}
        <Polygon 
          points={`0,0 ${size/2},${size/2} 0,${size}`} 
          fill={Colors.green}
        />
        
        {/* Blue triangle (top) */}
        <Polygon 
          points={`0,0 ${size/2},${size/2} ${size},0`} 
          fill={Colors.blue}
        />
        
        {/* Yellow triangle (right) */}
        <Polygon 
          points={`${size},0 ${size/2},${size/2} ${size},${size}`} 
          fill={Colors.yellow}
        />
      </Svg>

      {/* Render completed pawns for each color */}
      {Object.entries(completedPawns).map(([color, pawns]) => {
        if (pawns.length === 0) return null;
        
        const positions = getCompletedPawnPositions(color, pawns.length);
        
        return pawns.map((pawn, index) => {
          const pos = positions[index];
          return (
            <View
              key={pawn.id}
              style={[
                styles.pawnWrapper,
                {
                  left: pos.x,
                  top: pos.y,
                },{transform: [{rotate: rotatePawn(pawn.color)}]}
              ]}
            >
              <Pawn pawnData={pawn} showHollowCircle={false} />
            </View>
          );
        });
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    position: "relative",
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  pawnWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: 20,
    width: 20,
    // transform: [{ translateX: -12 }, { translateY: -12 }], // Center the pawn
    zIndex: 10,
  },
});

export default Destination;