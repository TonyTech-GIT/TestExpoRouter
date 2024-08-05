import { Feather } from "@expo/vector-icons";

export const icon = {
  index: (props: { color: string }) => (
    <Feather name="home" size={24} color={props.color} />
  ),
  explore: (props: { color: string }) => (
    <Feather name="compass" size={24} color={props.color} />
  ),
  profile: (props: { color: string }) => (
    <Feather name="user" size={24} color={props.color} />
  ),
};
