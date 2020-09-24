import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {SearchNavigation} from './Navigation/Navigation'
import Search from './components/Search'

class App extends React.Component {
  render() {
    return (
      <SearchNavigation/>
    )
  }
}

export default App
