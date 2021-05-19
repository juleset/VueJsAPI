<template>
  <div class="row">
    <br>
    <label class="form-label" for="">firstname</label>
    <input class="form-control" v-model="author.firstname" type="text">

    <br>
    <label class="form-label" for="">name</label>
    <input class="form-control" v-model="author.name" type="text">

    <br>
    <label class="form-label" for="">birthday</label>
    <input class="form-control" v-model="author.birthday" type="date">

    <br>
    <label class="form-label" for="">death date</label>
    <input class="form-control" v-model="author.death_date" type="date">

    <br>
    <input class="btn btn-md btn-success" @click="submit" type="submit">
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'AddAuthors',
  data: function(){
    return{
      authors : null,
      error : null,
      author : {
        firstname: '',
        name : '',
        birthday : null,
        death_date: null
      }
    }
  },
  mounted: function(){
    axios.get('http://127.0.0.1:8000/api/authors')
      .then((response) =>{
        this.authors = response.data.data;
        console.log(this.authors)
      })
      .catch((error) => {
        this.error = 'Une erreur est survenue : '+ error;
      });
  },
  methods: {
    submit(){
      axios.post('http://127.0.0.1:8000/api/authors', this.author, {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": `Bearer ${"vgufWBM3OYa6UJboDmXH6LuurORFXWmjlNMbqaC9"}`
        }
      })
        .then((response) =>{
          console.log('post ok', response)
          //this.categories.push(response.data),
          this.author = "";
          window.location.reload()
        })
        .catch((error) => {
          this.error = 'Une erreur est survenue : '+ error;
        });
    },
  }
}
</script>

<style scoped>
.row {
  justify-content: center;
}
</style>
