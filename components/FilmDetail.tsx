import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
type RootStackParamList = {
    Detail: { idFilm: string };
    Recherche: undefined ;
  };

// Obligatoire en TS, il faut declarer les attribues
interface FilmDetailProp {
    navigation:StackNavigationProp<RootStackParamList,"Detail">,
    route: RouteProp<RootStackParamList,"Detail">
}

class FilmDetail extends React.Component<FilmDetailProp> {

    render() {
        const idFilm = this.props.route.params["idFilm"];
        return (
            <View style={styles.main_container} >
                <Text>Film detail {idFilm}</Text>
            </View>
        )

    }
}


const styles = StyleSheet.create({
    main_container: {
        flex: 1
    }
})

export default FilmDetail