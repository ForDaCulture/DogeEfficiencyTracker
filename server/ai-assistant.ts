import type { Request, Response } from 'express';
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1';

export async function handleAIAssistantQuery(req: Request, res: Response) {
  try {
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key is not configured' });
    }

    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid query parameter' });
    }

    // Context about the government dashboard data
    const systemPrompt = `
      You are America First Helper, an AI assistant for the Government Efficiency Dashboard.
      You help users understand government financial data and provide insights about spending, budgets, and efficiency metrics.
      
      Available data includes:
      - Department metrics (Treasury, Defense, Education, Transportation, Health & Human Services, Energy, Veterans Affairs)
      - Budget allocations and spending trends
      - Project completion rates and performance metrics
      - Efficiency trends over time
      - Waste analysis with optimization suggestions
      
      When answering questions:
      - Be concise and factual
      - Refer to specific data from the dashboard when possible
      - Provide actionable insights that could help improve government efficiency
      - Use patriotic, optimistic language focused on improving governance
      - Format currency values with $ and use appropriate decimal points
      
      Remember to be respectful and politically neutral in your responses.
    `;

    const response = await axios.post(
      `${OPENAI_API_URL}/chat/completions`,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error in AI assistant:', error);
    res.status(500).json({ error: 'Failed to get response from AI assistant' });
  }
}

export async function generateImage(req: Request, res: Response) {
  try {
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key is not configured' });
    }

    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid prompt parameter' });
    }

    const response = await axios.post(
      `${OPENAI_API_URL}/images/generations`,
      {
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const imageData = response.data.data[0].b64_json;
    res.json({ image: imageData });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}