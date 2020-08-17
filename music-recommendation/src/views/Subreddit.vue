<template>
  <section>
    <section class="formButton">
      <b-button @click="showForm = !showForm" type="button is-success" expanded outlined>
        Add Post
      </b-button>
    </section>
    <form v-if="showForm" @submit.prevent="onCreatePost(post)" class="submit">
      <b-field label="Title">
        <b-input v-model="post.title" required></b-input>
      </b-field>
      <b-field label="Link">
        <b-input v-model="post.URL" type="url" required></b-input>
      </b-field>
            <b-field label="Description">
        <b-input type="textarea" v-model="post.description"></b-input>
      </b-field>
      <button class="button is-success">Submit</button>
    </form>
    <article class="media" v-for="post in posts" :key="post.id">
      <figure class="media-left">
        <p>
          <!-- <img src="https://bulma.io/images/placeholders/128x128.png"> -->
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{post.title}} </strong>
            <small> posted by {{post.user_id}} </small>
            <small>{{post.created_at}}</small>
            <br>
            <a :href="post.URL" target="_blank">{{post.URL}}</a>
            <br>
            {{post.description}}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-reply"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-retweet"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-heart"></i></span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </section>
</template>

<style lang="scss">
.formButton {
  padding-bottom: 2em;
}
.submit {
  padding: 0em 4em 2em 4em;
}
</style>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    showForm: false,
    post: {
      title: '',
      URL: '',
      description: '',
    },
  }),
  mounted() {
    this.initSubreddit(this.$route.params.name);
  },
  watch: {
    /* eslint-disable */
    '$route.params.name'() {
      this.initSubreddit(this.$route.params.name);
    },
    /* eslint-enable */
    subreddit() {
      if (this.subreddit.id) {
        this.initPosts(this.subreddit.id);
      }
    },
  },
  computed: {
    ...mapState('subreddit', ['posts']),
    ...mapGetters('subreddit', ['subreddit']),
  },
  methods: {
    ...mapActions('subreddit', ['createPost', 'initSubreddit', 'initPosts']),
    async onCreatePost() {
      if (this.post.title && this.post.URL) {
        this.createPost(this.post);
        this.post = {
          title: '',
          URL: '',
          description: '',
        };
        this.showForm = false;
      }
    },
  },
};
</script>
