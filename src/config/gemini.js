// const { GenerativeModel } = require('@google/generative-ai');

// async function runChat(prompt) {
//   try {
//     const genai = new GenerativeModel({
//       apiKey: 'AIzaSyByWX5PDf1ZLoWaswm2CQdG1dpd3a37_pw',
//       modelName: 'gemini-1.5-flash'
//     });

//     const response = await genai.generateContent(prompt);
//     if (response && response.text) {
//       console.log(response.text);
//     } else {
//       console.error('No text in response:', response);
//     }
//   } catch (error) {
//     console.error('Error generating content:', error);
//   }
// }
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = "AIzaSyByWX5PDf1ZLoWaswm2CQdG1dpd3a37_pw";

async function runChat(prompt){
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({model: MODEL_NAME});

  const generationConfig={
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
  }


  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    ];
  const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [

      ],
  })

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();

}

export default runChat;

// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from '@google/generative-ai';

// const MODEL_NAME = "gemini-1.5-flash";
// const API_KEY = "AIzaSyByWX5PDf1ZLoWaswm2CQdG1dpd3a37_pw";

// async function runChat(prompt) {
//   const genAI = new GoogleGenerativeAI({ apiKey: API_KEY });
//   const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//   const generationConfig = {
//     temperature: 0.9,
//     topK: 1,
//     topP: 1,
//     maxOutputTokens: 2048,
//   };

//    const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     ];

//   const maxRetries = 5;
//   let attempt = 0;

//   while (attempt < maxRetries) {
//     try {
//       const response = await model.generateContent({
//         prompt: { text: prompt },
//         generationConfig,
//         safetySettings,
//       });
//       if (response && response.text) {
//         console.log(response.text);
//         return response.text;
//       } else {
//         console.error('No text in response:', response);
//         return null;
//       }
//     } catch (error) {
//       if (error.message.includes('429')) {
//         attempt++;
//         const backoffTime = Math.pow(2, attempt) * 1000; // Exponential backoff
//         console.warn(Rate limit exceeded. Retrying in ${backoffTime / 1000} seconds...);
//         await new Promise(resolve => setTimeout(resolve, backoffTime));
//       } else {
//         console.error('Error generating content:', error);
//         return null;
//       }
//     }
//   }

//   console.error('Max retries reached. Could not generate content.');
//   return null;
// }

// export default runChat;