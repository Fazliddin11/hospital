<template>
  <v-app>
  <v-navigation-drawer app>
    <v-card
    height="400"
    width="256"
    class="mx-auto"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <img src="./assets/logo1.png" alt="">
          </v-list-item-title>
          <v-list-item-subtitle>
            MEDICINE
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link :to="item.link"
        >
          <v-list-item-icon >
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <!-- <span class="btn-text"></span> -->
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
  </v-navigation-drawer>
  


  

  <v-main class="a">

    <v-container fluid>

      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
  </v-footer>
</v-app>
</template>

<style scoped>
  .a{
  background-color: #E5E5E5;
  }
  
  .btn {
    margin: 20px auto;
    border: none;
    padding: 10px 44px;
    font-size: 36px;
    position: relative;
  }
  .btn::before {
    transition: all 0.85s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    content: '';
    width:20%;
    height: 100%;
    background: #336CFB;
    position: absolute;
    top: 0;
    left: 0;
}
  .btn .btn-text {
    color: white;
    mix-blend-mode: difference;
}
  .btn:hover::before {
    background: #336CFB;
    width: 100%;
}
</style>

<script>


export default {
  name: 'App',
created(){
        this.$http.get('http://localhost:3000/tasks')
          .then(response => {return response.json()})
          .then(allTask => {
            this.tasks = allTask
            console.log(this.tasks);
          })
    },
  data () {
      return {
        items: [
          { title: 'Bosh sahifa', icon: 'mdi-home', link:'/'},
          { title: 'Qabulga yozilganlar', icon: 'mdi-hospital-box', link:'/appointment' },
          { title: 'Shifokorlar', icon: 'mdi-doctor', link:'/doctor' },
          { title: 'Bo’limlar', icon: 'mdi-hospital-building', link:'/department' },
          { title: 'Bemorlar', icon: 'mdi-emoticon-sick-outline', link:'/patient' },
          { title: 'Yordam', icon: 'mdi-help-box', link:'/help' },
        ],
        right: null,
        tasks:[],
        searchTasks: []
      }
    },
    methods: {
      
    },
    computed:{
      searchtask(){
        return this.$store.state.tasks
      },
      filTasks(){
        return this.tasks.filter(item=>{
          return item.ism.toLowerCase().indexOf(this.searchTasks.toLowerCase()) !==-1 || item.pochta.toLowerCase().indexOf(this.searchTasks.toLowerCase()) !==-1 || item.data.indexOf(this.searchTasks) !==-1 || item.time.toLowerCase().indexOf(this.searchTasks.toLowerCase()) !==-1 || item.shifokor.toLowerCase().indexOf(this.searchTasks.toLowerCase()) !==-1 || item.cause.toLowerCase().indexOf(this.searchTasks.toLowerCase()) !==-1
        })
      }
    },
  components: {
    
  },

  
};
</script>
