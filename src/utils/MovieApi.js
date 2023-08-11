class MovieApi {
    constructor({baseUrl, headers}){
        this._addres = baseUrl;
        this._headers = headers;
    }

    _getAnswer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res.status}`);
    }

    getMovies() {
        const cards = fetch(`${this._addres}`, {
            method: 'GET',
            headers: this._headers
        })
        return cards.then(this._getAnswer)
    }

}

const movieApi = new MovieApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json'
    },
});

export default movieApi