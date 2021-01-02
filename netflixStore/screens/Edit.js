/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  Container,
  Form, 
  Item, 
  Input,
  H1,
  Button,
} from 'native-base';
import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';

function Edit({navigation, route}) {

  const [name, setName] = useState("");
  const [totalNoOfSeason, setTotalNoOfSeason] = useState("");
  const [id, setId] = useState(null);

  const update = async () => {
    try {
      const seasonToAdd = {
        id,
        name,
        totalNoOfSeason,
        isWatched: false,
      }

      const storedValue = await AsyncStorage.getItem("@season_list");
      const prevList = await JSON.parse(storedValue)

      prevList.map((singleSeason) => {
        if (singleSeason.id === id) {
          singleSeason.name = name;
          singleSeason.totalNoOfSeason = totalNoOfSeason;
        }
        return singleSeason;
      })
      await AsyncStorage.setItem('@season_list', JSON.stringify(prevList))
      navigation.navigate("Home")
    } catch (error){

    }
  }

  useEffect(() => {
    const {season} = route.params;
    const {id, name, totalNoOfSeason} = season;
    setId(id);
    setName(name);
    setTotalNoOfSeason(totalNoOfSeason)
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <H1 style={styles.heading}>Add to watch List</H1>
        <Form>
          <Item rounded style={styles.formItem}>
            <Input 
              placeholder="Season name" 
              style={{color:"#eee"}} 
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input 
              placeholder="Total No. of Season" 
              style={{color:"#eee"}} 
              value={totalNoOfSeason} 
              onChangeText={(text) => setTotalNoOfSeason(text)} 
            />
          </Item>
          <Button rounded block onPress={update}>
            <Text style={{color: "#eee"}}>Add</Text>
          </Button>
        </Form>
      </ScrollView>
    </Container>
)
}

export default Edit;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
});
