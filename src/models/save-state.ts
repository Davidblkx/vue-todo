import { todoManager } from './items';

const KEY = 'todo-manager';

todoManager.onChange(() => {
  localStorage.setItem(KEY, JSON.stringify(todoManager.items));
});

const currentValue = localStorage.getItem(KEY);
if (currentValue) {
  try {
    todoManager.load(JSON.parse(currentValue));
  } catch {
    // ignore
  }
}