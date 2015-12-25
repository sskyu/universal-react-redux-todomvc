const mockdata = [
  {
    id: 0,
    completed: true,
    text: 'Use Redux'
  },
  {
    id: 1,
    completed: false,
    text: 'hoge'
  },
];

export function fetchTodos(callback) {
  setTimeout(() => {
    callback(mockdata);
  }, 500);
}
