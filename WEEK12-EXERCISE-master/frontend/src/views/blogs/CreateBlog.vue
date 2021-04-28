<template>
  <div class="container is-widescreen">
    <section class="section" v-if="error">
      <div class="container is-widescreen">
        <div class="notification is-danger">
          <!-- <%= error.code + ': ' + error.sqlMessage %> -->
          <!---->
          {{ error }}
        </div>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <p class="title">Create new Blog</p>
      </div>
    </section>
    <section class="px-6">
      <input
        class="mb-5"
        multiple
        type="file"
        accept="image/png, image/jpeg, image/webp"
        @change="selectImages"
      />

      <div v-if="images" class="columns is-multiline">
        <div v-for="(image, index) in images" :key="image.id" class="column is-one-quarter">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="showSelectImage(image)" alt="Placeholder image" />
              </figure>
            </div>
            <footer class="card-footer">
              <a @click="deleteSelectImage(index)" class="card-footer-item has-text-danger">Delete</a>
            </footer>
          </div>
        </div>
      </div>

      <div class="field mt-5">
        <label class="label">Title</label>
        <div class="control">
          <input v-model="$v.titleBlog.$model" :class="{'is-danger': $v.titleBlog.$error}" class="input" type="text" placeholder="Text input" />
          <template v-if="$v.titleBlog.$error">
             <p class="help is-danger" v-if="!$v.titleBlog.required">This field is required</p>
             <p class="help is-danger" v-if="!$v.titleBlog.minLength">to short (min is 10)</p>
             <p class="help is-danger" v-if="!$v.titleBlog.maxLength">to long (max is 25)</p>
             <p class="help is-danger" v-if="!$v.titleBlog.alpha">alphabet only</p>
        </template>
        </div>
      </div>

      <div class="field">
        <label class="label">Content</label>
        <div class="control">
          <textarea v-model="$v.contentBlog.$model" :class="{'is-danger': $v.contentBlog.$error}" class="textarea" placeholder="Textarea"></textarea>
            <template v-if="$v.contentBlog.$error">
             <p class="help is-danger" v-if="!$v.contentBlog.required">This field is required</p>
             <p class="help is-danger" v-if="!$v.contentBlog.minLength">to short (min is 50)</p>
            </template>
        </div>
      </div>

      <div class="field mt-5">
        <label class="label">ref</label>
        <div class="control">
          <input :class="{'is-danger': $v.ref.$error}" class="input" type="text" placeholder="Text input" />
            <template v-if="$v.ref.$error">
             <p class="help is-danger" v-if="!$v.ref.url">wrong url format</p>
            </template>
        </div>
      </div>

      <div class="control mb-3">
        <label class="radio">
          <input v-model="$v.audience.$model" type="radio" name="answer" value="status_private" />
          Private
        </label>
        <label class="radio">
          <input v-model="$v.audience.$model" type="radio" name="answer" value="status_public" />
          Public
        </label>
        <template v-if="$v.audience.$error">
             <p class="help is-danger" v-if="!$v.audience.required">pls select one!</p>
        </template>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input v-model="pinnedBlog" type="checkbox" />
            Pinned
          </label>
        </div>
      </div><hr>
    
        <!-- <div class="columns">
            <div class="column is-6">
                <div class="field mt-5">
                    <label class="label">วันที่โพสต์</label>
                    <div class="control">
                        <input v-model="create_date" :class="{'is-danger': $v.create_date.$error}" class="input" type="date" />
                        <template v-if="$v.create_date.$error">
                            <p class="help is-danger" v-if="!$v.create_date.maxValue">start date must be less than end date</p>
                        </template>
                        <template v-if="$v.end_date.$error">
                            <p class="help is-danger" v-if="$v.end_date.requiredIf">require start date</p>
                        </template>
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <div class="field mt-5">
                    <label class="label">วันสิ้นสุด</label>
                    <div class="control">
                        <input v-model="end_date" :class="{'is-danger': $v.end_date.$error}" class="input" type="date" />
                        <template v-if="$v.end_date.$error">
                            <p class="help is-danger" v-if="!$v.end_date.minValue">end date must more than start date</p>
                        </template>
                        <template v-if="$v.create_date.$error">
                            <p class="help is-danger" v-if="$v.create_date.requiredIf">require end date</p>
                        </template>
                    </div>
                </div>
            </div>
        </div> -->

      <div class="field is-grouped">
        <div class="control">
          <button @click="submitBlog" class="button is-link">Submit</button>
        </div>
        <div class="control">
          <button @click="$router.go(-1)" class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { required, alpha, minLength, maxLength, sameAs, url, maxValue, minValue, requiredIf} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      blog: {},
      error: null,
      images: [], // array of image
      titleBlog: "",
      contentBlog: "",
      pinnedBlog: false,
      audience: "",
      ref:'',
      create_date:'',
      end_date:'',
    };
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
    submitBlog() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
            let body = {
                title: this.title,
                content: this.content,
                pin: this.pinnedBlog,
                ref: this.ref,
                create_date: this.create_date,
                end_date: this.end_date,
                audience: this.statusBlog
            }
      axios
        .post("http://localhost:3000/blogs/create", body)
        .then((res) => {
            this.$router.push({name: 'home'})
            console.log(res)
        })
        .catch((e) => console.log(e.response.data));
      }
    }
  },
  validations(){
      return{
            titleBlog:{
                required: required,
                alpha: alpha,
                minLength: minLength(10),
                maxLength: maxLength(25)
            },
            contentBlog:{
                required: required,
                minLength: minLength(50)
            },
            audience:{
                required: required,
                sameAs: sameAs('status_private', 'status_public')
            },
            ref:{
                url: url
            },
            // create_date:{
            //     required: requiredIf(() => {return this.end_date !== ''}),
            //     maxValue: maxValue(() => {return this.create_date > this.end_date})
            // },
            // end_date:{
            //     required: requiredIf(() => {return this.create_date !== ''}),
            //     minValue: minValue(() => {return this.create_date < this.end_date})
            // }
      }
  }
}
</script>

<style>
</style>