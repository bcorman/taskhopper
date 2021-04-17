import {StatusBar} from "expo-status-bar";
import React from "react";
import {StyleSheet, SafeAreaView, Platform} from "react-native";
import TodoScreen from "./src/screens/TodoScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <TodoScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingTop: Platform.OS === "android" ? 30 : 0,
    backgroundColor: "#FAFAFA",
  },
});
