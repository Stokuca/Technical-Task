// src/api/openai.ts

// const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// export async function generateContentFromTitle(title: string): Promise<string> {
//   const response = await fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${OPENAI_API_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: 'You are a helpful assistant writing reports based on a title.',
//         },
//         {
//           role: 'user',
//           content: `Write a professional report based on the title: "${title}"`,
//         },
//       ],
//     }),
//   });

//   if (!response.ok) {
//     console.error('OpenAI API error:', response.status);
//     throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
//   }

//   const data = await response.json();
//   return data.choices?.[0]?.message?.content ?? '';
// }


export async function generateContentFromTitle(title: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (title.toLowerCase().includes("fail")) {
        reject(new Error("Mocked AI failure."));
      } else {
        resolve(title);
      }
    }, 1200);
  });
}
