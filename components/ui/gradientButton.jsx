import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { playSound } from "../../helpers/SoundUtility";

function GradientButton({ title, onPress, iconColor = "#d5be3e" }) {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btnContainer}
        onPress={() => {
          playSound("ui");
          onPress();
        }}
      >
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.btn}
        >
          <View>
            {title == "RESUME" ? (
              <Feather name="play" size={24} color={iconColor} />
            ) : title == "NEW GAME" ? (
              <Feather name="play" size={24} color={iconColor} />
            ) : title == "Vs CPU" ? (
              <Feather name="airplay" size={24} color={iconColor} />
            ) : title == "HOME" ? (
              <Feather name="home" size={24} color={iconColor} />
            ) : <Feather name="user" size={24} color={iconColor}/>
          }
          </View>
          <Text style={styles.btnText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 10,
    elevation: 50,
    shadowColor: "#d5be3e",
  },
  btnContainer: {
    borderRadius: 10,
    borderColor: "#d5be3e",
    borderWidth: 5,
    elevation: 50,
    // backgroundColor: "white",
    shadowColor: "#d5be3e",
    width: 220,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    elevation: 50,
    shadowColor: "#192f6a",
    flexDirection: "row",
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    width: "70%",
    textAlign: "center",
    fontFamily: "Philosopher-bold",
  },
});

export default GradientButton;
