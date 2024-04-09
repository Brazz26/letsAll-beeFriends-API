const { Schema, model } = require('mongoose');
const { Reaction } = require('./Reaction');
const { User } = require('./User');


const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            Required: true,
            minLength: 1,
            maxLength: 280
        },
        timestamps: {
            createdAt: {
                date: {
                    type: Date,
                    default: Date.now
                },
            }
        },
        username: {
             type: String, 
             Required: true
        },
        reactions: [Reaction]
    }
);
thoughtsSchema.virtual('getResponses')
    // Getter
    .get(function () {
        return this.reactions.length;
    });

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;