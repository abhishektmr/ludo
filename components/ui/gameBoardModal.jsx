import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { playSound } from "../../helpers/SoundUtility";
import { resetGame } from "../../redux/gameSlice";
import { selectAllPawns } from "../../redux/selectors";
import GradientButton from "./gradientButton";
import Wrapper from "./wrapper";

export default function GameBoardModal({ showModal, onPress }) {
  const router = useRouter();
  const allPawns = useSelector(selectAllPawns);
  const dispatch = useDispatch();

  return (
    <Modal visible={showModal} transparent={false} animationType="slide">
      <Wrapper>
        <Pressable style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={onPress}>
          {/* <ImageBackground resizeMode="cover" source={bg} style={styles.bgimage}> */}
          <View style={styles.container}>
            <LinearGradient
              colors={["#0f0c29", "#302b63", "#24243e"]}
              style={styles.btnContainer}
            >
s
              {allPawns.some(p => p.moves > 1) && <GradientButton title="RESUME" onPress={onPress} />}
              
              <GradientButton
                title="NEW GAME"
                onPress={() => {
                  dispatch(resetGame());
                  router.replace("/gameBoard");
                  playSound("game_start");
                }}
              />
              <GradientButton title="HOME" onPress={() => {router.replace("/home")}} />
            </LinearGradient>
          </View>
        </Pressable>
      </Wrapper>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "gold",
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  btnContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "gold",
  },
});
