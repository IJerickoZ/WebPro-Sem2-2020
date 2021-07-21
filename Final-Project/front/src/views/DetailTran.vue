<template>
<div class="container-fluid px-0">
    <img src="../assets/3.jpg" id="bg">
    <navbar />
  <div class="container">
    <div class="box mt-5" style="font-size: 26px;">
      <h1 class="title has-text-centered is-2">
        รายละเอียดธุรกรรมหมายเลข {{ detail.tran_id }}
      </h1>
      <!-- column 1 -->
      <div class="columns mt-5">
        <div class="column">
          <p v-if="detail.type === 'SALE'"> <b>ประเภทธุรกรรม : </b> ขาย</p>
          <p v-if="detail.type === 'PURCHASE'"> <b>ประเภทธุรกรรม : </b> ซื้อ</p>
        </div>
        <div class="column">
           <p><b>วันที่ดำเนินธุรกรรม :</b> {{tranD}} {{month[tranM - 1]}} {{TranDate[0]}}</p>
        </div>
      </div>
      <!-- column 2 -->
      <div class="columns">
        <div class="column">
          <b>พนักงานผู้ดำเนินธุรกรรม :</b> {{ detail.fname }} {{ detail.lname }}
        </div>
        <div class="column">
          <b>รหัสประจำตัวพนักงาน :</b> {{ detail.employee_emp_id }}
        </div>
      </div>
      <!-- column 3 -->
      <div class="columns">
        <div class="column">
          <b>ชื่อคู่ค้า :</b> {{detail.par_fname}} {{detail.par_lname}}
        </div>
        <div class="column">
          <b>ชื่อบริษัทคู่ค้า :</b> {{detail.company_name}}
        </div>
      </div>
      <!-- column 4 -->
      <div class="columns">
        <div class="column">
          <b>ยอดรวมธุรกรรม :</b> {{total.price}} บาท
        </div>
        <div class="column">
          <b>วิธีชำระเงิน :</b> {{detail.payment_method}}
        </div>
      </div>
      <!-- column 5 -->
      <div class="columns">
        <div class="column">
          <b>สถานะการชำระ :</b> {{detail.payment_status}}
        </div>
      </div>
      <!-- column 6 -->
      <div class="columns">
        <div class="column" v-if="detail.payment_status === 'Incomplete'">
          <b>ยอดค้างการชำระ :</b> {{detail.credit}} บาท
        </div>
        <div class="column" v-if="detail.payment_status === 'Incomplete'">
          <b>วันครบกำหนดชำระ :</b> {{creditD}} {{month[creditM - 1]}} {{creditDate[0]}}
        </div>
      </div>
      <!-- column 7 -->
      <div class="columns">
        <div class="column">
          <p v-if="detail.delivery_status === 1"><b>สถานะการจัดส่ง :</b> จัดส่งสำเร็จ</p>
          <p v-if="detail.delivery_status === 0"><b>สถานะการจัดส่ง :</b> ยังไม่ได้ทำการจัดส่ง</p>
        </div>
        <div class="column" v-if="detail.delivery_status === 1">
          <b>วันที่จัดส่ง :</b> {{deliveryD}} {{month[deliveryM - 1]}} {{deliveryDate[0]}}
        </div>
      </div>
    </div>
    <div class="box" style="font-size: 26px;">
      <div class="title">
      รายการสินค้า
    </div>
      <table class="table is-hoverable is-bordered">
        <thead class="has-text-centered">
          <tr>
            <th>ชื่อสินค้า</th>
            <th>ราคาต่อชิ้น</th>
            <th>จำนวนสินค้า</th>
            <th>ราคารวม</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='p in product' :key='p.id'>
            <td>{{p.title}}</td>
            <td>{{p.price}}</td>
            <td>{{p.count}}</td>
            <td>{{p.total}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import axios from '@/plugins/axios'
import navbar from "../components/Navbar.vue";

export default {
  data() {
    return {
      user: null,
      detail: {},
      total : {},
      product: {},
      TranDate: [],
      creditDate: [],
      deliveryDate: [],
      //Date
      tranD : 0,
      tranM : '',
      creditD : 0,
      creditM : '',
      deliveryD: 0,
      deliveryM: '',
      month: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    };
  },
  created() {
    this.getTranDetail(this.$route.params.id);
  },
  methods: {
    getTranDetail(blogId) {
      axios
        .get(`http://localhost:3000/trans/${blogId}`)
        .then((response) => {
          console.log(response.data);
          //change date form
          response.data.info[0].transaction_date = response.data.info[0].transaction_date.substring(
            0,
            response.data.info[0].transaction_date.indexOf("T")
          );
          response.data.info[0].credit_due_date = response.data.info[0].credit_due_date.substring(
            0,
            response.data.info[0].credit_due_date.indexOf("T")
          );
          //split string date
          this.TranDate = response.data.info[0].transaction_date.split('-')
          this.creditDate = response.data.info[0].credit_due_date.split('-')
         

          if(response.data.info[0].delivery_date != null){
            response.data.info[0].delivery_date = response.data.info[0].delivery_date.substring(
            0,
            response.data.info[0].delivery_date.indexOf("T")
          );
            this.deliveryDate = response.data.info[0].delivery_date.split('-')
            this.deliveryM = parseInt(this.deliveryDate[1])
            this.deliveryD = parseInt(this.deliveryDate[2])
          }
          //convert string month to int
          this.tranM = parseInt(this.TranDate[1])
          this.creditM = parseInt(this.creditDate[1])
          
          //convert day string to int
          this.tranD = parseInt(this.TranDate[2])
          this.creditD = parseInt(this.creditDate[2])
          
          //set up detail
          this.detail = response.data.info[0]
          this.total = response.data.total[0]
          this.product = response.data.product[0]
          console.log(this.detail)
          console.log(this.total)
          console.log(this.product);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onAuthChange (){
      const token = localStorage.getItem('token')
      if (token) {
        this.getUser()
      }
    },
    getUser () {
      axios.get('http://localhost:3000/user/me').then(res => {
        this.user = res.data
      })
    },
  },
  mounted(){
    this.onAuthChange()
  },
  components: {
    navbar,
  },
};
</script>
<style scoped>
#bg {
  position: fixed; 
  top: 0%; 
  left: 0%; 
  width: 200%; 
  height: 200%;
  opacity: 0.1;
}
#bg img {
  position: absolute; 
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0; 
  margin: auto; 
  min-width: 50%;
  min-height: 50%;
}
</style>