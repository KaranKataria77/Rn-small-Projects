/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  List,
  ListItem,
  Left,
  Button,
  Text,
  Icon,
  Body,
  Right,
  CheckBox,
  Title,
  H1,
  Fab,
  Subtitle,
  Container,
  Spinner,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

function Home({navigation, route}) {

  const [listOfSeason, setListOfSeason] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const getList = async () => {
     setLoading(true)
     const storedValue = await AsyncStorage.getItem("@season_list")

     if (!storedValue){
       setListOfSeason([])
     }
     const list = JSON.parse(storedValue)
     setListOfSeason(list)

     setLoading(false)
  };

  const deleteSeason = async (id) => {
    const newList = await listOfSeason.filter((list) => list.id !== id)
    await AsyncStorage.setItem("@season_list", JSON.stringify(newList))
    setListOfSeason(newList)
  };

  const markComplete = async (id) => {
    const newArr = await listOfSeason.map((list) => {
      if (list.id === id) {
        list.isWatched = !list.isWatched;
      }
      return list;
    });
    await AsyncStorage.setItem("@season_list", JSON.stringify(newArr));
    setListOfSeason(newArr);
  };

  useEffect(() => {
    getList()
  }, [isFocused]);

  if (loading) {
    return (
      <Container style={styles.container}>
        <Spinner color="#00b7c2" />
      </Container>
    )
  }


    return (
        <ScrollView contentContainerStyle={styles.container}>
          {listOfSeason.length == 0 ? 
          (
            <Container style={styles.container}>
              <H1 style={styles.heading}>WatchList is Empty. Please add a Season</H1>
            </Container>
          ) : 
          (
            <>
            <H1 style={styles.heading}>Next Series to Watch</H1>
            <List>
              {listOfSeason.map((season) => (
                <ListItem key={season.id} style={styles.listItem} noBorder>
                <Left>
                  <Button style={styles.actionButton} danger onPress={() => deleteSeason(season.id)}>
                    <Icon name="trash" active />
                  </Button>
                  <Button style={styles.actionButton} onPress={() => navigation.navigate("Edit", {season})}>
                    <Icon active name="edit" type="Feather" />
                  </Button>
                </Left>
              <Body>
                <Title style={styles.seasonName}>{season.name}</Title>
                <Text note style={styles.listOfSeason}>{season.totalNoOfSeason} Season to watch</Text>
              </Body>
              <Right>
                <CheckBox checked={season.isWatched} onPress={() => markComplete(season.id)} />
              </Right>
              </ListItem>
              ))}
            </List>
            </>
          )}
          <Fab 
            style={{backgroundColor: "#5067ff"}}
            position="bottomRight" 
            onPress={() => navigation.navigate("Add")}
          >
            <Icon name="add" />
          </Fab>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});

export default Home;
