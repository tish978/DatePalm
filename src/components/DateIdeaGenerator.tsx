import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { MobileNet } from '@tensorflow-models/mobilenet';
import { ThemeProvider } from './theme-provider';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import '../globals.css'

// NOTE: actual key is in .env
const API_KEY = REACT_APP_OPENAI_API_KEY;

const DateIdeaGenerator = () => {
    const [model, setModel] = useState<MobileNet | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [results, setResults] = useState<{ className: string; probability: number }[]>([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [generatedCaption, setGeneratedCaption] = useState('');
  
    const loadModel = async () => {
      try {
        await tf.setBackend('webgl');
        const loadedModel = await mobilenet.load();
        setModel(_ => loadedModel);
        setIsButtonDisabled(false);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      loadModel();
    }, []);
  
    const generateRandomPrompt = () => {
        const prompts = [
          "Suggest a unique and exciting date activity.",
          "Give me a fun and spontaneous date idea.",
          "Propose an adventurous date plan for the outdoors.",
          "Share a creative and memorable date suggestion.",
          "What's a unique date idea that's off the beaten path?",
          "Describe a romantic date activity for a special evening.",
          "Offer a date recommendation that involves trying something new.",
          "Give me a date idea that combines relaxation and excitement.",
          "Suggest a date plan that would surprise and delight.",
          "Describe an unconventional date idea that stands out.",
          "Provide a memorable date recommendation for a great time.",
          "Share an enjoyable date option that's budget-friendly.",
          "Propose a unique and cultural date activity.",
          "What's a creative date suggestion for a perfect day?",
          "Offer a date idea that involves exploring local attractions.",
          "Give me a fun and active date suggestion.",
          "Suggest a romantic date plan for a cozy night in.",
          "Describe a unique date idea that promotes laughter and joy.",
          "Provide a memorable date recommendation for a relaxing day.",
          "Share an adventurous date option that adds excitement.",
        ];
    
        const randomIndex = Math.floor(Math.random() * prompts.length);
        return prompts[randomIndex];
      };
      
      const callOpenAIAPI = async () => {
        console.log("Calling OpenAI API");
    
        const prompt = generateRandomPrompt();
    
        const APIBody = {
          "model": "gpt-3.5-turbo-instruct",
          "prompt": prompt,
          "temperature": 0,
          "max_tokens": 300,
          "top_p": 1.0,
          "frequency_penalty": 0.0,
          "presence_penalty": 0.0
        };
    
        try {
          setIsButtonDisabled(true); // Disable the button while waiting for the response
          setLoading(true);
    
          const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + API_KEY
            },
            body: JSON.stringify(APIBody)
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
    
          const data = await response.json();
          const generatedText = data.choices[0].text.trim();
          setGeneratedCaption(generatedText);
          console.log(generatedText);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setIsButtonDisabled(false);
          setLoading(false);
        }
      };
    
      useEffect(() => {
        loadModel()
      }, [])
    
      console.log(results)
  
      return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="flex flex-col items-center mt-12 p-4 mb-12">
            <Button
              variant="secondary"
              onClick={callOpenAIAPI}
              disabled={isButtonDisabled}
              className="w-1/8"
            >
              Give me a date idea!
            </Button>
            {(loading || generatedCaption) && (
              <div className="mt-2 p-4 rounded w-full text-sm md:text-md text-muted-foreground text-center">
                {loading ? (
                  <div>
                    <Skeleton className="w-[250px] h-[35px] rounded-full bg-muted" />
                  </div>
                ) : (
                  generatedCaption
                )}
              </div>
            )}
          </div>
        </ThemeProvider>
      );
}

export default DateIdeaGenerator