import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { getImageUrl } from '../API/TMDBfilm'
import { TouchableOpacity } from 'react-native-gesture-handler';
//https://stackoverflow.com/questions/48240449/type-is-not-assignable-to-type-intrinsicattributes-intrinsicclassattribu/57312722

// to avoid having issues when using this component with the new attribute
// we define the attributes
interface FilmItemProps {
    film: any;
    displayFilm:any;
}

class FilmItem extends React.Component<FilmItemProps> {

    constructor(props: any) {
        super(props);
        // ils sont egaux
        //console.log(props);
        //console.log(this.props);
    }



    render() {

        const {film , displayFilm} = this.props;
        return (
            <TouchableOpacity style={styles.container}
            onPress={() =>displayFilm(film.id)}
            >

                <View style={styles.image_view}>

                    <Image
                        style={styles.image}
                        source={{ uri: getImageUrl(film.poster_path) }}
                    >
                    </Image>

                </View>

                <View style={styles.main_view}>

                    <View style={styles.header_view}>
                        <Text style={styles.text_size}>{film.title}</Text>
                        <Text style={styles.vote_size}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.description_view}>
                        <Text numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style={styles.release_view}>
                        <Text style={{ textAlign: 'right' }}>{film.release_date}</Text>
                    </View>

                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 190,
        flexDirection: "row"
    },
    image_view: {
        flex: 1
    },
    main_view: {
        flex: 2,
        flexDirection: "column"
    },
    header_view: {
        flex: 3,
        flexDirection: "row"
    },
    description_view: {
        flex: 7
    },
    release_view: {
        flex: 1
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    vote_size: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    text_size: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    }


})

export default FilmItem