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
          <button type="button" @click="editModal(author)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
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
            <h2 class="modal-title" id="exampleModalLongTitle">Edit Author</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateAuthor()">
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Firstname:</label>
                <input type="text" v-model="form.firstname" class="form-control" id="">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Name:</label>
                <input type="text" v-model="form.name" class="form-control" id="recipient-name">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Birthday:</label>
                <input type="date" v-model="form.birthday" class="form-control" id="">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Death date:</label>
                <input type="date" v-model="form.death_date" class="form-control" id="">
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
      authors : null,
      error : null,
      author: {
        id: null,
      },
      form: new Form({
        firstname: '',
        name: '',
        birthday: '',
        death_date: '',
      })
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
    },
    editModal(author){
      this.form.reset();
      $('#edit').modal('show');
      this.form.fill(author);
    },
    updateAuthor(){
      // console.log('Editing data');
      this.form.put('http://127.0.0.1:8000/api/authors/'+this.form.id)
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
