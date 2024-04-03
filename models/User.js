const { Schema, model } = require('mongoose');
const { Thoughts } = require('./Thoughts');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            Trimmed: true
        },
        name: {
            first: String,
            last: String,
            age: Number
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: () => Promise.resolve(false),
                message: 'Email validation failed'
            }
        },
        thoughts: [Thoughts.id],
        friends: [friends.id],
    },
    {
        toJSON: {
            virtuals: true,
          },
          id: false,
    }
);

userModel
    .virtual('fullName')
    // Getter
    .get(function () {
        return `${this.first} ${this.last}`;
    })
    // Setter to set the first and last name
    .set(function (v) {
        const first = v.split(' ')[0];
        const last = v.split(' ')[1];
        this.set({ first, last });
    });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
