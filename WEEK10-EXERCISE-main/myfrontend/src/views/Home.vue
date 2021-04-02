<template>
  <div class="container is-widescreen">
    <section class="hero">
      <div class="hero-body">
        <p class="title">My Stories</p>
      </div>
    </section>
    <section class="section" id="app">
      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-3" v-for="blog in blogs" :key="blog.id">
            <div class="card">
              <div class="card-image pt-5">
                <figure class="image">
                  <img
                    style="height: 120px"
                    :src="'http://localhost:3000/' + blog.file_path"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="title">{{ blog.title }}</div>
                <div class="content">{{ blog.content }}</div>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item">Read more...</a>
                <a class="card-footer-item">
                  <span class="icon-text">
                    <span class="icon">
                      <i class="far fa-heart"></i>
                    </span>
                    <span v-on:click="addLike(blog.id)">Like {{blog.like}}</span>
                  </span>
                </a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      blogs: null, // add blogs variable
      like: ''
    };
  },
  created() {
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        this.blogs = response.data;
        console.log(this.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods:{
      addLike(id){
          axios
            .put("http://localhost:3000/blogs/addlike/"+ id)
            .then((response) => {
                this.like = response.data.like
                this.blogs[id-1].like = response.data.like
                console.log(this.like)
            })
            .catch((err) => {
                console.log(err);
            });
      }
  }
};
</script>

<style scoped>
</style>