import axios from 'axios';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1';

export interface DocumentationRequest {
  topic: string;
  department?: string;
  format?: 'pdf' | 'markdown' | 'text';
  includeCharts?: boolean;
  year?: string;
}

export async function generateDocumentation(req: Request, res: Response) {
  try {
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key is not configured' });
    }

    const { topic, department, format = 'markdown', includeCharts = false, year } = req.body as DocumentationRequest;

    if (!topic) {
      return res.status(400).json({ error: 'Missing required parameter: topic' });
    }

    // Build prompt for documentation generation
    const prompt = `
      Generate comprehensive government financial documentation about ${topic}.
      ${department ? `Focus on the ${department} department.` : 'Include all relevant departments.'}
      ${year ? `Include data specifically for fiscal year ${year}.` : 'Include the most recent fiscal year data.'}
      ${includeCharts ? 'Include descriptions of relevant charts and visualizations that would be helpful.' : ''}
      
      Structure the documentation with:
      1. Executive Summary
      2. Introduction and Context
      3. Key Metrics and Analysis
      4. Department Breakdown (if applicable)
      5. Budget Analysis
      6. Recommendations
      7. Conclusion
      
      Format the response in ${format === 'markdown' ? 'Markdown' : format === 'pdf' ? 'text suitable for PDF conversion' : 'plain text'}.
      Be specific, factual, and use a professional government reporting style.
      Add appropriate headers, subheaders, and formatting.
    `;

    // Call OpenAI API to generate documentation
    const response = await axios.post(
      `${OPENAI_API_URL}/chat/completions`,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a government documentation specialist producing official reports on government financial data and efficiency metrics.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const documentationText = response.data.choices[0].message.content;
    
    // Convert markdown to HTML if format is markdown for proper rendering
    let content = documentationText;
    
    // In a production app, you might have more advanced formatting or PDF conversion
    if (format === 'markdown') {
      // Simple markdown to HTML conversion
      // Replace headers
      content = content
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold my-4">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold my-3">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium my-2">$1</h3>')
        // Replace lists
        .replace(/^\* (.*$)/gim, '<ul class="list-disc pl-6 my-2"><li>$1</li></ul>')
        .replace(/^\d\. (.*$)/gim, '<ol class="list-decimal pl-6 my-2"><li>$1</li></ol>')
        // Replace paragraphs
        .replace(/^(?!<h|<ul|<ol|<li|<table)(.*$)/gim, '<p class="my-2">$1</p>')
        // Replace bold and italic
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>');
    }
    
    res.json({ 
      content,
      format,
      topic,
      department: department || 'All Departments',
      generatedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error generating documentation:', error);
    res.status(500).json({ error: 'Failed to generate documentation' });
  }
}