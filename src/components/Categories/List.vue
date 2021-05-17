<template>
  <div class="row">
    <div v-if="error" class="col-12 alert alert-danger" role="alert">
      {{error}}
    </div>
    <table v-if="categories" class="table">
      <thead>
      <tr>
        <th>name</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories">
        <td>{{category.name}}</td>
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
      categories : null,
      error : null
    }
  },
  mounted: function(){
    axios.get('http://127.0.0.1:8000/api/categories')
      .then((response) =>{
        this.categories = response.data.data;
        console.log(this.categories)
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
