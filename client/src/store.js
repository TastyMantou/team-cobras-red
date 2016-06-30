const store = {
    state: {
        authenticated: true,
        selectedTodo: null,
        todos: [
            {
                id: 0, description: 'todo 1', severity: 'low', selected: false, editing: false, completed: false
            },
            {
                id: 1, description: 'todo 2', severity: 'high', selected: false, editing: false, completed: false
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
