<template>
  <div id="app">
    <div class="row">
      <div class="col-8">
        <h1>Liste des auteurs</h1>
        <List></List>
      </div>
      <div class="col-4">
        <h1>Ajout d'un auteur</h1>
        <Add></Add>
      </div>
    </div>
  </div>
</template>

<script>

import List from './Authors/List'
import Add from './Authors/Add'

export default {
  name: 'Authors',
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
