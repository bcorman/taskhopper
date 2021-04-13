import React from "react";
import {View, StyleSheet} from "react-native";
import CheckBox from "../components/CheckBox";

const StatusContainer = ({data, toggleComplete}) => {
  return (
    <View style={styles.container}>
      <CheckBox
        id={data.id}
        complete={data.complete}
        toggleComplete={toggleComplete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
});

export default StatusContainer;
