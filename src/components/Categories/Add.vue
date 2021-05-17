<template>
  <div class="row">
    <br>
    <label class="form-label" for="">name</label>
    <input class="form-control"  type="text">

    <br>
    <input class="btn btn-md btn-success" type="submit">
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Add',
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

</style>
