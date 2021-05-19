<template>
  <div class="row">
    <div v-if="error" class="col-12 alert alert-danger" role="alert">
      {{error}}
    </div>
    <table v-if="authors" class="table">
      <thead>
      <tr>
        <th>firstname</th>
        <th>name</th>
        <th>birthday</th>
        <th>death date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="author in authors" :key="author.id">
        <td hidden="">{{author.id}}</td>
        <td>{{author.firstname}}</td>
        <td>{{author.name}}</td>
        <td>{{author.birthday}}</td>
        <td>{{author.death_date}}</td>
        <td>
          <input type="submit" value="supprimer" @click="deleteFunct(author.id)" onclick="return confirm('Etes-vous sur de vouloir supprimer cet item ?');" class="btn btn-danger">
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
      authors : null,
      error : null,
      category: {
        id: null,
      }
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
  methods: {
    deleteFunct(id){
      axios.delete('http://127.0.0.1:8000/api/authors/' + id,{
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
