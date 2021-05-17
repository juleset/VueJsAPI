<template>
    <div class="row">
      <div v-if="error" class="col-12 alert alert-danger" role="alert">
        {{error}}
      </div>
      <table v-if="books" class="table" id="example">
        <thead>
        <tr>
          <th>name</th>
          <th>publish date</th>
          <th>status</th>
          <th>author</th>
          <th>category</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="book in books">
          <td>{{book.name}}</td>
          <td>{{book.publish_date}}</td>
          <td>{{book.status}}</td>
          <td>{{book.author.firstname +' '+ book.author.name}}</td>
          <td>{{book.category}}</td>
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
  margin-left: 5px;
}
</style>
