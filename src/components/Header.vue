<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
      title: {
          required: true,
          type: String
      },
      msg: {
          required: true,
          type: String
      }
  },
})
</script>

<template>
  <div class="header">
    <h1 class="green">{{ title }}</h1>
    <h3>
      {{ msg }}
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.header h1,
.header h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .header h1,
  .header h3 {
    text-align: left;
  }
}
</style>
