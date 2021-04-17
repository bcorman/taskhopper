import React from "react";
import {TextInput, StyleSheet} from "react-native";

/* This component renders the text and handles text changes. Multiline prop handles text wrapping, 
while blurOnSubmit means the device keyboard return key will trigger the submit action,
rather than move the cursor to the next line */
const TextEditor = ({data, actions}) => {
  const [text, setText] = React.useState(data.todo.text || "");

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
      onFocus={() => {
        if (!data.isActive) {
          actions.setActive(true);
        }
      }}
      onBlur={() => {
        // Deactivate todo if user blurs component
        if (data.isActive) {
          actions.setActive(false);
        }
        // Delete todo if it is empty or contains only whitespace characters
        if (
          ((!text || !text.trim().length) && !data.todo.text) ||
          !data.todo.text.trim().length
        ) {
          actions.deleteTodo(data.todo.id);
        }
      }}
      onSubmitEditing={onSubmit}
      onEndEditing={onSubmit}
      onChangeText={textUpdate => setText(textUpdate)}
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
