<template>
  <div>
    <ul class="tag-list">
      <li
        class="tag-default tag-pill tag-outline"
        v-for="(restaurant, index) of restaurants"
        :key="index"
        v-on:click="detail(restaurant)"
      >
        <span v-text="restaurant.name" />
      </li>
    </ul>

    <div v-if="this.mostrarLista">
      <Detail :restaurant="this.restaurant"></Detail>
    </div>
  </div>
</template>
<script>
import Detail from "@/components/Detail";

export default {
  props: {
    restaurants: Array,
    mostrarLista: false,
    restaurant: Object
  },
  components: {
    Detail
  },
  methods: {
    detail: function(restaurant) {
      this.mostrarLista = true;
      this.restaurant = restaurant;
    }
  }
};
</script>
