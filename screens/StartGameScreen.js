import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = props => {
  const [entredValue, setEntredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectNumber, setSelectNumber] = useState("");
  const numberHandulerInput = inputText => {
    setEntredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const resetInputHandler = () => {
    setEntredValue("");
    setConfirmed(false);
  };
  const confirmInputHandler = () => {
    const chooseNumber = parseInt(entredValue);
    if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
      Alert.alert(
        "Invalid Number",
        "Number has to be a number between 1 and 99 ",
        [{ text: "OK", style: "destructive", onPress: resetInputHandler }]
      );
    }
    setConfirmed(true);
    setSelectNumber(chooseNumber);
    setEntredValue("");
    Keyboard.dismiss();
  };
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer>{selectNumber}</NumberContainer>
        <Button
          title="start a Game"
          onPress={() => props.onStartGame(selectNumber)}
        />
      </Card>
    );
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}> Start a Game</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberHandulerInput}
            value={entredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="reset"
                onPress={() => {
                  resetInputHandler();
                }}
                color={Colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="confirm"
                onPress={() => {
                  confirmInputHandler();
                }}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 20
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15
  },
  button: {
    width: "38%"
  },
  input: {
    width: 50
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center"
  }
});

export default StartGameScreen;
