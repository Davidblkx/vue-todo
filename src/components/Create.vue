<template>
  <div class="create-item">
    <input type="text" v-model="name" placeholder="What needs to be done?">
    <button v-if="active" @click="create">Create</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { todoManager } from '../models/items';

export default defineComponent({
  name: 'TodoList',
  data() {
    return {
      name: '',
    }
  },
  mounted() {
    this.name = '';
  },
  computed: {
    active(): boolean {
      return this.name?.length > 2 ?? false;
    }
  },
  methods: {
    create() {
      todoManager.create(this.name);
      this.name = '';
      this.$emit('create');
    },
  },
});
</script>