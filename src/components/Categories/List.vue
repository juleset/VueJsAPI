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
          <button type="button" @click="editModal(category)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
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
            <h2 class="modal-title" id="exampleModalLongTitle">Edit category</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateCateg()">
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Name:</label>
                <input type="text" v-model="form.name" class="form-control" id="recipient-name">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
            <button type="button" @click="updateCateg" class="btn btn-primary">Valider</button>
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
      categories : null,
      error : null,
      category: {
        id: null,
      },
      form: new Form({
        id: '',
        name: '',
      })
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
    },
    editModal(category){
      this.form.reset();
      $('#edit').modal('show');
      this.form.fill(category)
    },
    updateCateg(){
      // console.log('Editing data');
      this.form.put('http://127.0.0.1:8000/api/categories/'+this.form.id,{
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${"vgufWBM3OYa6UJboDmXH6LuurORFXWmjlNMbqaC9"}`
        }
      })
        .then((response) => {
          // success
          console.log('edit ok', response)
          $('#edit').modal('hide');
          window.location.reload();
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
