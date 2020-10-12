import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/Navigation'
import { getFilmDetailFromDB } from '../API/TMDBfilm'
import { ScrollView } from 'react-native-gesture-handler'

// Obligatoire en TS, il faut declarer les attribues
interface FilmDetailProp {
    //navigation:StackNavigationProp<RootStackParamList,"Detail">,
    route: RouteProp<RootStackParamList, "Detail">
}

interface FilmDetailState {
    film: any,
    isLoading: boolean
}

class FilmDetail extends React.Component<FilmDetailProp, FilmDetailState> {

    constructor(props: any) {
        super(props);
        this.state = {
            film: undefined,
            isLoading: true
        };
    }

    _displayLoadSpinner() {
        if (this.state.isLoading) {
            return (
                <View style={styles.spinner_container}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                </View>
            )
        }
    }

    _displayFilmDetail() {
        if (this.state.film !== undefined) {
            const { title } = this.state.film;
            return (
                <ScrollView style={styles.scroll_view_container}>
                    <Text> Titre du Film {title}  </Text>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container} >
                {this._displayLoadSpinner()}
                {this._displayFilmDetail()}
            </View>
        )
    }

    // Appeler aprés le rendu
    // Regardez le cycle de vie d'une application react
    // https://openclassrooms.com/fr/courses/4902061-developpez-une-application-mobile-react-native/5046306-initiez-vous-aux-cycles-de-vie-des-components

    componentDidMount() {
        const idFilm = this.props.route.params['idFilm'];
        getFilmDetailFromDB(idFilm).then((data) => {
            console.log(data);
            this.setState({
                film: data,
                isLoading: false
            });

        });

    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    spinner_container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    scroll_view_container:{
        flex:1
    }
})

export default FilmDetail