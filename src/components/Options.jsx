import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Options = ({priority, id, openFormID, setFormID, updateTodo}) => {
  const [displayForm, toggleDisplayForm] = React.useState(openFormID === id);
  const options = ["High", "Med", "Low"];
  const colors = ["red", "#bdb717", "blue"];

  const setPriority = newPriority => {
    if (newPriority !== priority) {
      updateTodo(id, {priority: newPriority});
    }
  };
  const toggleFormOpen = () => {
    displayForm ? setFormID(null) : setFormID(id);

    toggleDisplayForm(display => !display);
  };

  return (
    <View>
      <View style={styles.container}>
        <Pressable onPress={toggleFormOpen}>
          <Icon name="more-vert" size={25} />
        </Pressable>
      </View>
      {displayForm && id === openFormID ? (
        <View style={styles.formContainer}>
          <View style={styles.form}>
            {options.map((option, key) => (
              <TouchableOpacity
                key={key}
                style={styles.optionsButton}
                onPress={() => setPriority(options.indexOf(option))}>
                <Text
                  style={{
                    color: colors[options.indexOf(option)],
                    ...styles.optionsText,
                  }}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  formContainer: {
    position: "absolute",
    width: 60,
    right: 30,
    top: -28,
  },
  form: {
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "#FAFAFA",
    paddingVertical: 0,
    display: "flex",
  },
  optionsButton: {
    paddingVertical: 4,
    marginVertical: 0,
    marginHorizontal: 8,
    display: "flex",
    alignItems: "center",
  },
  optionsText: {
    fontSize: Platform.OS === "android" ? 12 : 16,
    fontWeight: "500",
  },
});

export default Options;
