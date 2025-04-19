import { Gemini_API } from './constant';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini SetUp
export const genAI = new GoogleGenerativeAI(
  Gemini_API
);

