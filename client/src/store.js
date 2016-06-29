const store = {
    state: {
        authenticated: true,
        selectedTodo: null,
        todos: [
            {
                id: 0, description: 'todo 1', severity: 'low'
            },
            {
                id: 1, description: 'todo 2', severity: 'high'
            }
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
