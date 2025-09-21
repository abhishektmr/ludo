import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import witch from "../../assets/animation/witch.json";
import dimensions from "../../constants/dimensions";
import { playSound } from "../../helpers/SoundUtility";

export default function WitchAnimation() {
  const witchAnim = useRef(new Animated.Value(-dimensions.deviceWidth * 1.2)).current;
  const scaleXAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    const loopAnimation = () => Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(witchAnim, {
            toValue: -60,
            duration: 1500,
            useNativeDriver: true
          }),
          Animated.timing(scaleXAnim, {
            toValue: -1,
            duration: 0,
            useNativeDriver: true
          })
        ]),
        Animated.delay(1500),
        Animated.parallel([
          Animated.timing(witchAnim, {
            toValue: dimensions.deviceWidth,
            duration: 3000,
            useNativeDriver: true
          }),
          Animated.timing(scaleXAnim, {
            toValue: -1,
            duration: 0,
            useNativeDriver: true
          })
        ]),
        Animated.parallel([Animated.timing(witchAnim, {
            toValue: -60,
            duration: 3000,
            useNativeDriver: true
          }),
          Animated.timing(scaleXAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true
          })]),
        Animated.delay(1500),
        Animated.parallel([Animated.timing(witchAnim, {
            toValue: -dimensions.deviceWidth * 1.2,
            duration: 3000,
            useNativeDriver: true
          }),
          Animated.timing(scaleXAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true
          })])
      ])
    ).start();

    const cleanUpAnimation = () => {
      Animated.timing(witchAnim).stop();
      Animated.timing(scaleXAnim).stop();
    }

    loopAnimation();

    return cleanUpAnimation;

  }, [witchAnim, scaleXAnim]);

  return (
    <Animated.View style={[styles.witchContainer, {transform: [{translateX: witchAnim}, {scaleX: scaleXAnim}]}]}>
      <Pressable onPress={() => {
        const random = Math.floor(Math.random() * 3) + 1;
        console.log("random number ", random);
        playSound(`girl${random}`)
      }}>
        <LottieView
          hardwareAccelerationAndroid
          source={witch}
          autoPlay
          speed={1}
          style={[styles.witch, { transform: [{ rotate: "25deg" }] }]}
        ></LottieView>
      </Pressable>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  witchContainer: {
    position: "absolute",
    top: "70%",
    left: "25%",
    // borderColor: "red",
    // borderWidth: 2,
  },
  witch: {
    height: 150,
    width: 150,
  },
});
