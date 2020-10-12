import React from 'react'
import { TextInput, Button, FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import FilmItem from "./FilmItem"
import { getFilmDataFromDB } from '../API/TMDBfilm'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../Navigation/Navigation'

// Obligatoire en TS, il faut declarer les attribues
interface SearchProp {
    navigation:StackNavigationProp<RootStackParamList,"Detail">,
    route: RouteProp<RootStackParamList,"Detail">
}
// on evite de tout mettre dans le state
// elque des variable non destiner au rendu (e.g. search text=)
interface SearchState {
    film: Array<any>,
    isLoading: boolean
}


class Search extends React.Component<SearchProp, SearchState> {

    // _films: Array<any>;
    searchText: string;
    page: number;
    max_page: number;

    constructor(props: any) {
        super(props);
        // this._films = [];
        this.searchText = "";
        this.page = 0;
        this.max_page = 0;
        this.state = {
            film: [],
            isLoading: false
        };
    }

    _displayFilmDetail = (idFilm:string) => {
        
        const {navigation} = this.props;
        navigation.navigate("Detail",{idFilm:idFilm});
    }

    load_Movies() {

        if (this.searchText.length > 0) {

            this.setState({ isLoading: true });

            getFilmDataFromDB(this.searchText, this.page + 1).then(data => {

                // ce if else à ete ajouté uniquement car il y'a un default
                // dans la partie web avec le EndReached qui se lance plusieur fois
                // donc méme page appeler plusieur fois et redandance des films
                // avec méme clé unique et du coup erreur

                this.page = data.page;
                this.max_page = data.total_pages;

                // pour forcer le composant a s'actualiser
                // mais ceci est à eviter alors on utilise les states
                this.setState({
                    // concatener notre liste avec la prochaine
                    film: [...this.state.film, ...data.results],
                    isLoading: false
                });

                // ce ci permet de recup une valeur de state si le nom
                // est le méme
                // const {film} = this.state;
            }

            );

        }

    }

    searchByText(text: string) {
        this.searchText = text;
    }

    displayLoadSpinner() {

        if (this.state.isLoading) {

            return (
                <View style={styles.spinner_container} >
                    <ActivityIndicator size='large'></ActivityIndicator>

                </View>

            );

        }

    }

    searchFilm() {

        this.page = 0;
        this.max_page = 0;
        // setState est asynchrone
        // il possede un collback que tu peut utiliser aprés réintialisation
        this.setState({
            film: []
        }, () => { this.load_Movies(); });

    }

    render() {
        // do not add {} as return , because it will be considered as Void and not a jsx
        // use () instead
        // we use {item} because this element will be used in a jsx code, if not added nothing will be showed
        const renderItem = ({ item }: any) => <FilmItem film={item} displayFilm={this._displayFilmDetail}/>
        return (
            <View style={styles.main_container}>
                <TextInput style={styles.textinput}
                    placeholder='Titre du film'
                    onChangeText={text => this.searchByText(text)}
                    onSubmitEditing={() => this.searchFilm()}//lorsque on valide dans le clavier
                />

                <Button title='Rechercher'

                    onPress={() => { this.searchFilm() }} />

                <FlatList
                    data={this.state.film}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.max_page) {
                            console.log("End Reached")
                            // issue infinite call when the state is updated
                            this.load_Movies();
                        }

                    }}
                />

                {this.displayLoadSpinner()}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    spinner_container: {
        position: 'absolute',
        top: 100,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'

    }
})

export default Search