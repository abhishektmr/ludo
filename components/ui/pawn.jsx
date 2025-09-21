import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import bluePawn from "../../assets/images/piles/blue.png";
import greenPawn from "../../assets/images/piles/green.png";
import redPawn from "../../assets/images/piles/red.png";
import yellowPawn from "../../assets/images/piles/yellow.png";
import pointed_circle from "../../assets/images/pointed_circle.png";
import { movePawn } from "../../redux/gameSlice";
import { selectCurrentPlayerId, selectIsDiceRolled } from "../../redux/selectors";

const Pawn = React.memo(({ pawnData }) => {
  // console.log("Pawn component rerendered ", pawnData);
  const dispatch = useDispatch();
  const currentPlayerId = useSelector(selectCurrentPlayerId);
  const playerId = useSelector(state => state.game.players.find(p => p.pawns.some(pawn => pawn.id === pawnData.id))?.id);
  const diceRollResult = useSelector((state) => currentPlayerId === playerId ? state.game.diceRollResult : null);
  const isDiceRolled = useSelector(selectIsDiceRolled);
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotationAnimation = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    rotationAnimation.start();

    return () => {
      rotationAnimation.stop();
      rotate.setValue(0);
    };
  }, [rotate]);

  const rotationInterpolate = useMemo(() => {
    return rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
  }, [rotate]);

  const canMoveForward = useMemo(() => {
    return (
      currentPlayerId === playerId &&
      pawnData.moves != 0 &&
      pawnData.moves + diceRollResult <= 57
    );
  }, [currentPlayerId, diceRollResult, pawnData.moves]);

  const showPointedCircle = useMemo(() => {
    return (
      currentPlayerId === playerId &&
      ((diceRollResult === 6 && pawnData.moves === 0) || canMoveForward)
    );
  }, [currentPlayerId, diceRollResult, pawnData.moves, canMoveForward]);

  const isTouchDisabled = !showPointedCircle;

  const pawnImage = useMemo(() => {
    switch (pawnData.color) {
      case "red":
        return redPawn;
      case "green":
        return greenPawn;
      case "blue":
        return bluePawn;
      case "yellow":
        return yellowPawn;
      default:
        return null;
    }
  }, [pawnData.color]);

  const handleMovePawn = () => {
    console.log("handleMovePawn called for player ", playerId);
    dispatch(movePawn({ playerId, pawnId: pawnData.id }));
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      disabled={isTouchDisabled}
      onPress={handleMovePawn}
    >
      <View style={styles.inner}>
      <View style={styles.hollowCircle}>
        {showPointedCircle && isDiceRolled && (
          <Animated.Image
            source={pointed_circle}
            style={[
              styles.pointedCircle,
              { transform: [{ rotate: rotationInterpolate }] },
            ]}
          />
        )}
      </View>

      <Image source={pawnImage} style={[styles.pawnImage, showPointedCircle && isDiceRolled ? { height: 30, top: "-45%" } : null]}/>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    alignSelf: "center",
  },
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hollowCircle: {
    width: "50%", // scales with parent container size
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  pointedCircle: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  pawnImage: {
    position: "absolute",
    height: "90%",
    width: "80%",
    top: "-28%",
  },
});

export default Pawn;