const { Schema, model } = require('mongoose')
const { User } = require('./User')


const thoughtsModel = new Schema(
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

const Thoughts = model('Thoughts', thoughtsModel);
module.exports = Thoughts;