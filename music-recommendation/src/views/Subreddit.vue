<template>
  <section>
    <section class='formButton'>
      <b-button
        v-if='isLoggedIn'
        @click='showForm = !showForm'
        type='button is-success'
        expanded
        outlined
      >Add Post</b-button>
    </section>
    <form v-if='showForm && isLoggedIn' @submit.prevent='onCreatePost(post)' class='submit'>
      <b-field label='Title (required)'>
        <b-input v-model='post.title' required></b-input>
      </b-field>
      <b-field label='Link (required)'>
        <b-input v-model='post.URL' type='url' required></b-input>
      </b-field>
      <b-field label='Description'>
        <b-input type='textarea' v-model='post.description'></b-input>
      </b-field>
      <button class='button is-success'>Submit</button>
    </form>
    <form class="formButton">
        <b-field label="Search">
            <b-input v-model="searchTerm"></b-input>
        </b-field>
    </form>
    <article class='media' v-for='(post, index) in filteredPosts' :key='post.id'>
      <figure class='media-left'>
        <p class="image is-64x64">
          <img :src="loadedUsersById[post.user_id].image">
        </p>
      </figure>
      <div class='media-content'>
        <div class='content'>
          <p>
            <strong>{{post.title}}</strong>
            <small>
               posted by {{loadedUsersById[post.user_id].name}}
            </small>
            <small>{{getCreated(index)}}</small>
            <br />
            <a :href='post.URL' target='_blank'>{{post.URL}}</a>
            <br />
            {{post.description}}
          </p>
        </div>
        <nav class='level is-mobile'>
          <div class='level-left'>
            <a class='level-item'>
              <span class='icon is-small'>
                <i class='fas fa-reply'></i>
              </span>
            </a>
            <a class='level-item'>
              <span class='icon is-small'>
                <i class='fas fa-retweet'></i>
              </span>
            </a>
            <a class='level-item'>
              <span class='icon is-small'>
                <i class='fas fa-heart'></i>
              </span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </section>
</template>

<style lang='scss'>
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
    searchTerm: '',
    post: {
      title: '',
      description: '',
      URL: '',
    },
  }),
  mounted() {
    this.initUsers();
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
    ...mapState('auth', ['isLoggedIn', 'user']),
    ...mapGetters({
      subreddit: 'subreddit/subreddit',
      usersById: 'users/usersById',
    }),
    loadedUsersById() {
      return this.posts.reduce((byId, post) => {
        /* eslint-disable */
        byId[post.user_id] = this.usersById[post.user_id] || {
        /* eslint-enable */
          name: 'Unknown',
          image: 'https://bulma.io/images/placeholders/64x64.png',
        };
        return byId;
      }, {});
    },
    /* eslint-disable */
    filteredPosts() {
      if (this.searchTerm) {
        const regexp = new RegExp(this.searchTerm, 'gi');
        return this.posts.filter(post =>
          (post.title + post.description + this.usersById[post.user_id].name).match(regexp));
      }
      return this.posts;
    },
    /* eslint-enable */
  },
  methods: {
    ...mapActions('subreddit', ['createPost', 'initSubreddit', 'initPosts']),
    ...mapActions('users', { initUsers: 'init' }),
    async onCreatePost() {
      if (this.post.title && (this.post.description || this.post.URL)) {
        this.createPost(this.post);
        this.post = {
          title: '',
          description: '',
          URL: '',
        };
        this.showForm = false;
      }
    },
    getCreated(index) {
      function timeSince(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
          return ` ${interval} years`;
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return ` ${interval} months`;
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return ` ${interval} days`;
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return ` ${interval} hours`;
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return ` ${interval} minutes`;
        }
        return ` ${Math.floor(seconds)} seconds`;
      }
      return timeSince(this.posts[index].created_at.seconds * 1000) <= 0
        ? ' 0 seconds ago'
        : ` ${timeSince(this.posts[index].created_at.seconds * 1000)} ago`;
    },
  },
};
</script>
