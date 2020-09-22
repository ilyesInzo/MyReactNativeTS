import React from 'react'
import { TextInput, Button, FlatList, Text, View, StyleSheet } from 'react-native'
import FilmItem from "./FilmItem"
import { getFilmDataFromDB } from '../API/TMDBfilm'

// Obligatoire en TS, il faut declarer les attribues
interface SearchProp {
}
// on evite de tout mettre dans le state
// elque des variable non destiner au rendu (e.g. search text=)
interface SearchState {
    film: Array<any>
}

class Search extends React.Component<SearchProp, SearchState> {

    // _films: Array<any>;
    searchText: string;
    constructor(props: any) {
        super(props);
        // this._films = [];
        this.searchText = "";
        this.state = { film: [] };
    }

    load_Movies() {

        if (this.searchText.length > 0) {

            getFilmDataFromDB(this.searchText).then(data => {
                // pour forcer le composant a s'actualiser
                // mais ceci est à eviter alors on utilise les states
                this.setState({ film: data.results });
                // ce ci permet de recup une valeur de state si le nom
                // est le méme
                //const {film} = this.state;
            }
            );

        }

    }

    searchByText(text: string) {
        this.searchText = text;
    }

    render() {
        // do not add {} as return , because it will be considered as Void and not a jsx
        // use () instead
        // we use {item} because this element will be used in a jsx code, if not added nothing will be showed
        const renderItem = ({ item }: any) => <FilmItem film={item} />

        return (
            <View style={styles.main_container}>
                <TextInput style={styles.textinput} placeholder='Titre du film' onChangeText={text => this.searchByText(text)} />
                <Button title='Rechercher' onPress={() => { this.load_Movies() }} />
                <FlatList
                    data={this.state.film}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
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
    }
})

export default Search