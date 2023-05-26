import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User', // One to many relationship, one user can create many prompts
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.']
    },
    tag: {
        type: String,
        required: [true, 'Tags is required.']
    }
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

// Either gets the prompt that already exists in models object or Create a new model called prompt based on the PromptSchema. 

export default Prompt;



