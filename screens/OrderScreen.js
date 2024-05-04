import React, { useEffect, useRef } from "react";
import { View, Text, SafeAreaView, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Main");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  const rotateZ = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "360deg", "0deg"],
  });

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.animation,
          { transform: [{ rotateZ }, { translateX }] },
        ]}
      >
        <Text style={styles.text}>Your Order Has been Received</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    marginTop: 40,
    alignItems: "center",
  },
  text: {
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default OrderScreen;
