/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable react/self-closing-comp */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, 
        Text, 
        StyleSheet, 
        ScrollView, 
        SafeAreaView,
        TextInput,
        TouchableOpacity,
        Alert} from 'react-native';
  import Snackbar from 'react-native-snackbar'


const currencyPerRupees = {
  DOLLAR: 0.014,
  EURO: 0.012,
  POUND: 0.011,
  RUBEL: 0.93,
  AUSDOLLAR: 0.2,
  CANDOLLAR: 0.019,
  YEN: 1.54,
  DINAR: 0.0043,
  BITCOIN: 0.000004
}
const App = () => {

  const [inputValue, setInputValue] = useState(0);
  const [resultValue, setResultValue] = useState(0);

  const buttonPresssed = (currency) => {

    if (!inputValue){
      return Snackbar.show({
        text: "Please provide Input",
        backgroundColor: "#ea7773",
        textColor: "#ffffff"
      })
    }
    let result = parseFloat(inputValue) * currencyPerRupees[currency];
    setResultValue(result.toFixed(2))
  }

  return(
    <>
    <ScrollView backgroundColor="#1b262c" keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="automatic">
     <SafeAreaView  style={styles.container}>
       <View style={styles.resultContainer}>
         <Text style={styles.resultValue}>{resultValue}</Text>
       </View>
       <View style={styles.inputContainer}>
         <TextInput 
           style={styles.input} 
           keyboardType="numeric" 
           placeholder="Enter Value"
           placeholderTextColor="#c1c1c1" 
           value={String(inputValue)}
           onChangeText={(inputValue) => setInputValue(inputValue)}
         >
         </TextInput>
       </View>
       <View style={styles.convertBottomContainer}>
         {Object.keys(currencyPerRupees).map((currency) => (
           <TouchableOpacity key={currency} style={styles.convertButton} onPress={() => buttonPresssed(currency)}>
             <Text style={styles.convertButtonText}>{currency}</Text>
           </TouchableOpacity>
         ))}
       </View>
     </SafeAreaView>
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b262c"
  },
  resultContainer: {
    height: 70,
    marginTop:80,
    justifyContent: "center",
    borderColor: "#bbe1fa",
    borderWidth: 2,
    alignItems: "center"
  },
  resultValue: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "bold"
  },
  inputContainer: {
    height: 70,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#bbe1fa"
  },
  input: {
    fontSize: 30,
    textAlign: "center",
    color: "#FFFFFF"
  },
  convertBottomContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10
  },
  convertButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: "33.3%",
    borderWidth: 2,
    borderColor: "#bbe1fa",
    marginTop: 10,
    backgroundColor: "#0f4c75"
  },
  convertButtonText: {
    color: "#FFF",
    fontSize: 15
  }
})

export default App;