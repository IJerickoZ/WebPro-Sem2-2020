<template>
  <div class="container-fluid px-0">
    <img src="../assets/3.jpg" id="bg">
    <navbar />
    <div class="container">
      <br />

      <div class="box">
        <h1 class="title has-text-centered is-2">ประวัติการดำเนินธุรกรรม(Transaction)</h1>
        <!-- button -->
      <div class="columns">
        <div class="column">
          <div class="field has-addons">
            <div class="control">
              <a
                class="button is-primary"
                @click="newTran = true"
                v-if="user.role === 'admin'"
              >
                + เพิ่มรายการธุรกรรม
              </a>
            </div>
            <div class="control is-expanded">
              <input
                class="input"
                type="text"
                placeholder="ค้นหาประวัติธุรกรรม"
                v-model="searchT"
              />
            </div>
            <div class="control">
              <a class="button is-info" @click="searchTran()">
                ค้นหา
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
      <!--End button -->

      <div class="box">
        <table class="table is-hoverable is-bordered" style="font-size: 20px;">
        <!-- header -->
        <thead class="has-text-centered">
          <tr>
            <th>หมายเลขธุรกรรม</th>
            <th>ประเภทธุรกรรม</th>
            <th>วันที่ดำเนินธุรกรรม</th>
            <th>วิธีการชำระเงิน</th>
            <th>สถานะการชำระ</th>
            <th>ยอดค้างการชำระ</th>
            <th>สถานะการจัดส่ง</th>
          </tr>
        </thead>
        <!-- End header -->
        <!-- footer -->
        <tfoot></tfoot>
        <!-- End footer table -->
        <!-- table body -->
        <tbody>
          <tr
            v-for="tran in trans"
            :key="tran.tran_id"
            @click="viewDetail(tran.tran_id)"
            style="cursor: pointer;"
          >
            <td>
              <a>#{{ tran.tran_id }}</a> 
            </td>
            <td> <a >{{ tran.type }}</a></td>
            <td> <a>{{ tran.transaction_date }}</a></td>
            <td><a>{{ tran.payment_method }}</a></td>
            <td><a>{{ tran.payment_status }}</a></td>
            <td><a>{{ tran.credit }}</a></td>
            <td v-if="tran.delivery_status === 0"><a>ยังไม่ได้ทำการจัดส่ง</a></td>
            <td v-if="tran.delivery_status === 1"><a>จัดส่งสำเร็จ</a></td>
          </tr>
        </tbody>
        <!-- End tbody -->
      </table>
      <br />
      <progress
        class="progress is-small"
        value="100"
        max="100"
      ></progress>

      </div>
      <!-- Tran modal -->
      <!-- for creat new transaction -->
      <div class="modal" v-bind:class="{ 'is-active': newTran }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head has-text-centered">
            <p class="modal-card-title">เพิ่มรายการประวัติธุรกรรม</p>
            <button
              class="delete"
              aria-label="close"
              @click="newTran = false"
            ></button>
          </header>
          <section class="modal-card-body">
            <!-- Content ... -->
            <div class="columns">
              <!-- first column -->
              <div class="column is-4">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label">ประเภท</label>
                  </div>
                  <div class="field-body">
                    <div class="field is-narrow">
                      <div class="control">
                        <label class="radio">
                          <input
                            type="radio"
                            name="member"
                            v-model="type"
                            value="PURCHASE"
                          />
                          ซื้อ
                        </label>
                        <label class="radio">
                          <input
                            type="radio"
                            name="member"
                            v-model="type"
                            value="SALE"
                          />
                          ขาย
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <template v-if="$v.type.$error">
                  <p class="help is-danger" v-if="!$v.type.required">
                    Type is required
                  </p>
                </template>
              </div>
              <div class="column is-8">
                <label for="" class="label">วันที่ดำเนินธุรกรรม :
                  <input
                    type="date"
                    v-model="transaction_date"
                    class='input w-50 is-small'
                  />
                </label>
                <template v-if="$v.transaction_date.$error">
                  <p
                    class="help is-danger ml-2"
                    v-if="!$v.transaction_date.required"
                  >
                    Please enter transaction date
                  </p>
                </template>
              </div>
            </div>
            <!-- End first column -->
            <div class="columns">
              <div class="column">
                <label class="label"
                  >ชื่อสินค้า :
                  <div class="select is-small">
                    <select v-model="title">
                    <option v-for="item in product" :key="item.pro_id">{{
                      item.title
                    }}</option>
                  </select>
                  </div>
                </label>
                <template v-if="$v.title.$error">
                  <p class="help is-danger ml-2" v-if="!$v.title.required">
                    Please select product
                  </p>
                </template>
              </div>
            </div>
            <!-- second colum -->
            <div class="columns">
              <div class="column is-4">
                <label for="" class="label"
                  >จำนวนสินค้า
                  <input
                    type="text"
                    v-model="count"
                    class="input"
                    :class="{ 'is-danger': $v.count.$error }"
                  />
                </label>
                <template v-if="$v.count.$error">
                  <p class="help is-danger ml-2" v-if="!$v.count.required">
                    Please enter number of products
                  </p>
                  <p class="help is-danger ml-2" v-if="!$v.count.minValue">
                    need at least 1 product
                  </p>
                </template>
              </div>
              <!-- Select method -->
              <div class="column is-4">
                <label class="label">วิธีการชำระเงิน</label>
                <!-- ENUM('Cash', 'Cheque', 'Creditcard') -->
                <select v-model="payament_method" class="select is-small w-100">
                  <option disabled value="วิธีการชำระเงิน" selected
                    >วิธีการชำระเงิน</option
                  >
                  <option value="Cheque">Cheque</option>
                  <option value="Creditcard">Creditcard</option
                  >s
                  <option value="Cash">Cash</option>
                </select>
                <template v-if="$v.payament_method.$error">
                  <p
                    class="help is-danger ml-2"
                    v-if="!$v.payament_method.required"
                  >
                    Please select payment method
                  </p>
                </template>
              </div>
              <div class="column is-4">
                <label for="" class="label"
                  >วันครบกำหนดชำระ
                  <input type="date" class='input' v-model="credit_due_date" />
                </label>
                <template v-if="$v.credit_due_date.$error">
                  <p
                    class="help is-danger ml-2"
                    v-if="!$v.credit_due_date.required"
                  >
                    credit date is required
                  </p>
                  <p
                    class="help is-danger ml-2"
                    v-if="!$v.credit_due_date.checkDate"
                  >
                    Please select date after transaction date
                  </p>
                </template>
              </div>
            </div>
            <!-- End second column -->
            <!-- column 3 -->
            <div class="columns">
              <div class="column is-4">
                <!-- payment status -->
                <label for=""><b>สถานะการชำระ</b></label>
                <div class="control" style="margin-left: 0.5em;">
                  <label class="radio">
                    <input
                      type="radio"
                      name=""
                      v-model="payament_status"
                      value="Complete"
                    />
                    ชำระครบถ้วน
                  </label>
                  <label class="radio" style="margin-left: 0em;">
                    <input
                      type="radio"
                      name=""
                      v-model="payament_status"
                      value="Incomplete"
                    />
                    ยังชำระไม่ครบ
                  </label>
                </div>
                <template v-if="$v.payament_status.$error">
                  <p
                    class="help is-danger ml-2"
                    v-if="!$v.payament_status.required"
                  >
                    Please select payment status
                  </p>
                </template>
              </div>
              <div class="column is-4">
                <label for="">ยอดการสั่งซื้อ(บาท)</label>
                <input
                  type="number"
                  class="input"
                  v-model="price"
                  :class="{ 'is-danger': $v.price.$error }"
                /><br />
                <template v-if="$v.price.$error">
                  <p class="help is-danger ml-2" v-if="!$v.price.required">
                    Please enter product price
                  </p>
                </template>
              </div>
              <!-- trigger if Incomplete -->
              <div class="column is-4" v-show="payament_status == 'Incomplete'">
                <label for="">ยอดค้างการชำระ</label>
                <input type="number" class="input" v-model="credit" /><br />
                <template v-if="$v.credit.$error">
                  <p class="help is-danger ml-2" v-if="!$v.credit.required">
                    Please enter credit
                  </p>
                </template>
              </div>
            </div>
            <!-- End column 3 -->
            <!-- column 4 -->
            <div class="columns">
              <div class="column is-4">
                <!-- deliverly status -->
                <label for=""><b>สถานะการจัดส่ง</b></label>
                <div class="control" style="margin-left: 0.5em;">
                  <label class="radio">
                    <input
                      type="radio"
                      name=""
                      v-model="delivery_status"
                      value="1"
                    />
                    จัดส่งสำเร็จ
                  </label>
                  <label class="radio" style="margin-left: 0em;">
                    <input
                      type="radio"
                      name=""
                      v-model="delivery_status"
                      value="0"
                    />
                    ยังไม่ได้ทำการจัดส่ง
                  </label>
                  <template v-if="$v.delivery_status.$error">
                    <p
                      class="help is-danger ml-2"
                      v-if="!$v.delivery_status.required"
                    >
                      Please select delivery status
                    </p>
                  </template>
                </div>
              </div>
              <div class="column is-4" v-if="delivery_status === '1'">
                <label for="" class="label"
                  >วันที่จัดส่งสินค้า
                  <input type="date" class='input' v-model="delivery_date" />
                </label>
                <template v-if="$v.delivery_date.$error">
                  <p
                    class="help is-danger ml-2"
                    v-if="!$v.delivery_date.requiredIf"
                  >
                    Please select delivery date
                  </p>
                </template>
              </div>
            </div>
            <!-- End column 4 -->
            <!-- colum 5 -->
            <div class="columns">
              <div class="field column is-4">
                <label class="label">รหัสพนักงานผู้ดำเนินการ</label>
                <div class="control">
                  <input
                    class="input"
                    type="number"
                    :class="{ 'is-danger': $v.employee_emp_id.$error }"
                    placeholder=""
                    v-model="employee_emp_id"
                  />
                </div>
                <template v-if="$v.employee_emp_id.$error">
                  <p
                    class="help is-danger ml-2"
                    v-if="!$v.employee_emp_id.required"
                  >
                    Please enter employee id
                  </p>
                </template>
              </div>
              <div class="field column is-4">
                <label class="label">รหัสคู่ค้าที่ทำธุรกรรม</label>
                <div class="control">
                  <input
                    class="input"
                    type="number"
                    :class="{ 'is-danger': $v.partner_par_id.$error }"
                    placeholder=""
                    v-model="partner_par_id"
                  />
                </div>
                <template v-if="$v.partner_par_id.$error">
                  <p
                    class="help is-danger ml-2"
                    v-if="!$v.partner_par_id.required"
                  >
                    Please enter partner id
                  </p>
                </template>
              </div>
            </div>
            <!-- End column 5  -->
          </section>
          <!--End content Body -->
          <footer class="modal-card-foot columns">
            <div class="column is-6">
              <button class="button is-info is-fullwidth" @click="creatTran()">
                เพิ่ม
              </button>
            </div>
            <div class="column is-6">
              <button
                class="button is-fullwidth is-danger"
                @click="newTran = false"
              >
                ยกเลิก
              </button>
            </div>
          </footer>
        </div>
      </div>
      <!-- End Model -->
    </div>
    <down/>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import navbar from "../components/Navbar.vue";
import down from "../components/Footer.vue";
import { required, minValue, requiredIf } from "vuelidate/lib/validators";


function checkDate(value){
  if (value >= this.transaction_date){
    return true
  }
  else{
    return false
  }
}

export default {
  data() {
    return {
      user: null,
      check: false,
      newTran: false,
      selectMethod: false,
      trans: [],
      emp: [],
      product: [],
      searchT: "",
      /* trans ins */
      delivery_date: "",
      credit: 0,
      payament_method: "",
      payament_status: "",
      credit_due_date: "",
      transaction_date: "",
      delivery_status: "",
      type: "",
      employee_emp_id: "",
      partner_par_id: "",
      count: 1,
      price: "",
      title: "",
      /* Ene Trans ins */
    };
  },
  mounted() {
    this.getTrans(), this.onAuthChange();
  },
  methods: {
    getTrans() {
      axios
        .get("http://localhost:3000/trans")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].transaction_date = response.data[
              i
            ].transaction_date.substring(
              0,
              response.data[i].transaction_date.indexOf("T")
            );
          }
          this.trans = response.data;
          console.log(response.data[0].transaction_date);
          console.log(response.data);
          console.log(this.trans);
        })
        .catch((err) => {
          console.log(err);
        });
      axios.get("http://localhost:3000/products").then((res) => {
        this.product = res.data;
      });
    },
    /*  creat Tran here  */
    creatTran() {
      /* set up data */
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        if (this.delivery_status === "0") {
          this.delivery_date = null;
        }
        let body = {
          delivery_date: this.delivery_date,
          credit: this.credit,
          payament_method: this.payament_method,
          payament_status: this.payament_status,
          credit_due_date: this.credit_due_date,
          transaction_date: this.transaction_date,
          delivery_status: parseInt(this.delivery_status),
          type: this.type,
          employee_emp_id: this.employee_emp_id,
          partner_par_id: this.partner_par_id,
          count: this.count,
          price: this.price,
          title: this.title,
        };

        /* Request axios */
        axios
          .post("http://localhost:3000/trans", body)
          .then((response) => {
            console.log("response: ", response);
            console.log("Success");
            this.getTrans();
            /* reset */
            this.newTran = false;
            this.delivery_date = "";
            this.credit = 0;
            this.payament_method = "";
            this.payament_status = "";
            this.credit_due_date = "";
            this.transaction_date = "";
            this.delivery_status = "";
            this.type = "";
            this.employee_emp_id = "";
            this.partner_par_id = "";
            this.count = "";
            this.price = "";
            this.title = "";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    searchTran() {
      axios
        .get("http://localhost:3000/trans", {
          params: {
            search: this.searchT,
          },
        })
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].transaction_date = response.data[
              i
            ].transaction_date.substring(
              0,
              response.data[i].transaction_date.indexOf("T")
            );
          }
          this.trans = response.data;
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    viewDetail(id) {
      this.$router.push({ path: `/trans/${id}` });
    },
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      axios.get("http://localhost:3000/user/me").then((res) => {
        this.user = res.data;
      });
    },
  },
  components: {
    navbar,
    down
  },
  validations: {
    type: {
      required: required,
    },
    title: {
      required: required,
    },
    count: {
      required: required,
      minValue: minValue(1),
    },
    payament_method: {
      required: required,
    },
    payament_status: {
      required: required,
    },
    price: {
      required: required,
    },
    delivery_status: {
      required: required,
    },
    employee_emp_id: {
      required: required,
    },
    partner_par_id: {
      required: required,
    },
    credit: {
      required: required,
    },
    credit_due_date: {
      required: required,
      checkDate : checkDate
    },
    delivery_date: {
      requiredIf: requiredIf(function() {
        if (
          (this.delivery_date === "" && this.delivery_status === "0") ||
          this.delivery_date != "" ||
          this.delivery_date === null
        ) {
          return false;
        } else {
          return true;
        }
      }),
    },
    transaction_date: {
      required: required,
    },
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
