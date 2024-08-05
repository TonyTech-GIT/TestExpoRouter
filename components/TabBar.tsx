import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from "./TabBarButton";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { RouteName } from "./types";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View onLayout={onTabBarLayout} style={styles.tabBar}>
      <Animated.View
        style={[
          animatedStyle,
          {
            position: "absolute",
            backgroundColor: "#723FEB",
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 25,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500,
          });
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name as RouteName}
            color={isFocused ? "#fff" : "#222"}
            label={label}
          />
          //   <TouchableOpacity
          //     key={route.name}
          //     accessibilityRole="button"
          //     accessibilityState={isFocused ? { selected: true } : {}}
          //     accessibilityLabel={options.tabBarAccessibilityLabel}
          //     testID={options.tabBarTestID}
          //     onPress={onPress}
          //     onLongPress={onLongPress}
          //     style={styles.tabBarItem}
          //   >
          //     {icons[route.name]({
          //       color: isFocused ? "#673ab7" : "#222",
          //     })}
          //     <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
          //       {label}
          //     </Text>
          //   </TouchableOpacity>
        );
      })}
    </View>
  );
}

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
  //   tabBarItem: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     gap: 5,
  //     // padding: 10,
  //     // borderWidth: 1,
  //     // borderColor: "#ddd",
  //     // borderRadius: 5,
  //     // elevation: 1,
  //     // shadowColor: "#000",
  //     // shadowOpacity: 0.1,
  //     // shadowRadius: 2,
  //     // shadowOffset: { width: 1, height: 1 },
  //     // marginHorizontal: 10,
  //   },
});
