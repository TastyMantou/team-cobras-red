<template>
    <li>
        
    </li>
</template>

<script>
    export default {
        props: {
            todo: Object
        },
        data: function () {
            return {
                severityOptions: [
                    'low',
                    'moderate',
                    'high'
                ],
                editedTodo: null
            }
        },
        methods: {
            cancelTodo: function () {
                return this.toggleTodo(false, false);
            },
            editTodoText: function () {
                if (this.todo.completed) {
                    return;
                }

                this.editedTodo = this.todo;

                return this.toggleTodo(true, !this.todo.editing);
            },
            toggleTodo: function (selected, editing = false) {
                return this.todo = Object.assign({}, this.todo, {selected: selected || !this.todo.selected, editing: editing});
            },
            completeTodo: function () {
                this.toggleTodo();
                return this.todo = Object.assign({}, this.todo, {selected: false, editing: false, completed: true});
            },
            deleteTodo: function () {
                this.toggleTodo();
                return this.todo = Object.assign({}, this.todo, {deleted: true});
            },
            saveTodo: function () {
                this.toggleTodo();
                return [this.todo, this.editedTodo] = [this.editedTodo, null];
            }
        }
    }
</script>

<style>
    .todo-list__actions-container {
        display: flex;
        justify-content: space-between;
        color: #E4E4E4;
    }

    .todo-list__action {
        padding: 5px;
        color: white;
    }

    .todo-list__action--cancel {
        color: red;
    }

    .todo-list__action--delete {

    }

    .todo-list__action--complete {

    }

    .todo-list__action--save {

    }

    .todo {
        display: flex;
        justify-content: space-between;
        list-style: none;
        padding: 5px;
        background-color: teal;
    }

    .todo--active {
        background-color: #3CB3AE;
    }

    .todo--deleted {
        display: none;
        visibility: hidden;
    }

    .todo--completed {
        text-decoration: line-through;
    }

    .todo__edit-options {
        display: none;
    }

    .todo__edit-options--active {
        display: inline;
    }
</style>
