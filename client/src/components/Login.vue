<template>
    <div class="login">
        <h1>Log In</h1>
        <label>Email:<br>
            <input type="text"/>
        </label>
        <label>Password:<br>
            <input type="password"/>
        </label>
        <button>Submit</button>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
    h1 {
        color: #42b983;
    }
    label {
        display: block;
        margin-bottom: .5rem;
    }
    .login {
        text-align: left;
    }
</style>
