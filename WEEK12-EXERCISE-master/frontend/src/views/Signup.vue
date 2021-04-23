<template>
    <div class="container is-fluid mt-5">
  <div class="columns is-centered">
    <div class="column is-8">
      <h1 class="title">Welcome</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo quae
        rem ipsum praesentium, tenetur doloremque libero. Fugit, dolore
        possimus molestias cupiditate iste deserunt! Aut aliquid rem quas
        consequatur non iste.
      </p>
    </div>
    <div class="column is-4">
      <h1 class="title">Sign Up</h1>
      <!-- Sign up form -->
      <div class="field">
        <label class="label">Username</label>
        <div class="control has-icons-left">
          <input class="input" type="text" />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <p class="help is-danger">error</p>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="password" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
        <p class="help is-danger">error</p>
      </div>

      <div class="field">
        <label class="label">Confirm Password</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="password" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
        <p class="help is-danger">error</p>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input v-model="$v.email.$model" :class="{'is-danger': $v.email.$error}" class="input" type="text"/>
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
        <template v-if="$v.email.$error">
            <p class="help is-danger" v-if="!$v.email.required">This field is required</p>
             <p class="help is-danger" v-if="!$v.email.email">Invalid Email</p>
        </template>
      </div>

      <div class="field">
        <label class="label">Mobile Number</label>
        <div class="control has-icons-left has-icons-right">
          <input v-model="$v.mobile.$model" :class="{'is-danger': $v.mobile.$error}" class="input" type="text" />
          <span class="icon is-small is-left">
            <i class="fas fa-mobile"></i>
          </span>
        </div>
        <template v-if="$v.mobile.$error">
             <p class="help is-danger" v-if="!$v.mobile.required">This field is required</p>
             <p class="help is-danger" v-if="!$v.mobile.mobile">Invalid Mobile Number</p>
        </template>
      </div>

      <div class="field">
        <label class="label">First Name</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" />
        </div>
        <p class="help is-danger">error</p>
      </div>

      <div class="field">
        <label class="label">Last Name</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" />
        </div>
        <p class="help is-danger">error</p>
      </div>

      <button class="button is-primary is-fullwidth" @click='submit'>Sign Up</button>

      <p class="my-3">
        Already have an account? <a href="#">Login</a>
      </p>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

function mobile (value) {
    return !!value.match(/0[0-9]{9}/)
}
function complexPassword (value) {
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        return false
    }
    return true
}


export default {
    data(){
        return {
            username: '',
            password: '',
            confirm_password: '',
            email: '',
            mobile: '',
            first_name: '',
            last_name: ''
        }
    },
    validations:{
        email:{
            required: required,
            email: email
        },
        mobile:{
            required: required,
            mobile: mobile
        },
        password:{
            required: required,
            minLength: minLength(8),
            complex: complexPassword
        },
        confirm_password:{
            required: required,
            sameAs: sameAs('password')
        },
        username:{
            required: required,
            minLength: minLength(5),
        }
    },
    methods:{
        submit(){
            this.$v.$touch();
            if (!this.$v.$invalid) {
                let data = {
                    username: this.username,
                    password: this.password,
                    confirm_password: this.confirm_password,
                    email: this.email,
                    mobile: this.mobile,
                    first_name: this.first_name,
                    last_name: this.last_name,
                }
                axios.post("http://localhost:3000/user/signup", data)
                .then((res) => {
                    alert("Sign up Success");
                })
                .catch((err) => {
                    alert(err.response.data.details.message)
                })
            }
        }
    }
}
</script>

<style>

</style>