import { Schema, model } from 'mongoose';

const genreSchema = new Schema({
  title: {
    type: [String],
    required: true,
    enum: [
      'ACTION',
      'BIOGRAPHY',
      'CHILDREN',
      'DRAMA',
      'ENCYCLOPEDIA',
      'FANTASY',
      'HISTORY',
      'HORROR',
      'MYSTERY',
      'POETRY',
      'THRILLER'
    ]
  }
});

export default model('Genre', genreSchema);
