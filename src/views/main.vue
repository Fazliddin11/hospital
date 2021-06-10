<template>
  <div>
    <div class="imgs_texts">
      <div class="one">
        <img src="../assets/bag.png" alt="">
        <div class="texts">
            <div class="text">
              Hodimlar
            </div>
            <div class="num">
              {{doctors.length}}
            </div>
        </div>
      </div>
      <div class="two">
        <img src="../assets/bemor.png" alt="">
        <div class="texts">
            <div class="text">
              Bemorlar
            </div>
            <div class="num">
              {{tasks.length}}
            </div>
        </div>
      </div>
      <div class="three">
        <img src="../assets/xona.png" alt="">
        <div class="texts">
            <div class="text">
              Xonalar
            </div>
            <div class="num">
              12
            </div>
        </div>
      </div>
      <div class="four">
        <img src="../assets/byudjet.png" alt="">
        <div class="texts">
            <div class="text">
              Byudjet
            </div>
            <div class="num">
              1200$
            </div>
        </div>
        
      </div>
    </div>
    <div class="text1">
      Bemorlar
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
      </tr>
      <tr v-for="(task,index) of tasks" :key="index">
        <td>{{task.ism}}</td>
        <td>{{task.pochta}}</td>
        <td>{{task.data}}</td>
        <td>{{task.time}}</td>
        <td>{{task.shifokor}}</td>
        <td>{{task.cause}}</td>
      </tr>
      </table>
    </div>
    <div class="text2">
        Shifokorlar
    </div>
    <div class="form1" :class="{'active':Active}" >
      <table border="1px" width="100%">
      <tr>
        <td>ism-sharf:</td>
        <td>email:</td>
        <td>mutaxasislig:</td>
        <td>bo'lim:</td>
        <td>qabul-kunlari:</td>
      </tr>
      <tr v-for="(doctor,index) of doctors" :key="index">
        <td>{{doctor.ism}}</td>
        <td>{{doctor.pochta}}</td>
        <td>{{doctor.specialist}}</td>
        <td>{{doctor.section}}</td>
        <td>{{doctor.checkBox.toString()}}</td>
      </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
name:'App',
data(){
    return{
        doctors:[],
        tasks:[]
        }
    },
created(){
        this.$http.get('http://localhost:3000/tasks')
          .then(response => {return response.json()})
          .then(allTask => {
            this.tasks = allTask
            console.log(this.tasks);
          })
        this.$http.get('http://localhost:3000/doctors')
            .then(response => {return response.json()})
            .then(alldoctor => {
            this.doctors = alldoctor
            console.log(this.doctors);
            })
    }
}
</script>

<style scoped>
table{
  border-color: unset;
}
  .imgs_texts{
    display: flex;
    justify-content: space-between;
  }
  .texts{
    padding-right: 90px;
    padding-left: 10px;
  }
  .one{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 255px;
    height: 88px;
    border-radius: 15px;
  }
  .two{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 255px;
    height: 88px;
    border-radius: 15px;
  }
  .three{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 255px;
    height: 88px;
    border-radius: 15px;
  }
  .four{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 255px;
    height: 88px;
    border-radius: 15px;
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
</style>