import React, { useState, useRef, useEfect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    generateRandomBetween(min, max, exlude);
  }
  return rndNum;
};
const nextGuessHandler = direction => {
  if (
    (direction === "lower" && currentGuess < props.userChoise) ||
    (direction === "greater" && currentGuess > props.userChoise)
  ) {
    Alert.alert("Don't lie!", "You now That is wrong...", [
      { text: "Sorry", style: "cancel" }
    ]);
  }
};
const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoise)
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button
          title="lower"
          onPress={() => {
            nextGuessHandler("lower");
          }}
        />
        <Button
          title="greater"
          onPress={() => {
            nextGuessHandler("greater");
          }}
        />
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  }
});

export default GameScreen;
