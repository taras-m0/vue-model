<template>
  <div id="app">
    <Form></Form>

    <pre>{{ userJSON }}</pre>
  </div>
</template>

<style scoped lang="css">
pre {
  max-width: 400px;
  text-align: left;
}
</style>

<script>
import Form from "./components/Form";
import FormModel from './Model/Form'

export default {
  name: 'App',
  components: {
    Form
  },
  data(){
    return {
      FormModel
    }
  },
  computed:{
    userJSON(){
      return JSON.stringify( this.FormModel.user, null, "  ")
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
