<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>
        <li v-bind:class="['todo', {'todo--active': todo.selected}, {'todo--completed': todo.completed}]" @click.self="toggleTodo(todo)">
            <input v-if="todo.editing" v-model="todo.description" placeholder="todo.description"/>
            <span v-on:click.self="editTodoText(todo)">{{*todo.description}}</span>
            <div v-bind:class="['todo__edit-options', {'todo__edit-options--active': todo.editing}]">
                <select v-if="todo.selected" v-model="todo.severity" v-if="!todo.completed">
                    <option v-for="option in severityOptions" v-bind:selected="option===todo.severity">{{option}}</option>
                </select>
                <span v-if="todo.completed">{{todo.severity}}</span>

            </div>
        </li>
    </div>
</template>

<script>
    export default {
        props:   {
            todo: Object
        },
        data:    function () {
            return {
                severityOptions: [
                    'low',
                    'moderate',
                    'high'
                ],
                selectedTodo:    null
            }
        },
        methods: {
            editTodoText: function (todo) {
                if (todo.completed) {
                    return;
                }

                return this.toggleTodo(todo, true, !todo.editing);
            },
            toggleTodo:   function (todo, selected = false, editing) {
                return this.todo = Object.assign({}, todo, { selected: selected || !todo.selected, editing: editing });
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
