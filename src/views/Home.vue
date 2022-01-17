<template>
  <div class="home">
    <button @click="toggleCreate" >Create</button>
    <create v-if="showCreate" @create="create" />
    <todo-list></todo-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoList from '@/components/TodoList.vue'; // @ is an alias to /src
import Create from '@/components/Create.vue';

export default defineComponent({
  name: 'Home',
  components: {
    TodoList,
    Create,
  },
  data() {
    return {
      showCreate: false,
    }
  },
  methods: {
    create() {
      this.showCreate = false;
    },
    toggleCreate() {
      this.showCreate = !this.showCreate;
    },
  },
});
</script>
