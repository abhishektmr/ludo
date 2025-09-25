import { useSelector } from "react-redux";
import Triangles from "./Triangles";
import { selectAllPawns } from "../../redux/selectors";
import { Colors } from "../../constants/Colors";
import { Image, Text, View } from "react-native";
import { pawnImage } from "../../util/gameUtils";
import { triangleAnchors } from "../../util/gameUtils";
import CompletedPawns from "./completedPawns";

export default function Destination() {
    const allPawns = useSelector(selectAllPawns);
    const groupedPawns = {
        red: allPawns.filter(p => p.color === "red" && p.moves === 57),
        green: allPawns.filter(p => p.color === "green" && p.moves === 57),
        blue: allPawns.filter(p => p.color === "blue" && p.moves === 57),
        yellow: allPawns.filter(p => p.color === "yellow" && p.moves === 57)
    };
    console.log("Destination rendered ");
    console.log("grouped red pawns ", groupedPawns.red);
    console.log("grouped green pawns ", groupedPawns.green);
    console.log("grouped blue pawns ", groupedPawns.blue);
    console.log("grouped yellow pawns ", groupedPawns.yellow);

    return(
        <View style={{height: "100%", width: "100%", position: "relative"}}>
            <Triangles/>
            <CompletedPawns pawns={groupedPawns.red} baseX={triangleAnchors.red.x} baseY={triangleAnchors.red.y}/>
            <CompletedPawns pawns={groupedPawns.green} baseX={triangleAnchors.green.x} baseY={triangleAnchors.green.y}/>
            <CompletedPawns pawns={groupedPawns.blue} baseX={triangleAnchors.blue.x} baseY={triangleAnchors.blue.y}/>
            <CompletedPawns pawns={groupedPawns.yellow} baseX={triangleAnchors.yellow.x} baseY={triangleAnchors.yellow.y}/>
        </View>
    );
}