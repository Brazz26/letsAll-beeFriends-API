const names = [
    'Bryan',
    'Bruhman',
    'Keller',
    'Mitchell',
    'Somebody',
    'Yelants',
    'Angelica',
    'Shrek',
    'Mei',
    'Mulan',
    'Gina',
    'Catdog'
];

const thoughtComments = [
    'That was so cool',
    'You rock',
    'I wish I could be there',
    'Do better',
    'You got this',
    'Whats better than this?!',
    'Im so tired',
    'Do you know the Muffin-Man?',
    'Does anyone know how to do math?',
    'Im better',
    'Make peace not war'
];

const possibleReactions = [
    {
        LIKE: '😃',
        LOVE: '😍',
        WOW: '😲',
        LOL: '😂',
    }
];

const thoughts = getRandomThoughts(5);

await User.collection.insertMany(users);
await Thought.collection.insertMany(thoughts);

  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];

    users.push({
      first,
      last,
      age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
    });
};

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;
  
  const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            published: Math.random() < 0.5,
            description: getRandomArrItem(thoughtComments),
            buildSuccess: Math.random() < 0.5,
            reactions: [...getPossibleReactions(3)],
        });
    }
    return results;
  };

  const getPossibleReactions = (int) => {
    if (int === 1) {
      return getRandomArrItem(possibleReactions);
    }
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
        tagBody: getRandomArrItem(possibleReactions),
        username: getRandomName(),
    });
}
return results;
};


module.exports = { getRandomName, getRandomThoughts};
