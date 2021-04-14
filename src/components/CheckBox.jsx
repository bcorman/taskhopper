import React from "react";
import {StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const CheckBox = ({data, toggleComplete}) => {
  const [showCheck, setShowCheck] = React.useState(data.complete);
  let iconName = showCheck ? "radio-button-checked" : "radio-button-unchecked";
  return (
    <Icon.Button
      data={showCheck}
      name={iconName}
      backgroundColor="rgba(0,0,0,0)"
      color={"blue"}
      underlayColor="rgba(0,0,0,0)"
      size={30}
      style={styles.container}
      iconStyle={styles.checkBox}
      activeOpacity={1}
      borderRadius={5}
      onPress={() => {
        setShowCheck(check => !check);
        setTimeout(() => {
          toggleComplete(data.id, {
            complete: !data.complete,
          });
        }, 120);
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  checkBox: {},
});
export default CheckBox;
