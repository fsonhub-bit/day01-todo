const LIST_KEY = 'day01_todos';
const listEl = document.getElementById('todo-list');
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');

let todos = load();
render();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: crypto.randomUUID(), text, done: false });
  input.value = '';
  save();
  render();
});

function toggle(id) {
  todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
  save();
  render();
}
function removeItem(id) {
  todos = todos.filter(t => t.id !== id);
  save();
  render();
}
function render() {
  listEl.innerHTML = '';
  for (const t of todos) {
    const li = document.createElement('li');
    const left = document.createElement('button');
    left.textContent = t.done ? '☑' : '☐';
    left.className = 'small';
    left.onclick = () => toggle(t.id);

    const span = document.createElement('span');
    span.textContent = t.text;

    const del = document.createElement('button');
    del.textContent = '削除';
    del.className = 'small';
    del.onclick = () => removeItem(t.id);

    li.className = t.done ? 'done' : '';
    li.append(left, span, del);
    listEl.append(li);
  }
}
function save() { localStorage.setItem(LIST_KEY, JSON.stringify(todos)); }
function load() { return JSON.parse(localStorage.getItem(LIST_KEY) || '[]'); }