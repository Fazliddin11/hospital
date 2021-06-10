<template>
    <div>



    <form class="form1" :class="{'active':isactive}"> 
    <v-text-field
      v-model="department"
    
      :counter="10"
      label="BO'LIM"
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
    </form>

    <div class="form">
      <table border="1px" width="100%">
      <tr>
        <td>bo'lim:</td>
        <td>O'chirish:</td>
      </tr>
      <tr v-for="(section,index) of filTasks" :key="index">
        <td>{{section.departments}}</td>
        <td><button @click="del(section, index)">DELETE</button></td>
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
import axios from 'axios'

export default {
name:'App',
data(){
    return{
        sections:[],
        department:'',
        Active: false,
        isactive: false,
        ssections:'',
        searchTasks:''
        }
    },
    methods:{
      del(section, index){
        axios.delete('http://localhost:3000/sections/'+section.id)
        .then(()=>{
          this.sections.splice(index, 1)
        })
        // console.log(index);
      },
        submit(){
            const section = {
                departments: this.department
            }
            this.$http.post('http://localhost:3000/sections',section)
            .then(response => {return response.json()})
            .then(newSection => {this.sections.push(newSection)})
        }
    },
    created(){
            this.$http.get('http://localhost:3000/sections')
                .then(response => {return response.json()})
                .then(allSection => {
                this.sections = allSection
            })
            var k = 0
            this.$http.get('http://localhost:3000/persons')
                .then(response => {return response.json()})
                .then(Section => {
                Section.find(item => {
                  this.sections.forEach(items => {
                    
                      console.log('itemSec',item.section);
                      console.log('depar',items.departments);
                      if(item.section===items.departments){
                          k = k + 1
                          console.log('teng ekan');
                      }
                      
                  })
                   
                })
                
            })
           
        
           
            
    },
    computed:{
      filTasks(){
        return this.sections.filter(item=>{
          return item.departments.toLowerCase().indexOf(this.searchTasks.toLowerCase()) !==-1 
        })
      }
    }
}
</script>

<style>
table{
  border-color: unset;
}
.btn{
    position: absolute;
    bottom: 0;
    right: 0;
}
button:focus{
    outline: 0;
}
.plus{
    width: 70px;
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
  .text1{
    padding-top: 40px;
    font-size: 20px;
    line-height: 26px;
    font-weight: bold;
  }
  .text2{
    padding-top: 50px;
    font-size: 20px;
    line-height: 26px;
    font-weight: bold;
  }
  .form{
    padding-top: 40px;
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