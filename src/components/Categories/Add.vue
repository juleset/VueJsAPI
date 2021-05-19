<template>
  <div class="row">
    <br>
    <label class="form-label" >name</label>
    <input class="form-control" v-model="category.name" type="text">

    <br>
    <input class="btn btn-md btn-success" @click="submit" type="submit">
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'AddCategories',
  data: function(){
    return{
      categories : null,
      error : null,
      category :
        {
          name : ""
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
    submit(){
      axios.post('http://127.0.0.1:8000/api/categories', this.category, {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": `Bearer ${"vgufWBM3OYa6UJboDmXH6LuurORFXWmjlNMbqaC9"}`
        }
      })
        .then((response) =>{
          console.log('post ok', response)
            //this.categories.push(response.data),
          this.category = "";
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
