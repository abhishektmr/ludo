import { useEffect, useState } from "react";
import { Animated, Image, StyleSheet, useAnimatedValue } from "react-native";
import logo from "../assets/images/logo.png";
import Wrapper from "../components/ui/wrapper";
import dimensions from "../constants/dimensions";

const { deviceWidth } = dimensions;

export default function AppLoading() {
  const [isStop] = useState(false);
  const scale = useAnimatedValue(1);

  useEffect(() => {
    const breathingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1 ,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    if(!isStop) {
        breathingAnimation.start();
    }

    return () => {
        breathingAnimation.stop();
    }
  }, [isStop]);

  return (
    <Wrapper>
      <Animated.View style={[styles.imgContainer, {transform: [{scale}]}]}>
        <Image source={logo} style={styles.img} />
      </Animated.View>
      {/* <ActivityIndicator size="large"/> */}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    height: deviceWidth,
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    height: "60%",
    width: "60%",
    resizeMode: "contain",
  },
});
