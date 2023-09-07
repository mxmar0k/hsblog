const { Post } = require('../models');

const postData = [
  {
    title: 'Favorite Hearthstone Deck',
    content: 'My favorite deck in Hearthstone is Control Priest!',
    user_id: 1, 
  },
  {
    title: 'New Expansion Hype!',
    content: 'The latest Hearthstone expansion is amazing!',
    user_id: 2, 
  },
  {
    title: 'Hearthstone Strategies',
    content: 'Let\'s discuss different Hearthstone strategies in this post.',
    user_id: 3, 
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
