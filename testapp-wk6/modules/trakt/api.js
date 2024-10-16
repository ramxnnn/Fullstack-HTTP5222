const trakt = "https://api.trakt.tv"; //base URL for any Trakt API requests

/*
 * Functions for Trakt API requests.
 */

async function getTrendingMovies() {
    let reqUrl = `${trakt}/movies/trending`;
    //For the method (below), GET is the default so if GET is your method value, you technically don't need to specify it. I put it in so you know it's there

    let response = await fetch(
        reqUrl,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "trakt-api-version": 2,
                "trakt-api-key": process.env.TRAKT_CLIENT_ID
            }
        }
    );
    return await response.json(); //return the JSON Response
}

module.exports = {
    getTrendingMovies
}