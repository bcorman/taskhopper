import React from "react";
import {TextInput, StyleSheet} from "react-native";

/* This component renders the text and handles text changes. Multiline prop handles text wrapping, 
while blurOnSubmit means the device keyboard return key will trigger the submit action,
rather than move the cursor to the next line */
const TextEditor = ({data, actions}) => {
  const [text, setText] = React.useState("" || data.todo.text);

  const onSubmit = () => {
    actions.updateTodo(data.todo.id, {text});
  };

  return (
    <TextInput
      style={{
        ...styles.text,
        textDecorationLine: data.todo.complete ? "line-through" : "none",
      }}
      autoFocus={!data.todo.text}
      underLineColorAndroid="transparent"
      underlineColor="transparent"
      onFocus={() => {
        if (!data.isActive) {
          actions.setActive(true);
        }
      }}
      onBlur={() => {
        if (data.isActive) {
          actions.setActive(false);
        }
        if (!text && !data.todo.text) {
          actions.deleteTodo(data.todo.id);
        }
      }}
      onSubmitEditing={onSubmit}
      onEndEditing={onSubmit}
      onChangeText={text => setText(text)}
      blurOnSubmit
      multiline
      maxLength={1000}
      value={text}
      autoCapitalize="sentences"
      keyboardAppearance="default"
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
});

export default TextEditor;
