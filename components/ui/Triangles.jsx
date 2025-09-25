import Svg, {Polygon} from "react-native-svg";
import dimensions from "../../constants/dimensions";
import { Colors } from "../../constants/Colors";

const Triangles = () => {
    const { deviceWidth } = dimensions;
    const size = deviceWidth/5;
    return(
        <Svg width="100%" height="100%">
            {/* red triangle */}
            <Polygon points={`0,${size} ${size},${size} ${size/2},${size/2}`} fill={Colors.red}/>

            {/* green triangle */}
            <Polygon points={`0,0 ${size/2},${size/2} 0,${size}`} fill={Colors.green}/>

            {/* blue triangle */}
            <Polygon points={`0,0 ${size/2},${size/2} ${size},0`} fill={Colors.blue}/>

            {/* yellow triangle */}
            <Polygon points={`${size},0 ${size/2},${size/2} ${size},${size}`} fill={Colors.yellow}/>
        </Svg>
    );
}

export default Triangles;