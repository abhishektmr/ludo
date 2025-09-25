import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, ImageBackground, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import bg from "../assets/images/squareContainerBG.jpg";
import start_game from "../assets/images/start.png";
import Board from "../components/ui/board";
import Dice from "../components/ui/dice";
import GameBoardModal from "../components/ui/gameBoardModal";
import MenuIcon from "../components/ui/menuIcon";
import { Colors } from "../constants/Colors";
import { playSound } from "../helpers/SoundUtility";
import {
  selectCurrentPlayerId,
  selectDiceRollId,
  selectDiceRollResult
} from "../redux/selectors";

export default function GameBoard() {
  console.log("GameBoard component rerendered");
  const currentPlayerId = useSelector(selectCurrentPlayerId);
  const diceRollResult = useSelector(selectDiceRollResult);
  const diceRollId = useSelector(selectDiceRollId);

  const isFocused = useIsFocused();
  const opacity = useRef(new Animated.Value(1)).current;
  const [showStartGameImage, setShowStartGameImage] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isFocused) {
      const startGameAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );

      startGameAnimation.start();

      const timeout = setTimeout(() => {
        setShowStartGameImage(false);
        startGameAnimation.stop();
      }, 1500);

      return () => {
        startGameAnimation.stop();
        setShowStartGameImage(false);
        clearTimeout(timeout);
      };
    }
  }, [isFocused]);

  // useCallback does not create a new function reference until the dependency array changes
  const handleMenuPress = useCallback(() => {
    playSound("ui");
    setShowModal(true);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground resizeMode="cover" source={bg} style={styles.bgimage}>
        <MenuIcon onPress={handleMenuPress} />
        <View
          style={styles.diceContainer}
          // pointerEvents={isDiceTouch ? "none" : "auto"}
        >
          <Dice color={Colors.green} playerId={2} diceRollResult={currentPlayerId === 2 ? diceRollResult : null}/>
          <Dice color={Colors.blue} rotate playerId={3} diceRollResult={currentPlayerId === 3 ? diceRollResult : null}/>
        </View>

        {showStartGameImage && (
          <Animated.Image
            source={start_game}
            style={[styles.startgame, { opacity }]}
          />
        )}

        <Board/>

        <View style={styles.diceContainer}>
          <Dice color={Colors.red} playerId={1} diceRollResult={currentPlayerId === 1 ? diceRollResult : null}/>
          <Dice color={Colors.yellow} rotate playerId={4} diceRollResult={currentPlayerId === 4 ? diceRollResult : null}/>
        </View>

        <GameBoardModal
          showModal={showModal}
          onPress={() => setShowModal(false)}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgimage: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  startgame: {
    alignSelf: "center",
    zIndex: 10,
    position: "absolute",
    height: 180,
    width: 350,
    resizeMode: "contain",
  },
  diceContainer: {
    paddingHorizontal: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
