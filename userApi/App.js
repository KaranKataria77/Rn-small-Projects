/* eslint-disable no-shadow */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';

import Axios from 'axios';
import User from './components/User';

// const key = "somerandom wit key";
// const URL = `https://randomuser.me/api/${key}/params`

const App = () => {

  const [details, setDetails] = useState(null);

  const fetchDetail = async () => {
    try {
      const {data} = await Axios.get("https://randomuser.me/api/")
      const detail = data.results[0]
      console.log(detail)
      setDetails(detail)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDetail()
  }, [])

  if (!details) {
    return (
      <View style={styles.container}>
        <Text>Loading ...</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
      <View>
        <User details={details} />
        <Button title='new user' style={styles.button} onPress={() => fetchDetail()}></Button>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222831",
  },
  button: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
})

export default App;
