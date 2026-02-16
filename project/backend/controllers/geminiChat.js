// geminiChat.js
import axios from "axios";

// This is the function to search for a show on TVmaze
const searchTvMaze = async (query) => {
    try {
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
        return response.data;
    } catch (error) {
        console.error("TVmaze API error:", error.message);
        return null;
    }
};

export const askMovieBot = async (req, res) => {
    try {
        const { message } = req.body;

        // Step 1: Prompt Gemini to act as an intent classifier
        const intentPrompt = `
            You are a helpful assistant. Your task is to analyze the user's message.
            If the message is a greeting (like 'hi', 'hello'), respond with 'greeting'.
            If the message is a request to find information about a movie or TV show, extract the show name and respond with a JSON object: {"action": "search_movie", "query": "show name here"}.
            If the message is unrelated to movies, respond with 'unrelated'.
            For any other movie-related message, respond with 'general_movie_chat'.

            User message: ${message}
        `;

        const intentResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [{ text: intentPrompt }]
                    }
                ]
            }
        );

        const intentText = intentResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        let reply = "I can only talk about movies."; // Default reply
        let searchResult = null;
        let parsedIntent = {};

        try {
            parsedIntent = JSON.parse(intentText);
        } catch (e) {
            // The response wasn't a JSON object, so handle it as plain text
            if (intentText.toLowerCase().includes('greeting')) {
                reply = "Hello there! I'm MovieBot 🎬. How can I help you find a movie today?";
            } else if (intentText.toLowerCase().includes('unrelated')) {
                reply = "I can only talk about movies.";
            } else {
                // If Gemini couldn't classify, just pass it through to the main moviebot prompt
                parsedIntent.action = 'general_movie_chat';
            }
        }

        // Step 2: Handle different intents
        if (parsedIntent.action === 'search_movie' && parsedIntent.query) {
            // Call the TVmaze API to search for the movie
            searchResult = await searchTvMaze(parsedIntent.query);

            if (searchResult && searchResult.length > 0) {
                // Step 3: Pass the TVmaze data back to Gemini to format the response
                const movieData = searchResult[0].show; // Get the first result
                const formatPrompt = `
                    You are MovieBot 🎬. The user searched for a movie.
                    Here is the data from the movie database:
                    Title: ${movieData.name}
                    Summary: ${movieData.summary}
                    Genres: ${movieData.genres.join(', ')}
                    Rating: ${movieData.rating?.average || 'N/A'}
                    Official Site: ${movieData.officialSite || 'N/A'}

                    Please provide a friendly, easy-to-read summary of this movie information.
                    Start with "I found this about ${movieData.name}:".
                `;

                const finalResponse = await axios.post(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
                    {
                        contents: [
                            {
                                role: "user",
                                parts: [{ text: formatPrompt }]
                            }
                        ]
                    }
                );
                reply = finalResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;

            } else {
                reply = `Sorry, I couldn't find any movie or show named "${parsedIntent.query}".`;
            }
        } else if (parsedIntent.action === 'general_movie_chat') {
             // Handle a general movie-related question by passing it to the main MovieBot prompt
             const generalMoviePrompt = `
                 You are MovieBot 🎬.
                 - Only talk about movies.
                 - If the user describes a scene, guess the movie name.
                 - If the question is unrelated to movies, say 'I can only talk about movies.'.

                 User message: ${message}
             `;

             const generalResponse = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
                {
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: generalMoviePrompt }]
                        }
                    ]
                }
             );
             reply = generalResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        }

        res.json({ reply });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ reply: `Gemini API or TVmaze API error ❌ ${error.message}` });
    }
};