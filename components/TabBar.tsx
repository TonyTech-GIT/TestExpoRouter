import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const icons = {
    index: (index: any) => <Feather name="home" size={24} color="#222" />,
    explore: (index: any) => <Feather name="compass" size={24} color="#222" />,
    profile: (index: any) => <Feather name="user" size={24} color="#222" />,
  };
  return (
    <View style={styles.tabBar}>
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
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            {icons[route.name]({
              color: isFocused ? "#673ab7" : "#222",
            })}
            <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {label}
            </Text>
          </TouchableOpacity>
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
