<template>
  <div class="container-fluid px-0">
    <img src="../assets/3.jpg" id="bg">
    <navbar />
    <div class="container">
      <div class="box mt-3 pt-2">
        <h1 class="title" style="display: inline">
        ค้นหาพนักงานที่คุณต้องการ
      </h1>
      <div class="columns mt-5">
        <div class="column">
          <div class="field has-addons">
            <div class="control">
              <a
                class="button is-primary"
                v-on:click="checkadd = !checkadd"
                v-if="user.role === 'admin'"
              >
                + เพิ่มพนักงาน
              </a>
            </div>
            <div class="control is-expanded">
              <input
                class="input"
                type="text"
                placeholder="ค้นหาพนักงาน"
                v-model="search12"
              />
            </div>
            <div class="control">
              <a class="button is-info" v-on:click="search()">
                ค้นหา
              </a>
            </div>
          </div>
        </div>
      </div>
      
      </div>
      <div class="box">
          <u><h1 class="title has-text-centered">รายชื่อพนักงาน</h1></u>
      <div class="columns is-multiline" style="padding-top: 5%">
        <div class="column is-3" v-for="emp in blog" :key="emp.id">
          <div class="card">
            <div class="card-image">
              <img
                src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
              />
            </div>
            <div class="card-content">
              <div class="content">
                <p class="title is-4">{{ emp.fname }} {{ emp.lname }}</p>
                <p>- {{ emp.position }}</p>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" v-on:click="emp.check = !emp.check"
                >Profile</a
              >
              <a
                v-if="user.role === 'admin'"
                class="card-footer-item"
                v-on:click="EditFirstClick(emp)"
                >Edit</a
              >
              <a
                v-if="user.role === 'admin'"
                class="card-footer-item"
                v-on:click="DeleteEmp(emp)"
                >Delete</a
              >
            </footer>
          </div>
        </div>
      </div>
      </div>
      <!--Modal with v-for-->
      <div
        class="modal"
        v-for="mo in blog"
        :key="mo.id"
        v-bind:class="{ 'is-active': mo.check }"
      >
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">{{ mo.fname }} {{ mo.lname }}</p>
            <button
              v-on:click="mo.check = !mo.check"
              class="delete"
              aria-label="close"
            ></button>
          </header>
          <section class="modal-card-body">
            <!-- Content ... -->
            <div class="container">
              <div class="columns">
                <div class="column is-6">
                  <img
                    src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
                  />
                </div>
                <div class="column is-6">
                  <div class="content" style="padding-top: 3%">
                    <h4><strong>Name :</strong> {{ mo.fname }} {{ mo.lname }}</h4>
                    <p><strong>Id :</strong> {{ mo.emp_id }}</p>
                    <p><strong>Position : </strong>{{ mo.position }}</p>
                    <p><strong>Tel :</strong> {{ mo.phone }}</p>
                    <p><strong>Email :</strong> {{ mo.email }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button" v-on:click="mo.check = !mo.check">
              Cancel
            </button>
          </footer>
        </div>
      </div>
      <!--Modal For Edit-->
      <div
        class="modal"
        v-for="mod in blog"
        :key="mod.id"
        v-bind:class="{ 'is-active': mod.checkedit }"
      >
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Employee</p>
            <button
              v-on:click="mod.checkedit = !mod.checkedit"
              class="delete"
              aria-label="close"
            ></button>
          </header>
          <section class="modal-card-body">
            <!-- Content ... -->
            <div class="container">
              <div class="columns">
                <div class="column is-6">
                  <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.name2.$model"
                        placeholder="Text input"
                      />
                      <p
                        class="help"
                        v-if="$v.name2.$error == true"
                        style="color: red"
                      >
                        Please Fill Name
                      </p>
                    </div>
                  </div>
                </div>
                <div class="column is-6">
                  <div class="field">
                    <label class="label">Surname</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.surname2.$model"
                        placeholder="Text input"
                      />
                      <p
                        class="help"
                        v-if="$v.surname2.$error == true"
                        style="color: red"
                      >
                        Please Fill Surname
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-12">
                  <div class="field">
                    <label class="label">Position</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.position2.$model"
                        placeholder="Data Engineer"
                      />
                      <p
                        class="help"
                        v-if="$v.position2.$error == true"
                        style="color: red"
                      >
                        Please Fill Position
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Salary</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.salary2.$model"
                        placeholder="Data Engineer"
                      />
                      <template v-if="$v.salary2.$error == true">
                        <p
                          class="help"
                          v-if="$v.salary2.required == false"
                          style="color: red"
                        >
                          Please Fill Salary
                        </p>
                        <p
                          class="help"
                          v-if="$v.salary2.integer == false"
                          style="color: red"
                        >
                          Please Fill Integer
                        </p>
                      </template>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                      <input
                        class="input"
                        type="email"
                        v-model="$v.email2.$model"
                        placeholder="aaa@aaa.com"
                      />
                      <p
                        class="help"
                        v-if="$v.email2.$error == true"
                        style="color: red"
                      >
                        Please Fill Email
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Address</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.address2.$model"
                        placeholder="Bangkok Mailbox 10200"
                      />
                      <p
                        class="help"
                        v-if="$v.address2.$error == true"
                        style="color: red"
                      >
                        Please Fill Address
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Tel.</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.tel2.$model"
                        placeholder="0800000000"
                      />
                      <p
                        class="help"
                        v-if="$v.tel2.$error == true"
                        style="color: red"
                      >
                        Please Fill Phone Number
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" v-on:click="EditEmp(mod)">
              Save changes
            </button>
            <button class="button" v-on:click="mod.checkedit = !mod.checkedit">
              Cancel
            </button>
          </footer>
        </div>
      </div>
      <!--Modal For Add Employee-->
      <div class="modal" v-bind:class="{ 'is-active': checkadd }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">เพิ่มรายชื่อพนักงาน</p>
            <button
              v-on:click="checkadd = !checkadd"
              class="delete"
              aria-label="close"
            ></button>
          </header>
          <section class="modal-card-body">
            <!-- Content ... -->
            <div class="container">
              <div class="columns">
                <div class="column is-6">
                  <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.name.$model"
                        placeholder="Text input"
                      />
                      <p
                        class="help"
                        v-if="$v.name.$error == true"
                        style="color: red"
                      >
                        Please Fill Name
                      </p>
                    </div>
                  </div>
                </div>
                <div class="column is-6">
                  <div class="field">
                    <label class="label">Surname</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.surname.$model"
                        placeholder="Text input"
                      />
                      <p
                        class="help"
                        v-if="$v.surname.$error == true"
                        style="color: red"
                      >
                        Please Fill Surname
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-4">
                  <div class="field">
                    <label class="label">Gender</label>
                  </div>
                  <div class="select">
                    <select v-model="$v.gender.$model">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    <p
                      class="help"
                      v-if="$v.gender.$error == true"
                      style="color: red"
                    >
                      Please Select Gender
                    </p>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <label class="label">Birth</label>
                  </div>
                  <input class="input" v-model="$v.birth.$model" type="date" />
                  <p
                    class="help"
                    v-if="$v.birth.$error == true"
                    style="color: red"
                  >
                    Please Select Birth
                  </p>
                </div>
              </div>
              <div class="columns">
                <div class="column is-12">
                  <div class="field">
                    <label class="label">Position</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.position.$model"
                        placeholder="Data Engineer"
                      />
                      <p
                        class="help"
                        v-if="$v.position.$error == true"
                        style="color: red"
                      >
                        Please Fill Position
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Salary</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.salary.$model"
                        placeholder="50000"
                      />
                      <template v-if="$v.salary.$error == true">
                        <p
                          class="help"
                          v-if="$v.salary.required == false"
                          style="color: red"
                        >
                          Please Fill Salary
                        </p>
                        <p
                          class="help"
                          v-if="$v.salary.integer == false"
                          style="color: red"
                        >
                          Please Fill Integer
                        </p>
                      </template>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                      <input
                        class="input"
                        type="email"
                        v-model="$v.email.$model"
                        placeholder="aaa@aaa.com"
                      />
                      <p
                        class="help"
                        v-if="$v.email.$error == true"
                        style="color: red"
                      >
                        Please Fill Email
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                      <input
                        class="input"
                        type="password"
                        v-model="$v.password.$model"
                        placeholder="xxxxxx"
                      />
                      <p
                        class="help"
                        v-if="$v.password.$error == true"
                        style="color: red"
                      >
                        Please Fill The Correct Password
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Address</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.address.$model"
                        placeholder="Bangkok Mailbox 10200"
                      />
                      <p
                        class="help"
                        v-if="$v.address.$error == true"
                        style="color: red"
                      >
                        Please Fill Address
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Tel.</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.tel.$model"
                        placeholder="0800000000"
                      />
                      <p
                        class="help"
                        v-if="$v.tel.$error == true"
                        style="color: red"
                      >
                        Please Fill Phone Number
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Citizen</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.citizen.$model"
                        placeholder="0000000000000"
                      />
                      <template v-if="$v.citizen.$error == true">
                        <p
                          class="help"
                          v-if="$v.citizen.required == false"
                          style="color: red"
                        >
                          Please Fill Citizen
                        </p>
                        <p
                          class="help"
                          v-if="$v.citizen.integer == false"
                          style="color: red"
                        >
                          Please Fill Integer
                        </p>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" v-on:click="AddEmp()">
              Save changes
            </button>
            <button class="button" v-on:click="checkadd = !checkadd">
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
    <down/>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import down from "../components/Footer.vue";
import navbar from "../components/Navbar.vue";
import { required, email, maxLength, integer } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      user: null,
      checkadd: false,
      blog: {},
      search12: "",
      name: "",
      surname: "",
      gender: "",
      birth: "",
      position: "",
      salary: "",
      email: "",
      address: "",
      tel: "",
      password: "",
      citizen: "",
      //Edit
      name2: "",
      surname2: "",
      position2: "",
      salary2: "",
      email2: "",
      address2: "",
      tel2: "",
    };
  },
  components: {
    navbar,
    down,
  },
  created() {
    axios.get("http://localhost:3000/employees").then((response) => {
      for (let comment of response.data.blogs) {
        comment.check = false;
        comment.checkedit = false;
      }
      this.blog = response.data.blogs;
      console.log(this.blog);
      /*for (let i = 0; i < this.blog.length; i++) {
        this.blog[i].check = false;
      }*/
      //console.log(this.blog[0].check);
    });
  },
  methods: {
    search() {
      if (this.search12 != " ") {
        axios
          .get("http://localhost:3000/employees?search=" + this.search12)
          .then((response) => {
            for (let comment of response.data.blogs) {
              comment.check = false;
              comment.checkedit = false;
            }
            this.blog = response.data.blogs;
          });
      }
    },
    AddEmp() {
      this.$v.citizen.$touch();
      this.$v.name.$touch();
      this.$v.surname.$touch();
      this.$v.gender.$touch();
      this.$v.salary.$touch();
      this.$v.position.$touch();
      this.$v.password.$touch();
      this.$v.email.$touch();
      this.$v.address.$touch();
      this.$v.birth.$touch();
      this.$v.tel.$touch();
      if (
        this.$v.citizen.$invalid == false &&
        this.$v.name.$invalid == false &&
        this.$v.surname.$invalid == false &&
        this.$v.gender.$invalid == false &&
        this.$v.position.$invalid == false &&
        this.$v.salary.$invalid == false &&
        this.$v.password.$invalid == false &&
        this.$v.email.$invalid == false &&
        this.$v.address.$invalid == false &&
        this.$v.birth.$invalid == false &&
        this.$v.tel.$invalid == false
      ) {
        this.checkadd = !this.checkadd;
        let body = {
          citizen: this.citizen,
          fname: this.name,
          lname: this.surname,
          gender: this.gender,
          position: this.position,
          salary: this.salary,
          password: this.password,
          email: this.email,
          address: this.address,
          dob: this.birth,
          phone: this.tel,
        };
        axios.post("http://localhost:3000/employees", body).then(() => {
          axios
            .get("http://localhost:3000/employees?search=" + this.search12)
            .then((response) => {
              for (let comment of response.data.blogs) {
                comment.check = false;
                comment.checkedit = false;
              }
              this.blog = response.data.blogs;
            });
        });
      }
    },
    DeleteEmp(emp) {
      let condel = confirm("Are you sure to delete " + emp.fname);
      if (condel == true) {
        axios
          .delete("http://localhost:3000/employees/" + emp.emp_id)
          .then(() => {
            axios
              .get("http://localhost:3000/employees?search=" + this.search12)
              .then((response) => {
                for (let comment of response.data.blogs) {
                  comment.check = false;
                  comment.checkedit = false;
                }
                this.blog = response.data.blogs;
              });
          });
      }
    },
    EditEmp(mod) {
      this.$v.name2.$touch();
      this.$v.surname2.$touch();
      this.$v.salary2.$touch();
      this.$v.position2.$touch();
      this.$v.email2.$touch();
      this.$v.address2.$touch();
      this.$v.tel2.$touch();
      if (
        this.$v.name2.$invalid == false &&
        this.$v.surname2.$invalid == false &&
        this.$v.position2.$invalid == false &&
        this.$v.salary2.$invalid == false &&
        this.$v.email2.$invalid == false &&
        this.$v.address2.$invalid == false &&
        this.$v.tel2.$invalid == false
      ) {
        let body = {
          degree: "555",
          fname: this.name2,
          lname: this.surname2,
          position: this.position2,
          salary: this.salary2,
          email: this.email2,
          address: this.address2,
          phone: this.tel2,
        };
        console.log(body);
        console.log(mod.id);
        axios
          .put("http://localhost:3000/employees/" + mod.emp_id, body)
          .then(() => {
            mod.checkedit = !mod.checkedit;
            axios.get("http://localhost:3000/employees").then((response) => {
              for (let comment of response.data.blogs) {
                comment.check = false;
                comment.checkedit = false;
              }
              this.blog = response.data.blogs;
            });
          });
      }
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
    EditFirstClick(emp) {
      emp.checkedit = !emp.checkedit;
      this.$v.name2.$model = emp.fname;
      this.$v.surname2.$model = emp.lname;
      this.$v.salary2.$model = emp.salary;
      this.$v.position2.$model = emp.position;
      this.$v.email2.$model = emp.email;
      this.$v.address2.$model = emp.address;
      this.$v.tel2.$model = emp.phone;
    },
  },
  mounted() {
    this.onAuthChange();
  },
  validations: {
    name: {
      required: required,
      maxLength: maxLength(150),
    },
    surname: {
      requied: required,
      maxLength: maxLength(150),
    },
    gender: {
      required: required,
    },
    birth: {
      required: required,
    },
    position: {
      required: required,
    },
    salary: {
      required: required,
      integer: integer,
    },
    email: {
      required: required,
      email: email,
    },
    address: {
      required: required,
    },
    tel: {
      required: required,
      maxLength: maxLength(10),
    },
    password: {
      required: required,
    },
    citizen: {
      required: required,
    },
    //
    name2: {
      required: required,
      maxLength: maxLength(150),
    },
    surname2: {
      requied: required,
      maxLength: maxLength(150),
    },
    gender2: {
      required: required,
    },
    position2: {
      required: required,
    },
    salary2: {
      required: required,
      integer: integer,
    },
    email2: {
      required: required,
      email: email,
    },
    address2: {
      required: required,
    },
    tel2: {
      required: required,
      maxLength: maxLength(10),
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
