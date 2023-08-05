class MovieApi {
    constructor({baseUrl}){
        this._addres = baseUrl;
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
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
    // headers: {
    //     'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    //     'Content-Type': 'application/json'
    // },
    // auth: 'http://localhost:3001'
});

export default movieApi