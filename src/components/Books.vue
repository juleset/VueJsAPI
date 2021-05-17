<template>
  <div id="app">
    <div class="row">
      <div class="col-8">
        <h1>Liste des livres</h1>
        <List></List>
      </div>
      <div class="col-4">
        <h1>Ajout d'un livre</h1>
        <Add></Add>
      </div>
    </div>
  </div>
</template>

<script>

import List from './Books/List'
import Add from './Books/Add'

export default {
  name: 'Book',
  components:{
    List,
    Add
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
