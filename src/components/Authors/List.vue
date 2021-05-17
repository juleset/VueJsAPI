<template>
  <div class="row">
    <div v-if="error" class="col-12 alert alert-danger" role="alert">
      {{error}}
    </div>
    <table v-if="authors" class="table">
      <thead>
      <tr>
        <th>name</th>
        <th>firstname</th>
        <th>birthday</th>
        <th>death date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="author in authors">
        <td>{{author.name}}</td>
        <td>{{author.firstname}}</td>
        <td>{{author.birthday}}</td>
        <td>{{author.death_date}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'List',
  data: function(){
    return{
      authors : null,
      error : null
    }
  },
  mounted: function(){
    axios.get('http://127.0.0.1:8000/api/authors')
      .then((response) =>{
        this.authors = response.data.data.actor;
        console.log(this.authors)
      })
      .catch((error) => {
        this.error = 'Une erreur est survenue : '+ error;
      });
  },
}
</script>

<style scoped>
.row {
  margin-left: 5px;
}
</style>
