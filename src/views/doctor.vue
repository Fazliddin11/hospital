<template>
  <div class="home">
    <div class="text">
        Shifokorlar
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
      v-model="mutaxasislig"
      :error-messages="nameErrors"
      :counter="10"
      label="mutaxasislig"
      required
      @input="$v.data.$touch()"
      @blur="$v.data.$touch()"
    ></v-text-field>

    <v-container
    class="spacing-playground pa-6"
    fluid
  >
    <v-row>
      <v-col
        class="d-flex align-center"
        cols="12"
        sm="6"
      >
        <v-select
            v-model="bolim"
            :items="sas"
            class="pr-2"
            label="Qaysi bo'limda ishlaysiz"
        >
          <template v-slot:prepend>
            <strong class="primary--text py-1">BO'LIM</strong>
          </template>

          <template v-slot:append-outer>
            <!-- <div class="py-1">
              -
            </div> -->
          </template>
        </v-select>

      </v-col>
    </v-row>
  </v-container>

    <div class="checkbox">
        <v-checkbox
      v-model="box"
      value="DU"
      :label="`DU`"
    ></v-checkbox>
    <v-checkbox
      v-model="box"
      value="SE"
      :label="`SE`"
    ></v-checkbox>
    <v-checkbox
      v-model="box"
      value="CHOR"
      :label="`CHOR`"
    ></v-checkbox>
    <v-checkbox
      v-model="box"
      value="PAY"
      :label="`PAY`"
    ></v-checkbox>
    <v-checkbox
      v-model="box"
      value="JUMA"
      :label="`JUMA`"
    ></v-checkbox>
    <v-checkbox
      v-model="box"
      value="SHANBA"
      :label="`SHANBA`"
    ></v-checkbox>
    <v-checkbox
      v-model="box"
      value="YAK"
      :label="`YAK`"
    ></v-checkbox>
    </div>
    
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
        <td>mutaxasislig:</td>
        <td>bo'lim:</td>
        <td>qabul-kunlari:</td>
        <td>O'chirish</td>
      </tr>
      <tr v-for="(doctor,index) of filDoctor" :key="index">
        <td>{{doctor.ism}}</td>
        <td>{{doctor.pochta}}</td>
        <td>{{doctor.specialist}}</td>
        <td>{{doctor.section}}</td>
        <td>{{doctor.checkBox.toString()}}</td>
        <td><button @click="del(doctor, index)">DELETE</button></td>
      </tr>
      </table>
    </div>
    <v-app-bar app>
    <div class="head">
      <div class="search">
        <button>
          <img src="../assets/search.png" alt="">
        </button>
        <input type="text" placeholder="Qidiruv" v-model="searchDoctor">
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

    data(){
        const spacers = Array.from({ length: 17 }, (val, i) => `${i}`)
        const nspacers = Array.from({ length: 16 }, (val, i) => `n${i + 1}`)
        const defaults = ['auto', ...spacers]
        return{
            sas: [],
            isactive: false,
            Active: true,
            name: '',
            email: '',
            mutaxasislig: '',
            bolim: '',
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ],
            checkbox: false,
            box: [],
            weeks:[],
            doctors:[],
            checkBox:[],
            sections:[],
            // directions: ['KARDIALOGIYA', 'LORALOGIYA', 'GENIKALOGIYA', 'URALOGIYA'],
            marginDirection: 'a',
            marginSize: '2',
            marginSizes: [...defaults, ...nspacers],
            paddingDirection: 'a',
            paddingSize: '6',
            paddingSizes: defaults, 
            searchDoctor:''
        }
    },
    
    
    
    computed: {
      filDoctor(){
        return this.doctors.filter(item=>{
          return item.ism.toLowerCase().indexOf(this.searchDoctor.toLowerCase()) !==-1 || item.pochta.toLowerCase().indexOf(this.searchDoctor.toLowerCase()) !==-1 || item.specialist.indexOf(this.searchDoctor) !==-1 || item.section.toLowerCase().indexOf(this.searchDoctor.toLowerCase()) !==-1 || item.checkBox.toString().toLowerCase().indexOf(this.searchDoctor.toLowerCase()) !==-1 
        })
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
        computedPadding () {
        return `p${this.paddingDirection}-${this.paddingSize}`
      },
      computedMargin () {
        return `m${this.marginDirection}-${this.marginSize}`
      },
    },

    methods: {
      del(doctor, index){
        axios.delete('http://localhost:3000/doctors/'+doctor.id)
        .then(()=>{
          this.doctors.splice(index, 1)
        })
        // console.log(index);
      },
        add(){
        this.isactive = !this.isactive
        this.Active = !this.Active
        },
    submit () {
        const doctor = {
            ism: this.name,
            pochta: this.email,
            specialist: this.mutaxasislig,
            section: this.bolim,
            checkBox: this.box.toString()
            }
            console.log('ism',this.name);
            console.log('pochta',this.email);
            console.log('mutaxasislig',this.mutaxasislig);
            console.log('bolim',this.bolim);
            console.log('box',this.box);


this.$http.post('http://localhost:3000/doctors',doctor)
          .then(response => {return response.json()})
          .then(newDoctor => {this.doctors.push(newDoctor)})

        
        this.$v.$touch()
        this.name = ''
        this.email = ''
        this.mutaxasislig = ''
        this.bolim = ''
        this.doctor = ''
        this.sabab = ''
        this.box = []
        this.isactive = !this.isactive
        this.Active = !this.Active
    },

    clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.mutaxasislig = ''
        this.bolim = ''
        this.doctor = ''
        this.sabab = ''
        this.box = ''
        this.select = null
        this.checkbox = false
        },
    },
    created(){


        this.$http.get('http://localhost:3000/doctors')
            .then(response => {return response.json()})
            .then(alldoctor => {
            this.doctors = alldoctor
            console.log(this.doctors);
            })

            this.$http.get('http://localhost:3000/sections')
                .then(response => {return response.json()})
                .then(allSection => {
                this.sections = allSection
                allSection.forEach(element => {
                    this.sas.push(element.departments)
                });
                })
                
        },
        
    }

</script>

<style scoped>
table{
  border-color: unset;
}
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
  .checkbox{
      display: flex;
      justify-content: space-between;
  }
  select:focus{
      outline: 0;
  }
  select{
      border-radius: 2px;
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
