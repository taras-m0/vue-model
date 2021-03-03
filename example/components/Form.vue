<template>
  <form>
    <div>
      <label>id: <input v-model="Form.id" /></label>
    </div>

    <div>
      <label>Имя: <input v-model="Form.user.name"/></label>
    </div>

    <div>
      <label>Фамилия: <input v-model="Form.user.family"/></label>
    </div>
  </form>

</template>

<style scoped>
div {
  width: 100%;
  margin: 1em;
}

label {
  display: flex;
  justify-content: flex-end;
}

form {
  display: inline-block;
  max-width: 400px;
  margin: 0 auto;
}
</style>

<script>
import Form from "../Model/Form";
export default {
  name: "Form",

  data(){
    return {
      Form
    }
  }
}
</script>

<style scoped>

</style>