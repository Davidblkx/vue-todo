declare const crypto: Crypto & { randomUUID(): string };

export interface TodoItem {
  id: string;
  title: string;
  done: boolean;
  description: string;
  createdAt: Date;
}

/** Manage todo items */
export class TodoManager {
  private readonly _items: TodoItem[] = [];
  private readonly _onChange: ((item?: TodoItem) => void)[] = [];

  public get items(): TodoItem[] {
    return this._items.map(item => ({ ...item }));
  }

  public load(items: TodoItem[]): void {
    this._items.splice(0, this._items.length, ...items);
    this.notify();
  }

  public create(title: string, desc?: string): TodoItem {
    const newItem: TodoItem = {
      id: crypto.randomUUID(),
      done: false,
      createdAt: new Date(),
      title,
      description: desc ?? '',
    };
    this._items.push(newItem);
    this.notify(newItem);
    return newItem;
  }

  public find(id: string): TodoItem | undefined {
    return this._items.find(item => item.id === id);
  }

  public remove(id: string): void {
    this._items.splice(this._items.findIndex(item => item.id === id), 1);
    this.notify();
  }

  public toggle(id: string): void {
    const item = this._items.find(item => item.id === id);
    if (item) {
      item.done = !item.done;
      this.notify(item);
    }
  }

  public update(id: string, title: string, desc?: string): void {
    const item = this._items.find(item => item.id === id);
    if (item) {
      item.title = title;
      item.description = desc ?? '';
      this.notify(item);
    }
  }

  public onChange(cb: (item?: TodoItem) => void): void {
    this._onChange.push(cb);
  }

  private notify(item?: TodoItem): void {
    this._onChange.forEach(cb => cb(item));
  }

}

export const todoManager = new TodoManager();