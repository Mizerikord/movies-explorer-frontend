class MainApi {
    constructor({ baseUrl, headers, auth }) {
        this._addres = baseUrl;
        this._headers = headers;
        this._auth = auth;
    }

    _getAnswer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res.status}`);
    }

    _setToken(currentToken) {
        this._headers.authorization = `Bearer ${currentToken}`;
    }

    patchUserData(profileData) {
        return fetch(`${this._addres}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name: profileData.name, email: profileData.email }),
        }).then(this._getAnswer)
    }

    // Создание пользователя
    postNewUser(userData) {
        return fetch(`${this._auth}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                password: userData.password
            })
        }).then(this._getAnswer)
    }

    // Авторизация пользователя
    postUserAutorization(userData) {
        return fetch(`${this._auth}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password
            })
        }).then(this._getAnswer)
    }

    // Получение всех карточек
    getMovies() {
        const cards = fetch(`${this._addres}/movie`, {
            method: 'GET',
            headers: this._headers
        })
        return cards.then(this._getAnswer)
    }

    // Создание новой карточки
    postNewMovie(newMovieData) {
        return fetch(`${this._addres}/movie`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMovieData)
        }).then(this._getAnswer)
    }

    // Удаление  карточки
    deleteMovie(movie) {
        return fetch(`${this._addres}/movie/${movie._id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._getAnswer)
    }
    
    // Проверка данных и авторизации
    getUserData(userToken) {
        return fetch(`${this._auth}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json"
            }
        }).then(this._getAnswer)
    }

}

const mainApi = new MainApi({
    baseUrl: 'https://api.diplom.sss.nomoreparties.sbs',
    headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
    auth: 'https://api.diplom.sss.nomoreparties.sbs'
});

export default mainApi