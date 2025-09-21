import { ImageBackground, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import bg from "../../assets/images/bg.jpeg";

export default function Wrapper({children, additionalStyle}) {
    return (
        <ImageBackground source={bg} resizeMode="cover" style={[styles.container]}>
            <StatusBar/>
            <SafeAreaView style={[styles.safeAreaView, additionalStyle]}>
                {children}
            </SafeAreaView>
        </ImageBackground>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent: "center",
        alignItems: "center"
    },
    safeAreaView: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }
});