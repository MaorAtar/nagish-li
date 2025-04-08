import { OpenAI } from 'openai';
import { AI_PROMPT } from '../constants/options'; 

interface AccessInfo {
    isWheelchairAccessible: boolean;
    hasAccessibleRestrooms: boolean;
    hasAccessibleParking: boolean;
    hasElevator: boolean;
    hasBrailleSigns: boolean;
    comments: string;
    error?: string;
}

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

const populatePrompt = (name: string, address: string): string => {
    return AI_PROMPT
        .replace('{name}', name)
        .replace('{address}', address);
};

const callOpenAI = async (prompt: string, maxTokens: number): Promise<AccessInfo> => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: maxTokens,
            temperature: 0.5,
            top_p: 1,
        });

        const content = response.choices[0]?.message?.content;
        console.log('Raw OpenAI response:', content);

        // Remove any extraneous characters (like backticks) and sanitize the response
        let sanitizedContent = content?.replace(/```json|```/g, '').trim();

        try {
            const parsedContent = JSON.parse(sanitizedContent || '{}');
            return parsedContent;
        } catch (e) {
            console.error('Parsing error:', e);
            console.log('Sanitized content that failed parsing:', sanitizedContent);
            return { error: 'תשובה לא פורמטית התקבלה מ-OpenAI' };
        }
    } catch (error: any) {
        if (error.response && error.response.status === 429) {
            console.error('Rate limit exceeded or credit limit reached. Check your OpenAI account.');
        } else if (error.response && error.response.status === 401) {
            console.error('Invalid API key. Please verify your OpenAI API key.');
        } else {
            console.error('Error with OpenAI API:', error);
        }
        return { error: 'Failed to generate the response. Please try again later.' };
    }
};


const generateAccessInfo = async (name: string, address: string): Promise<AccessInfo> => {
    try {
        const prompt = populatePrompt(name, address);
        const accessInfo = await callOpenAI(prompt, 3000);
        console.log('Generated Access Info:', accessInfo);
        return accessInfo;
    } catch (error) {
        console.error('Error generating access info:', error);
        return { error: 'Something went wrong while generating the access info.' };
    }
};

export { generateAccessInfo };
