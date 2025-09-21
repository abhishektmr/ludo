import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import menu from "../../assets/images/menu.png";

// React.memo makes a child component to render only and only if the prop changes. Prop is onPress in this component
// It works in combination with useCallBack() which is in parent component.
const MenuIcon = React.memo(({ onPress }) => {
  return (
    <TouchableOpacity style={styles.menuContainer} onPress={onPress}>
      <Image source={menu} style={styles.menu} />
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
    menuContainer: {
        position: "absolute",
        top: 50,
        left: 10
    },
    menu: {
        height: 30,
        width: 30
    }
})

export default MenuIcon;