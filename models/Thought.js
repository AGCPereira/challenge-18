// dependencies
const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

// validators
function validateLength(str) {
    return (str.length < 280 && str.length > 0);
}

// schemas
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            validate: {
            validator: validateLength, 
            message: 'Reaction should be between 1 and 280 characters'}
        },
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => formatDate(createdAtVal),
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            validate: 
            validate: {validateLength, 
                message: 'Thought should be between 1 and 280 characters'},
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => formatDate(createdAtVal),
        },
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

// virtuals
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;