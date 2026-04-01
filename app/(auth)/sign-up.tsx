
import { Text, View } from "react-native";
import { Link } from "expo-router";

const signUp = () => {
  return (
    <View>
      <Text>signUp</Text>
      <Link href="/(auth)/sign-in">Sign In</Link>
      <Link href="/">Home</Link>
    </View>
  );
};

export default signUp;
