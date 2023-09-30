export const apiUrl = document.location.href.startsWith('http://localhost')
  ? 'http://localhost:3001'
  : process.env.MONGO_API;
