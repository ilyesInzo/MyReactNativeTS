
const TOKEN = "26941063b83666e4dcc3379378fdb2a5";

export function getFilmDataFromDB(text: string){

    const URL = "https://api.themoviedb.org/3/search/movie?api_key="+TOKEN+"&language=fr&query=" + text;
    return fetch(URL)
    .then((response) => response.json())
    .catch(error=> console.log(error));
}