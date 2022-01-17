<template>
  <ul class="item-list">
    <li v-for="item in items" :key="item.id">
      <span class="item-state" @click="toggle(item)" >{{ item.done ? '✅': '🟦' }}</span>
      <span class="item-name" @click="nav(item)">
        {{ item.title }}
      </span>
      <button class="item-delete" @click="remove(item)">
        Delete
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TodoItem, todoManager } from '../models/items';

export default defineComponent({
  name: 'TodoList',
  data() {
    return {
      items: [] as TodoItem[],
    }
  },
  mounted() {
    this.refresh();
    todoManager.onChange(() => this.refresh());
  },
  methods: {
    toggle(item: TodoItem) {
      todoManager.toggle(item.id);
    },
    remove(item: TodoItem) {
      todoManager.remove(item.id);
    },
    nav(item: TodoItem) {
      this.$router.push({
        name: 'Item',
        params: { id: item.id },
      });
    },
    refresh() {
      this.items = todoManager.items.sort((a, b) => {
        const aValue = a.done ? 1 : 0;
        const bValue = b.done ? 1 : 0;
        return aValue - bValue;
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.item-name {
  cursor: pointer;
  user-select: none;
  padding: 0 5px;
  font-weight: bold;
}

.item-state {
  cursor: pointer;
  user-select: none;
  &:hover {
    font-size: 1.1rem;
  }
}
</style>