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
      <tr v-for="category in categories" :key="category.id">
        <td hidden="">{{category.id}}</td>
        <td>{{category.name}}</td>
        <td>
          <input type="submit" value="supprimer" @click="deleteFunct(category.id)" onclick="return confirm('Etes-vous sur de vouloir supprimer cet item ?');" class="btn btn-danger">
          <input type="submit" value="modifier" class="btn btn-primary">
        </td>
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
      error : null,
      category: {
        id: null,
      }
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
  methods: {
    deleteFunct(id){
      axios.delete('http://127.0.0.1:8000/api/categories/' + id,{
        headers: {
          "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${"E9lMIFCfFCbcrStaa01lJSYMpSmmqg3HuwMbmT4W"}`
        }
      })
        .then((response) => {
            console.log('suppr ok', response)
            window.location.reload()
          }
        )
        .catch((error) => {
          this.error = 'Une erreur est survenue : '+ error;
        });
    }
  }
}
</script>

<style scoped>
.row {
  margin-left: 5px;
}
</style>
