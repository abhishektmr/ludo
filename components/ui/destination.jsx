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
import { createSelector } from "@reduxjs/toolkit";
import { selectCompletedPawns } from "../../redux/selectors";

const { deviceWidth } = dimensions;
const size = deviceWidth / 5;

// Calculate positions for completed pawns in each triangle
const getCompletedPawnPositions = (triangleColor, pawnCount) => {
  const positions = [];
  const centerX = size / 2;
  const centerY = size / 2;
  
  // Base offset from center (in percentages)
  const offset = 0.20; // 15% of triangle size
  
  if (pawnCount === 1) {
    // Two pawns - arranged based on triangle orientation
    if (triangleColor === 'red') {
      positions.push({ x: centerX, y: centerY + (centerY/2) });
    } else if (triangleColor === 'green') {
      positions.push({ x: centerX - (centerY/2), y: centerY });
    } else if (triangleColor === 'blue') {
      positions.push({ x: centerX, y: centerY - (centerY/2) });
    } else {
      positions.push({ x: centerX + (centerY/2), y: centerY });
    }
  } else if (pawnCount === 2) {
    // Two pawns - arranged based on triangle orientation
    if (triangleColor === 'red') {
      positions.push({ x: centerX - (size * offset *.6), y: centerY + (size * 2*offset) });
      positions.push({ x: centerX + (size * offset *.6), y: centerY + (size * 2*offset) });
    } else if (triangleColor === 'green') {
      positions.push({ x: centerX - size * offset, y: centerY*1.1 });
      positions.push({ x: centerX - size * 2*offset, y: centerY*1.1 });
    } else if (triangleColor === 'blue') {
      positions.push({ x: centerX - (size * offset *.6), y: centerY - (size * offset * 1.1) });
      positions.push({ x: centerX + (size * offset *.6), y: centerY - (size * offset * 1.1) });
    } else {
      positions.push({ x: centerX + size * offset, y: centerY*1.1 });
      positions.push({ x: centerX + size * 2*offset, y: centerY*1.1 });
    }
  } else if (pawnCount === 3) {
    // Three pawns - triangle formation pointing toward triangle apex
    const gap = size * offset * 1.2;
    if (triangleColor === 'red') {
      // Red (bottom): triangle pointing down
      positions.push({ x: centerX, y: centerY + (size * 0.1) });
      positions.push({ x: centerX - gap * 0.7, y: centerY + gap * 0.6 });
      positions.push({ x: centerX + gap * 0.7, y: centerY + gap * 0.6 });
    } else if (triangleColor === 'green') {
      positions.push({ x: centerX - (size * offset), y: centerY });
      positions.push({ x: centerX - 2*(size * offset), y: centerY + 2*(size * offset * .8) });
      positions.push({ x: centerX - 2*(size * offset), y: centerY - 2*(size * offset * .4) });
    } else if (triangleColor === 'blue') {
      // Blue (top): triangle pointing up
      positions.push({ x: centerX, y: centerY - (size * 0.1) });
      positions.push({ x: centerX - gap * 0.7, y: centerY - gap * 0.6 });
      positions.push({ x: centerX + gap * 0.7, y: centerY - gap * 0.6 });
    } else {
      positions.push({ x: centerX + (size * offset), y: centerY });
      positions.push({ x: centerX + 2*(size * offset), y: centerY + 2*(size * offset * .8) });
      positions.push({ x: centerX + 2*(size * offset), y: centerY - 2*(size * offset * .4) });
    }
  } else if (pawnCount === 4) {
    // Four pawns - diamond/square formation
    const gap = size * offset * 1.3;
    positions.push({ x: centerX - gap, y: centerY });
    positions.push({ x: centerX, y: centerY - gap });
    positions.push({ x: centerX + gap, y: centerY });
    positions.push({ x: centerX, y: centerY + gap });
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
                }
              ]}
            >
              <Pawn pawnData={pawn} />
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
    position: "absolute",
    height: 20,
    width: 20,
    transform: [{ translateX: -12 }, { translateY: -12 }], // Center the pawn
    zIndex: 10,
  },
});

export default Destination;