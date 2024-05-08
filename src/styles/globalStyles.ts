import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    color: "white",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    padding: 10,
    color: "white",
  },
  greenButton: {
    borderColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#94C1B2",
  },
  blueButton: {
    borderColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#9498c1",
  },
  redButton: {
    borderColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#c19494",
  },
  greyButton: {
    borderColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#c3c3c3",
  },
  textGreen: {
    color: "#94C1B2"
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default globalStyles;


// Colors used
// green : "#94C1B2"
// red : ?