<template>
  <div id="app">
    <nav class="navbar is-success" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/#/">
        Music Recommendation
        </a>
      </div>
      <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control" v-if="!isLoggedIn">
                <b-button type="is-success" @click="login()" inverted>Login with Google</b-button>
              </p>
              <p class="control logged-in" v-if="isLoggedIn">
                <section class="avatar">
                  <figure>
                    <img :src="user.image">
                  </figure>
                  <figcaption>{{user.name}}</figcaption>
                </section>
                <b-button type="is-success" @click="logout()">Logout</b-button>
              </p>
            </div>
          </div>
        </div>
    </nav>
    <router-view class="main container"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: mapState('auth', ['user', 'isLoggedIn']),
  methods: mapActions('auth', ['login', 'logout']),
};
</script>

<style lang="scss">
.main {
  margin-top: 2em;
}

.logged-in {
  display: flex;
  flex-direction: row;
}

.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
