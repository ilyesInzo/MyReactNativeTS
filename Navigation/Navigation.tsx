import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Search from '../components/Search';
import FilmDetail from '../components/FilmDetail'


// it is not mondatory to define and add it here
// we add it in the view or component responsible for the navigation
/*type RootStackParamList = {
    Detail: { idFilm: string };
    Recherche: undefined ;
  };*/


const SearchStackNavigation = createStackNavigator();// createStackNavigator<RootStackParamList>();

export function SearchNavigation(){
    return(
        <NavigationContainer>
            <SearchStackNavigation.Navigator>
                <SearchStackNavigation.Screen name="Recherche" component={Search}  ></SearchStackNavigation.Screen>
                <SearchStackNavigation.Screen name="Detail" component={FilmDetail}  ></SearchStackNavigation.Screen>
            </SearchStackNavigation.Navigator>
        </NavigationContainer>
    )
}

