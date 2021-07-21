<template>
  <div class="container-fluid px-0">
    <img src="../assets/3.jpg" id="bg">
    <navbar />
    <div class="container">
      <br>
      <div class="box">
        <h1 class="title has-text-centered is-2">คลังสินค้า(Inventory)</h1>
        <!-- button -->
      <div class="columns">
        <div class="column">
          <div class="field has-addons">
            <div class="control">
              <a
                class="button is-primary"
                @click="newInven = !newInven"
                v-if="user.role === 'admin'"
              >
                + เพิ่มรายการสินค้าลงคลัง
              </a>
            </div>
            <div class="control is-expanded">
              <input
                class="input"
                type="text"
                placeholder="ค้นหาสินค้า"
                v-model="search"
              />
            </div>
            <div class="control">
              <a class="button is-info" @click="searchProduct()">
                ค้นหา
              </a>
            </div>
          </div>
        </div>
      </div>
      <!--End button -->
      </div>
      <div class="box">
        <!-- table products -->
      <table class="table is-hoverable">
        <!-- header -->
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>ชื่อรายการสินค้า</th>
            <th>ประเภท</th>
            <th>ยี่ห้อ</th>
            <th>จำนวน</th>
          </tr>
        </thead>
        <!-- End header -->
        <!-- table body -->
        <tbody v-for="(product, index) in catalog" v-bind:key="product.id">
          <tr>
            <td>
              <b
                ><a>{{ index + 1 }}</a></b
              >
            </td>
            <td>
              <a>{{ product.title }}</a>
            </td>
            <td>{{ product.type }}</td>
            <td v-if="product.brand != null">
              <a>{{ product.brand }}</a>
            </td>
            <td v-if="product.brand === null">ไม่สามารถระบุยี่ห้อได้</td>
            <td>{{ product.amount }}</td>
          </tr>
        </tbody>
        <!-- End tbody -->
      </table>
      <!-- End table -->
      </div>
      <!-- add modal -->
      <div class="modal" v-bind:class="{ 'is-active': newInven }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head has-text-centered">
            <p class="modal-card-title">เพิ่มสินค้า</p>
            <button
              class="delete"
              aria-label="close"
              @click="newInven = false"
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
                            v-model="$v.type.$model"
                            value="MACHINE"
                          />
                          เครื่องจักร
                        </label>
                        <label class="radio" style="margin-left: 0px;">
                          <input
                            type="radio"
                            name="member"
                            v-model="$v.type.$model"
                            value="SPARE_PART"
                          />
                          อะไหล่
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <template v-if="$v.type.$error == true">
                  <p class="help is-danger" v-if="!$v.type.required">
                    Please select product type
                  </p>
                </template>
              </div>
              <div class="column is-8">
                <label for="" class="label">
                  ชื่อสินค้า
                  <input type="text" class="input" v-model="title" />
                </label>
                <template v-if="$v.title.$error == true">
                  <p class="help is-danger" v-if="!$v.title.required">
                    Please enter product name
                  </p>
                </template>
              </div>
            </div>
            <!-- End first column -->

            <!-- second colum -->
            <div class="columns">
              <!-- Select method -->
              <div class="column is-8">
                <label for="" class="label">
                  ชื่อยี่ห้อสินค้า
                  <input type="text" class="input" v-model="brand" />
                </label>
                <template v-if="$v.brand.$error == true">
                  <p class="help is-danger" v-if="!$v.brand.required">
                    Please enter product brand
                  </p>
                </template>
              </div>
              <div class="column is-4">
                <label for="" class="label"
                  >วันที่ผลิต
                  <input type="date" v-model="mfd" />
                </label>
                <template v-if="$v.mfd.$error == true">
                  <p class="help is-danger" v-if="!$v.mfd.required">
                    Please select date
                  </p>
                </template>
              </div>
            </div>
            <!-- End second column -->
          </section>
          <!--End comtent Body -->
          <footer class="modal-card-foot columns">
            <div class="column is-6">
              <button
                class="button is-info is-fullwidth"
                @click="createInven()"
              >
                เพิ่ม
              </button>
            </div>
            <div class="column is-6">
              <button
                class="button is-fullwidth is-danger"
                @click="newInven = false"
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
import down from "../components/Footer.vue";
import navbar from "../components/Navbar.vue";
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      user: null,
      check: false,
      catalog: [],
      newInven: false,
      /* inven ins */
      type: "",
      title: "",
      brand: "",
      mfd: "",
      search: "",
    };
  },
  mounted() {
    this.getProduct(), this.onAuthChange();
  },
  methods: {
    getProduct() {
      axios
        .get("http://localhost:3000/products", {})
        .then((response) => {
          this.catalog = response.data;
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      /* reset */
      this.newInven = false;
      this.type = "";
      this.title = "";
      this.brand = "";
      this.mfd = "";
    },
    createInven() {
      /* set up data */
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        let productData = {
          type: this.type,
          mfd: this.mfd,
          brand: this.brand,
          title: this.title,
        };
        console.log(productData);

        axios
          .post("http://localhost:3000/products", productData)
          .then((response) => {
            console.log("response: ", response);
            console.log("Success");
            //update web
            this.getProduct();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    searchProduct() {
      axios
        .get("http://localhost:3000/products", {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          this.catalog = response.data;
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      axios.get("/user/me").then((res) => {
        this.user = res.data;
      });
    },
  },
  components: {
    navbar,
    down
  },
  validations: {
    title: {
      required: required,
    },
    mfd: {
      required: required,
    },
    brand: {
      required: required,
    },
    type: {
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
