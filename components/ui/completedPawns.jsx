import { Image, View } from "react-native";
import { getPawnPositions, pawnImage } from "../../util/gameUtils";

const CompletedPawns = ({ pawns, baseX, baseY }) => {
  console.log("Completed pawns rendered with pawns length ", pawns.length);
  const positions = getPawnPositions(pawns.length);

  return (
    <View style={{ position: "absolute", left: baseX, top: baseY }}>
      {pawns.map((pawn, i) => {
        const pos = positions[i % positions.length];
        return (
          <View key={i} style={{position: "absolute", left: pos.x, top: pos.y}}>
            <Image source={pawnImage(pawn.color)} style={{height: 20, width: 18}}/>
          </View>
        );
      })}
    </View>
  );
};

export default CompletedPawns;
