<template>
  <div class="home">
    <div class="text">
      Bemorlar
    </div>
    <div class="btn">
      <button @click="add"><img src="../assets/default.png" alt=""></button>
    </div>
    <div class="inputs">
      <form class="form1" :class="{'active':isactive}">
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="sana"
      :error-messages="nameErrors"
      :counter="10"
      label="Sana"
      required
      @input="$v.data.$touch()"
      @blur="$v.data.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="vaqt"
      :error-messages="nameErrors"
      :counter="10"
      label="Qabul vaqti"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="doctor"
      :error-messages="nameErrors"
      :counter="10"
      label="SHifokor"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="sabab"
      :error-messages="nameErrors"
      :counter="10"
      label="Sabab"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>

    <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
    </div>
    <div class="form1" :class="{'active':Active}" >
      <table border="1px" width="100%">
      <tr>
        <td>ism-sharf:</td>
        <td>email:</td>
        <td>Sana:</td>
        <td>Qabul-vaqti:</td>
        <td>Shifokor:</td>
        <td>Sabab:</td>
        <td>O'chirish:</td>
      </tr>
      <tr v-for="(task,index) of filTasks" :key="index">
        <td>{{task.ism}}</td>
        <td>{{task.pochta}}</td>
        <td>{{task.data}}</td>
        <td>{{task.time}}</td>
        <td>{{task.shifokor}}</td>
        <td>{{task.cause}}</td>
        <td><button @click="del(task ,index)">DELETE</button></td>
      </tr>
      </table>
    </div>
    <v-app-bar app>
    <div class="head">
      <div class="search">
        <button>
          <img src="../assets/search.png" alt="">
        </button>
        <input type="text" placeholder="Qidiruv" v-model="searchTasks">
      </div>
    </div>
  </v-app-bar> 
    
  </div>
  
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import axios from 'axios' 



  export default {
    name: 'Home',
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      isactive: false,
      Active: true,
      name: '',
      email: '',
      sana: '',
      vaqt: '',
      doctor: '',
      sabab: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
      tasks:[],
      searchTasks:''
    }),
    computed: {
      searchs(){
        return this.$store.getters.searTodos
      },
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      filTasks(){
        return this.tasks.filter(item=>{
          return item.ism.toLowerCase().indexOf(this.searchTasks.toLowerCase()) !==-1 || item.pochta.toLowerCase().indexOf(this.searchTasks.toLowerCase()) !==-1 || item.data.indexOf(this.searchTasks) !==-1 || item.time.toLowerCase().indexOf(this.searchTasks.toLowerCase()) !==-1 || item.shifokor.toLowerCase().indexOf(this.searchTasks.toLowerCase()) !==-1 || item.cause.toLowerCase().indexOf(this.searchTasks.toLowerCase()) !==-1
        })
      }
    },

    methods: {
      del(task, index){
        axios.delete('http://localhost:3000/tasks/'+task.id)
        .then(()=>{
          this.tasks.splice(index, 1)
        })
      },
      add(){
        this.isactive = !this.isactive
        this.Active = !this.Active
        
      },
      submit () {
        const task = {
          ism: this.name,
          pochta: this.email,
          data: this.sana,
          time: this.vaqt,
          shifokor: this.doctor,
          cause: this.sabab,
        }
        console.log('tassk',task);

        this.$http.post('http://localhost:3000/tasks',task)
          .then(response => {return response.json()})
          .then(newTask => {this.tasks.push(newTask)})
        
        
        this.$v.$touch()
        this.name = ''
        this.email = ''
        this.email = ''
        this.sana = ''
        this.vaqt = ''
        this.doctor = ''
        this.sabab = ''
        this.isactive = !this.isactive
        this.Active = !this.Active
      },
      
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.email = ''
        this.sana = ''
        this.vaqt = ''
        this.doctor = ''
        this.sabab = ''
        this.select = null
        this.checkbox = false
      },
    },
    created(){

        this.$http.get('http://localhost:3000/tasks')
          .then(response => {return response.json()})
          .then(allTask => {
            this.tasks = allTask
            console.log(this.tasks);
          })
      },
  }

</script>

<style scoped>
.form1{
  display: none;
}
.active{
  display: block;
}
.home{
  position: relative;
}
  .text{
    font-size: 40px;
    line-height: 46px;
    font-weight: bold;
  }
  .btn button:focus {
    outline: 0;
  }
  .btn button{
    position: fixed;
    top: 630px;
    right: 0;
  }
  table{
    border-collapse: collapse;
  }
  table tr:first-child{
    color: #336CFB;
  }
  table tr:nth-child(even){
    background-color: #f2f2f2;
  }
  td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  table{
    border-color: unset;
  }
  .head .search button {
    background-color: unset;
    padding-right: 10px;
  }
  .head .search button:focus{
    outline: 0;
  }
  .head .search input:focus{
    outline: 0;
  }
  .head .search {
    background-color: white;
    padding: 12px 300px 12px 10px;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
  }
</style>
