import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// We have to do this very time because it is a lambda function meaning:
// it dies once her jobs done

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator : userId,
            prompt,
            tag
        }) 
        // create new response
        await newPrompt.save();
        // return new reponse
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response('Failed to create a new prompt', { status: 500 })
    }
}