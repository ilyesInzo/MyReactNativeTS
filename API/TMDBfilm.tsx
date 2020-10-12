import { ImageEditor } from "react-native";

const TOKEN = "26941063b83666e4dcc3379378fdb2a5";


export function getFilmDetailFromDB(idFilm:string){

    const URL = "https://api.themoviedb.org/3/movie/"+idFilm+"?api_key="+TOKEN+"&language=fr";
    return fetch(URL).then(
        (response)=> response.json()
    ).catch((error)=>{
        console.log("Erreur de recuperation du detail du Film"+error)
    })
}

export function getFilmDataFromDB(text: string, page:number){

    const URL = "https://api.themoviedb.org/3/search/movie?api_key="+TOKEN+"&language=fr&query=" + text+"&page="+page;
    return fetch(URL)
    .then((response) => response.json())
    .catch(error=> console.log("Erreur de recuperation des films recherées"+error));
}

export function getImageUrl(image: string){

    return "https://image.tmdb.org/t/p/w300" + image;
}