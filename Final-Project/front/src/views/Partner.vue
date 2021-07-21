<template>
  <div class="container-fluid px-0">
    <img src="../assets/3.jpg" id="bg">
    <navbar />
    <div class="container">
      <div class="box">
          <h1 class="title" style="margin-top: 2%; display: inline">
        ค้นหาพาร์ทเนอร์ที่คุณต้องการ
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
                + เพิ่มพาร์ทเนอร์
              </a>
            </div>
            <div class="control is-expanded">
              <input
                class="input"
                type="text"
                placeholder="ค้นหาพาร์ทเนอร์"
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
          <u><h1 class="title has-text-centered">รายชื่อพาร์ทเนอร์</h1></u>
          <div class="columns is-multiline" style="padding-top: 5%">
        <div class="column is-3" v-for="par in blog" :key="par.id">
          <div class="card">
            <div class="card-image">
              <img
                src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
              />
            </div>
            <div class="card-content">
              <div class="content">
                <p class="title is-4">
                  {{ par.par_fname }} {{ par.par_lname }}
                </p>
                <p>- {{ par.company_name }}</p>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" v-on:click="par.check = !par.check"
                >Profile</a
              >
              <a
                class="card-footer-item"
                v-on:click="EditFirstClick(par)"
                v-if="user.role === 'admin'"
                >Edit</a
              >
              <a
                class="card-footer-item"
                v-on:click="DeletePar(par)"
                v-if="user.role === 'admin'"
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
            <p class="modal-card-title"><b>{{ mo.company_name }}</b></p>
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
                    <h4>Company : {{ mo.company_name }}</h4>
                    <p><strong>Name :</strong> {{ mo.par_fname }} {{ mo.par_lname }}</p>
                    <p><strong>Tel :</strong> {{ mo.phone1 }}</p>
                    <p><strong>Email :</strong> {{ mo.email1 }}</p>
                    <p>{{mo.description}}</p>
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
            <p class="modal-card-title">Partner</p>
            <button
              v-on:click="mod.checkedit = !mod.checkedit"
              class="delete"
              aria-label="close"
            ></button>
          </header>
          <section class="modal-card-body">
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
                <div class="column is-4">
                  <div class="field">
                    <label class="label">Type</label>
                  </div>
                  <div class="select">
                    <select v-model="$v.type2.$model">
                      <option>Customer</option>
                      <option>Supplier</option>
                    </select>
                    <p
                      class="help"
                      v-if="$v.type2.$error == true"
                      style="color: red"
                    >
                      Please Select Type
                    </p>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-12">
                  <div class="field">
                    <label class="label">Company Name</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.company_name2.$model"
                        placeholder="Stark Insdustry"
                      />
                      <p
                        class="help"
                        v-if="$v.company_name2.$error == true"
                        style="color: red"
                      >
                        Please Fill Company Name
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Email1</label>
                    <div class="control">
                      <input
                        class="input"
                        type="email"
                        v-model="$v.email12.$model"
                        placeholder="aaa@aaa.com"
                      />
                      <p
                        class="help"
                        v-if="$v.email12.$error == true"
                        style="color: red"
                      >
                        Please Fill Email
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Email2</label>
                    <div class="control">
                      <input
                        class="input"
                        type="email"
                        v-model="email22"
                        placeholder="aaa@aaa.com"
                      />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Legal Address</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.legal_address2.$model"
                        placeholder="Bangkok Mailbox 10200"
                      />
                      <p
                        class="help"
                        v-if="$v.legal_address2.$error == true"
                        style="color: red"
                      >
                        Please Fill Legal Address
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Delivery Address</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.delivery_address2.$model"
                        placeholder="Bangkok Mailbox 10200"
                      />
                      <p
                        class="help"
                        v-if="$v.delivery_address2.$error == true"
                        style="color: red"
                      >
                        Please Fill Delivery Address
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Tel1.</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.tel12.$model"
                        placeholder="0800000000"
                      />
                      <p
                        class="help"
                        v-if="$v.tel12.$error == true"
                        style="color: red"
                      >
                        Please Fill Phone Number
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Tel2.</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="tel22"
                        placeholder="0800000000"
                      />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="description2"
                        placeholder="Anything you want to know"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" v-on:click="EditPar(mod)">
              Save changes
            </button>
            <button class="button" v-on:click="mod.checkedit = !mod.checkedit">
              Cancel
            </button>
          </footer>
        </div>
      </div>
      <!--Modal For Add Partner-->
      <div class="modal" v-bind:class="{ 'is-active': checkadd }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">เพิ่มรายชื่อพาร์ทเนอร์</p>
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
                    <label class="label">Type</label>
                  </div>
                  <div class="select">
                    <select v-model="$v.type.$model">
                      <option>Customer</option>
                      <option>Supplier</option>
                    </select>
                    <p
                      class="help"
                      v-if="$v.type.$error == true"
                      style="color: red"
                    >
                      Please Select Type
                    </p>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-12">
                  <div class="field">
                    <label class="label">Company Name</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.company_name.$model"
                        placeholder="Stark Insdustry"
                      />
                      <p
                        class="help"
                        v-if="$v.company_name.$error == true"
                        style="color: red"
                      >
                        Please Fill Company Name
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Email1</label>
                    <div class="control">
                      <input
                        class="input"
                        type="email"
                        v-model="$v.email1.$model"
                        placeholder="aaa@aaa.com"
                      />
                      <p
                        class="help"
                        v-if="$v.email1.$error == true"
                        style="color: red"
                      >
                        Please Fill Email
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Email2</label>
                    <div class="control">
                      <input
                        class="input"
                        type="email"
                        v-model="email2"
                        placeholder="aaa@aaa.com"
                      />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Legal Address</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.legal_address.$model"
                        placeholder="Bangkok Mailbox 10200"
                      />
                      <p
                        class="help"
                        v-if="$v.legal_address.$error == true"
                        style="color: red"
                      >
                        Please Fill Legal Address
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Delivery Address</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.delivery_address.$model"
                        placeholder="Bangkok Mailbox 10200"
                      />
                      <p
                        class="help"
                        v-if="$v.delivery_address.$error == true"
                        style="color: red"
                      >
                        Please Fill Delivery Address
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Tel1.</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="$v.tel1.$model"
                        placeholder="0800000000"
                      />
                      <p
                        class="help"
                        v-if="$v.tel1.$error == true"
                        style="color: red"
                      >
                        Please Fill Phone Number
                      </p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Tel2.</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="tel2"
                        placeholder="0800000000"
                      />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        v-model="description"
                        placeholder="Anything you want to know"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" v-on:click="AddPar()">
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
import down from "../components/Footer.vue";
import navbar from "../components/Navbar.vue";
import axios from "@/plugins/axios";
import { required, email, maxLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      user: null,
      check: false,
      checkadd: false,
      blog: {},
      search12: "",
      name: "",
      surname: "",
      type: "",
      company_name: "",
      email1: "",
      legal_address: "",
      delivery_address: "",
      tel1: "",
      tel2: "",
      email2: "",
      description: "",
      //
      name2: "",
      surname2: "",
      type2: "",
      company_name2: "",
      email12: "",
      legal_address2: "",
      delivery_address2: "",
      tel12: "",
      tel22: "",
      email22: "",
      description2: "",
    };
  },
  components: {
    navbar,
    down
  },
  created() {
    axios.get("http://localhost:3000/partner").then((response) => {
      for (let i of response.data.blogs) {
        i.check = false;
        i.checkedit = false;
      }
      this.blog = response.data.blogs;
      console.log(this.blog);
    });
  },
  methods: {
    search() {
      if (this.search12 != " ") {
        axios
          .get("http://localhost:3000/partner?search=" + this.search12)
          .then((response) => {
            for (let comment of response.data.blogs) {
              comment.check = false;
              comment.checkedit = false;
            }
            this.blog = response.data.blogs;
          });
      }
    },
    AddPar() {
      this.$v.name.$touch();
      this.$v.surname.$touch();
      this.$v.type.$touch();
      this.$v.company_name.$touch();
      this.$v.legal_address.$touch();
      this.$v.delivery_address.$touch();
      this.$v.email1.$touch();
      this.$v.tel1.$touch();
      if (
        this.$v.name.$invalid == false &&
        this.$v.surname.$invalid == false &&
        this.$v.type.$invalid == false &&
        this.$v.company_name.$invalid == false &&
        this.$v.legal_address.$invalid == false &&
        this.$v.delivery_address.$invalid == false &&
        this.$v.email1.$invalid == false &&
        this.$v.tel1.$invalid == false
      ) {
        let body = {
          description: this.description,
          par_fname: this.name,
          par_lname: this.surname,
          type: this.type,
          company_name: this.company_name,
          email2: this.email2,
          email1: this.email1,
          legal_address: this.legal_address,
          phone1: this.tel1,
          phone2: this.tel2,
          delivery_address: this.delivery_address,
        };
        this.checkadd = !this.checkadd;
        axios.post("http://localhost:3000/partner", body).then(() => {
          axios.get("http://localhost:3000/partner").then((response) => {
            for (let comment of response.data.blogs) {
              comment.check = false;
              comment.checkedit = false;
            }
            this.blog = response.data.blogs;
          });
        });
      }
    },
    DeletePar(par) {
      let condel = confirm("Are you sure to delete " + par.par_fname);
      if (condel == true) {
        axios.delete("http://localhost:3000/partner/" + par.par_id).then(() => {
          axios.get("http://localhost:3000/partner").then((response) => {
            for (let comment of response.data.blogs) {
              comment.check = false;
              comment.checkedit = false;
            }
            this.blog = response.data.blogs;
          });
          /*alert("Delete Finish!");
          this.blog.splice(par.par_id,1);*/
        });
      }
    },
    EditPar(mod) {
      this.$v.name2.$touch();
      this.$v.surname2.$touch();
      this.$v.type2.$touch();
      this.$v.company_name2.$touch();
      this.$v.email12.$touch();
      this.$v.legal_address2.$touch();
      this.$v.delivery_address2.$touch();
      this.$v.tel12.$touch();
      if (
        this.$v.name2.$invalid == false &&
        this.$v.surname2.$invalid == false &&
        this.$v.type2.$invalid == false &&
        this.$v.company_name2.$invalid == false &&
        this.$v.email12.$invalid == false &&
        this.$v.legal_address2.$invalid == false &&
        this.$v.delivery_address2.$invalid == false &&
        this.$v.tel12.$invalid == false
      ) {
        mod.checkedit = !mod.checkedit;
        let body = {
          description: this.description2,
          par_fname: this.name2,
          par_lname: this.surname2,
          type: this.type2,
          company_name: this.company_name2,
          email2: this.email22,
          email1: this.email12,
          legal_address: this.legal_address2,
          phone1: this.tel12,
          phone2: this.tel22,
          delivery_address: this.delivery_address2,
        };
        axios
          .put("http://localhost:3000/partner/" + mod.par_id, body)
          .then(() => {
            axios.get("http://localhost:3000/partner").then((response) => {
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
    EditFirstClick(par) {
      par.checkedit = !par.checkedit;
      this.$v.name2.$model = par.par_fname;
      this.$v.surname2.$model = par.par_lname;
      this.$v.type2.$model = par.type;
      this.$v.company_name2.$model = par.company_name;
      this.$v.email12.$model = par.email1;
      this.$v.legal_address2.$model = par.legal_address;
      this.$v.delivery_address2.$model = par.delivery_address;
      this.$v.tel12.$model = par.phone1;
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
    type: {
      required: required,
    },
    company_name: {
      required: required,
    },
    email1: {
      required: required,
      email: email,
    },
    legal_address: {
      required: required,
    },
    delivery_address: {
      required: required,
    },
    tel1: {
      required: required,
      maxLength: maxLength(10),
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
    type2: {
      required: required,
    },
    company_name2: {
      required: required,
    },
    email12: {
      required: required,
      email: email,
    },
    legal_address2: {
      required: required,
    },
    delivery_address2: {
      required: required,
    },
    tel12: {
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
