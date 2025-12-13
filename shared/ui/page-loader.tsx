import { useState } from "react";
import { StyleSheet, View } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

export const PageLoading = () => {
  const [visible, setVisible] = useState(true);
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // backgroundColor: "red",
      }}
    >
      <AnimatedLoader
        visible={visible}
        source={require("@/assets/images/Loading2.json")}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        speed={1}
      ></AnimatedLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
  },
});
