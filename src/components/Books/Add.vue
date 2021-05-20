<template>
    <div class="row">
      <br>
      <label class="form-label" for="">name</label>
      <input class="form-control"  type="text">

      <label class="form-label" for="">publish date </label>
      <input class="form-control"  type="date">

      <label class="form-label" for="">status</label>
      <select class="form-control" >
        <option v-for="book in books">
          {{book.status}}
        </option>
      </select>

      <label class="form-label" for="">Author firstname</label>
      <input class="form-control"  type="text">

      <label class="form-label" for="">Author name</label>
      <input class="form-control"  type="text">

      <label class="form-label" for="">Category</label>
      <select class="form-control" >
        <option v-for="book in books">
          {{book.category}}
        </option>
      </select>
      <br>
      <input class="btn btn-md btn-success" type="submit">
    </div>
</template>

<script>


import axios from "axios";

export default {
  name: 'AddBooks',
  data: function(){
    return{
      books : null,
      error : null
    }
  },
  mounted: function(){
    axios.get('http://127.0.0.1:8000/api/books')
      .then((response) =>{
        this.books = response.data.data;
        console.log(this.books)
      })
      .catch((error) => {
        this.error = 'Une erreur est survenue : '+ error;
      });
  },
}
</script>

<style scoped>
.row {
  justify-content: center;
}

</style>
