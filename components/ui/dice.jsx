import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import diceRoll from "../../assets/animation/diceroll.json";
import arrow from "../../assets/images/arrow.png";
import { BackgroundImage } from "../../helpers/GetIcons";
import { rollDice } from "../../redux/gameSlice";
import {
  selectCurrentPlayerId,
  selectIsDiceRolled,
} from "../../redux/selectors";

console.log("Dice file reexecuted");
const Dice = React.memo(({ color, rotate, playerId, diceRollResult }) => {
  const dispatch = useDispatch();
  const currentPlayerId = useSelector(selectCurrentPlayerId);
  const isDiceRolled = useSelector(selectIsDiceRolled);
  const pawnIcon = BackgroundImage.GetImage(color);
  const diceIcon = BackgroundImage.GetImage(diceRollResult);
  console.log("Dice component rerendered: currentPlayerId is ", currentPlayerId, "playerId is ", playerId, " isDiceRolled: ", isDiceRolled);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const arrowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animatedArrow = Animated.loop(
      Animated.sequence([
        Animated.timing(arrowAnim, {
          toValue: 10,
          duration: 600,
          easing: Easing.out(Easing.linear),
          useNativeDriver: true,
        }),
        Animated.timing(arrowAnim, {
          toValue: -10,
          duration: 400,
          easing: Easing.in(Easing.linear),
          useNativeDriver: true,
        }),
      ])
    );

    animatedArrow.start();
  }, [currentPlayerId, isDiceRolled]);

  const handleDiceRoll = () => {
    dispatch(rollDice());
  };

  return (
    <View
      style={[styles.container, { transform: [{ scaleX: rotate ? -1 : 1 }] }]}
    >
      <View style={styles.border1}>
        <LinearGradient
          style={styles.linearGradient}
          colors={["#0052be", "#f59fcb", "#97c6c9"]}
          start={{ x: 0, y: 1.5 }}
          end={{ x: 2, y: 1.5 }}
        >
          <View style={styles.pawnContainer}>
            <Image source={pawnIcon} style={styles.pawn} />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.border2}>
        <View style={styles.diceContainer}>
          {playerId === currentPlayerId && (
            <>
              <TouchableOpacity
                activeOpacity={0.4}
                disabled={isDiceRolled}
                onPress={handleDiceRoll}
              >
                <Image source={diceIcon} style={styles.dice} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {playerId === currentPlayerId && !isDiceRolled && (
        <Animated.View
          style={{
            alignItems: "center",
            justifyContent: "center",
            transform: [{ translateX: arrowAnim }],
          }}
        >
          <Image source={arrow} style={{ height: 20, width: 30 }} />
        </Animated.View>
      )}

      {playerId == currentPlayerId && false && (
        <LottieView
          source={diceRoll}
          style={styles.rollingDice}
          hardwareAccelerationAndroid
          cacheComposition={true}
          autoPlay
          loop={false}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  border1: {
    borderWidth: 6,
    borderRightWidth: 0,
    borderColor: "#f0ce2c",
  },
  border2: {
    borderWidth: 6,
    // padding: 1,
    borderRadius: 10,
    borderColor: "#f0ce2c",
  },
  linearGradient: {
    padding: 1,
    borderRightWidth: 0,
    // borderWidth: 3,
    // borderColor: "#f0ce2c",
    justifyContent: "center",
    alignItems: "center",
  },
  pawn: {
    height: 30,
    width: 30,
  },
  pawnContainer: {
    height: 38,
    width: 38,
    // borderColor: "gold",
    justifyContent: "center",
    alignItems: "center",
  },
  dice: {
    height: 45,
    width: 45,
  },
  diceContainer: {
    width: 55,
    height: 55,
    backgroundColor: "white",
    borderRadius: 5,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  rollingDice: {
    height: 80,
    width: 80,
    zIndex: 99,
    position: "absolute",
    top: -25,
  },
  diceGradient: {
    borderColor: "#f0ce2c",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Dice;
