const { Schema, Types } = require('mongoose');
import { REACTIONS } from '../../../../lib/constants';

export default async function getPostReactions(req, res) {
  const {
    query: { id: thoughsId },
  } = req;

  try {
    // Here is where we will integrate with MongoDB database
  
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({}));
  } catch (e) {
    console.error(e);

    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({}));
  }
}

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 25,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }

);

module.export = reactionSchema;