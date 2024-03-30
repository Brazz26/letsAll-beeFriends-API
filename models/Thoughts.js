const { Schema, model } = require('mongoose')
const { User } = require('./User')


const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            Required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            date: {
                type: Date,
                default: Date.now
            },
            timestamps: true
        },
        username: {
            type: String,
            required: true,
            ref: {User, username_id}
        }, 
        reactions:[]
    }
);
thoughtsSchema.virtual('getResponses')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;