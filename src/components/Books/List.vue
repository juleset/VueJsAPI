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
        <tr v-for="book in books" :key="book.id">
          <td hidden="">{{book.id}}</td>
          <td>{{book.name}}</td>
          <td>{{book.publish_date}}</td>
          <td>{{book.status}}</td>
          <td>{{book.author.firstname +' '+ book.author.name}}</td>
          <td>{{book.category}}</td>
          <td>
            <input type="submit" value="supprimer" @click="deleteFunct(book.id)" class="btn btn-danger">
            <button type="button" @click="editModal(book)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              modifier
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- Modal -->
      <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" id="exampleModalLongTitle">Edit Book</h2>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateBook()">
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Name:</label>
                  <input type="text" v-model="form.name" class="form-control" id="">
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Publish date:</label>
                  <input type="date" v-model="form.publish_date" class="form-control" id="recipient-name">
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Status:</label>
                  <input type="text" v-model="form.status" class="form-control" id="">
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Author firstname:</label>
                  <input type="text" v-model="form.firstname" class="form-control" id="">
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Author name:</label>
                  <input type="text" v-model="form.name" class="form-control" id="">
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Category:</label>
                  <input type="text" v-model="form.category" class="form-control" id="">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
              <button type="button" class="btn btn-primary">Valider</button>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import axios from "axios";
import Form from "vform";

export default {
  name: 'List',
  data: function(){
    return{
      books : null,
      error : null,
      book: {
        id: null,
      },
      form: new Form({
        publish_date: '',
        status: '',
        firstname: '',
        name: '',
        category: '',
      })
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
  methods: {
    deleteFunct(id){
      axios.delete('http://127.0.0.1:8000/api/books/' + id,{
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
    },
    editModal(book){
      this.form.reset();
      $('#edit').modal('show');
      this.form.fill(book);
    },
    updateBook(){
      // console.log('Editing data');
      this.form.put('http://127.0.0.1:8000/api/books/'+this.form.id)
        .then((response) => {
          // success
          console.log('edit ok', response)
          $('#edit').modal('hide');

        })
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
