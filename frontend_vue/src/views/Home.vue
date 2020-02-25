<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <Restaurants :restaurants="restaurants" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Restaurants from "@/components/Restaurants";
import { RESTAURANTS } from "@/store/actions.type";

export default {
  name: "home",
  components: {
    Restaurants
  },
  mounted() {
    this.$store.dispatch(RESTAURANTS);
  },
  computed: {
    ...mapGetters(["isAuthenticated", "restaurants"]),
    restaurant() {
      return this.$route.params.restaurant;
    }
  }
};
</script>
