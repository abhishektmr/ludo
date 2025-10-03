import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import logo from "../assets/images/logo.png";
import WitchAnimation from "../components/animation/witchAnimation";
import GradientButton from "../components/ui/gradientButton";
import Wrapper from "../components/ui/wrapper";
import dimensions from "../constants/dimensions";
import { loadSound, playSound } from "../helpers/SoundUtility";
import AppLoading from "./appLoading";
import { useDispatch } from "react-redux";
import { setGameState } from "../redux/gameSlice";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const soundRef = useRef(null);
  const isFocused = useIsFocused();
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  const [sound, setSound] = useState(null);
  const [fontsLoaded] = useFonts({
    "Philosopher-Bold": require("../assets/fonts/Philosopher-Bold.ttf"),
  });

  useEffect(() => {
    (async () => {
      const keys = await AsyncStorage.getAllKeys();
      console.log("before Clear", keys);
      // await AsyncStorage.clear();
      const rootKeyData = await AsyncStorage.getItem("persist:game");
      const parsed = JSON.parse(rootKeyData); 
      console.log("gameData: ", JSON.parse(parsed.game));


//       const newGameData = {
//   "currentPlayerId": 2,
//   "diceRollId": 42,
//   "diceRollResult": 2,
//   "fireWorks": false,
//   "isDiceRolled": false,
//   "players": [
//     {
//       "id": 1,
//       "pawns": [
//         {
//           "color": "red",
//           "id": "A1",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         },
//         {
//           "color": "red",
//           "id": "A2",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         },
//         {
//           "color": "red",
//           "id": "A3",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         },
//         {
//           "color": "red",
//           "id": "A4",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         }
//       ]
//     },
//     {
//       "id": 2,
//       "pawns": [
//         {
//           "color": "green",
//           "id": "B1",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         },
//         {
//           "color": "green",
//           "id": "B2",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         },
//         {
//           "color": "green",
//           "id": "B3",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         },
//         {
//           "color": "green",
//           "id": "B4",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         }
//       ]
//     },
//     {
//       "id": 3,
//       "pawns": [
//         {
//           "color": "blue",
//           "id": "C1",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         },
//         {
//           "color": "blue",
//           "id": "C2",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         },
//         {
//           "color": "blue",
//           "id": "C3",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         },
//         {
//           "color": "blue",
//           "id": "C4",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         }
//       ]
//     },
//     {
//       "id": 4,
//       "pawns": [
//         {
//           "color": "yellow",
//           "id": "D1",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         },
//         {
//           "color": "yellow",
//           "id": "D2",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         },
//         {
//           "color": "yellow",
//           "id": "D3",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         },
//         {
//           "color": "yellow",
//           "id": "D4",
//           "isKilled": false,
//           "moves": 57,
//           "onHomePath": true,
//           "tileId": null
//         }
//       ]
//     }
//   ],
//   "winner": 0
// };
//        //update Redux immediately
//       dispatch(setGameState(newGameData));
//       await AsyncStorage.setItem("persist:game", JSON.stringify({game: JSON.stringify(newGameData)}));
// const rootKeyData = await AsyncStorage.getItem("persist:game");
// const parsed = JSON.parse(rootKeyData); 
// console.log("gameData: ", parsed.game);
    })();

    if (fontsLoaded) {
      setTimeout(() => setIsFontsLoaded(true), 2000);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    //load sound
    (async () => {
      const sound = await loadSound("home");
      setSound(sound);
      soundRef.current = sound;
    })();

    return async () => {
      // Cleanup when component unmounts
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (soundRef.current) {
        if (isFocused) {
          await soundRef.current.playAsync();
        } else {
          await soundRef.current.pauseAsync();
        }
      }
    })();
  }, [sound]);

  if (!isFontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Wrapper additionalStyle={styles.mainContainer}>
      <Animated.View
        style={styles.imgContainer}
        entering={FadeIn.duration(500)}
      >
        <Image source={logo} style={styles.img} />
      </Animated.View>
      <GradientButton
        title="NEW GAME"
        onPress={() => {
          router.replace("/gameBoard");
          playSound("game_start");
        }}
      />
      <GradientButton title="Vs CPU" onPress={() => {}} />
      <GradientButton title="2 Vs 2" onPress={() => {}} />
      <WitchAnimation />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "flex-start",
  },
  imgContainer: {
    width: dimensions.deviceWidth * 0.6,
    height: dimensions.deviceHeight * 0.2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    alignSelf: "center",
  },
  img: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
});
