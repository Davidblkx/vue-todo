<template>
  <div class="item">
    <router-link to="/">Back</router-link>
    <div>
      <label> Title: </label>
      <input v-model="title" />
    </div>
    <div>
      <label> Description: </label>
      <textarea v-model="desc" />
    </div>
    <button v-if="valid" @click="save">Save</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { todoManager } from '../models/items';

export default defineComponent({
  name: 'Item',
  data() {
    return {
      title: '',
      desc: '',
    }
  },
  mounted() {
    const id = this.$route.params.id;
    if (typeof id !== 'string') return;

    const item = todoManager.find(id);
    if (!item) return;

    this.title = item.title;
    this.desc = item.description ?? '';
  },
  computed: {
    valid(): boolean {
      return this.title?.length > 2 ?? false;
    }
  },
  methods: {
    save() {
      const id = this.$route.params.id;
      if (typeof id !== 'string') return;
      todoManager.update(id, this.title, this.desc);
      this.$router.push('/');
    },
  },
})
</script>