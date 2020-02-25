<template>
  <div>
    <p>{{ this.restaurant.name }}</p>
    <p>{{ this.restaurant.address }}</p>
    <p>{{ this.restaurant.category }}</p>
    <p>{{ this.restaurant.phone }}</p>
  </div>
</template>
<script>
export default {
  name: "Detail",
  props: {
    restaurant: Object
  }
};
</script>
