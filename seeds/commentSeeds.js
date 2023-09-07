const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'I also love Control Priest!',
    user_id: 2, 
    post_id: 1,
  },
  {
    comment_text: 'The artwork in Hearthstone is top-notch!',
    user_id: 1, 
    post_id: 2, 
  },
  {
    comment_text: 'I prefer aggro decks in Hearthstone.',
    user_id: 3, 
    post_id: 1, 
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
