const connection = require('../config/connection');
const { User, Thoughts } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('You are now connected');
  let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();

  if (thoughtsCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db.listCollections({
    name: 'users'
  }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  const users = [];
  const thoughts = getRandomThoughts(5);

  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];

    users.push({
      first,
      last,
      age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
    });
  }

  await User.collection.insertMany(users);
  await Thoughts.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info('Database Now Seeded! 🌱');
  process.exit(0);
});