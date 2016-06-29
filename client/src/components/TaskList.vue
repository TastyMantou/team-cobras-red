<template>
    <div class="hello">
        <h1>My Tasks</h1>
        <task
            v-for="task in tasks"
            :task="task"
            :index="$index">
        </task>
    </div>
</template>

<script>
import Task from './Task'
export default {
    components: {
        Task
    },
    props: {
        tasks: Array
    }
}
</script>

<style scoped>
</style>
