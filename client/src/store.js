const store = {
    state: {
        authenticated: true,
        tasks: [
            { name: 'task 2' },
            { name: 'task 2' }
        ]
    },
    login: function (email, password) {
        this.state.authenticated = true
    },
    logout: function () {
        this.state.authenticated = false
    }
}

export default store
