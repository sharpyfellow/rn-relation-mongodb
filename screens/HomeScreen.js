import { View, Text, Button } from "react-native";
import React from "react";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Go to Author"
        onPress={() => navigation.navigate("Author")}
      />
    </View>
  );
};

export default HomeScreen;
