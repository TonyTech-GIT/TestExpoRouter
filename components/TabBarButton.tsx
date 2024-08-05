import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { icon } from "@/constants/icon";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// type RouteName = keyof typeof icon;

import { RouteName } from "./types";

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: {
  onPress: Function;
  onLongPress: Function;
  isFocused: boolean;
  routeName: RouteName;
  color: string;
  label: string;
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 0 : 1) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.1]);

    const top = interpolate(scale.value, [0, 1], [10, -4]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [0, 1]);
    return {
      opacity,
      //   transform: [{ scale }],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarItem}
    >
      <Animated.View style={[animatedIconStyle]}>
        {icon[routeName]({
          color: isFocused ? "#fff" : "#222",
        })}
      </Animated.View>

      <Animated.Text
        style={[
          { color: isFocused ? "#673ab7" : "#222", fontSize: 12 },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    backgroundColor: "#eee",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 80,
    paddingVertical: 15,
    borderRadius: 35,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 10 },
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    // padding: 10,
    // borderWidth: 1,
    // borderColor: "#ddd",
    // borderRadius: 5,
    // elevation: 1,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // shadowOffset: { width: 1, height: 1 },
    // marginHorizontal: 10,
  },
});
