const mockdata = [
  {
    id: 1,
    completed: false,
    text: 'Use Redux'
  },
  {
    id: 2,
    completed: true,
    text: 'hoge'
  }
];

/**
 * fetch todos
 * @return {Promise}
 */
export function fetchTodos() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockdata), 500);
  });
}
