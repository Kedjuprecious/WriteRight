const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5000;
const router = express.Router();

app.use(cors());
app.use(express.json());

const GRADIO_URL = "https://2d5ccb3f20a8980986.gradio.live/";
const questions = [
  "The rise of social media has impacted the way people communicate. To what extent do you agree or disagree?",
  "Some believe that the increasing reliance on technology has led to a decrease in face-to-face communication. Discuss both sides and give your opinion.",
  "Some people believe that children should be taught to be competitive in school, while others think they should be taught to cooperate. Discuss both views and give your opinion.",
  "In some countries, a high percentage of students drop out of school. What are the reasons for this, and what can be done to prevent it?",
];

// Route to get a random question
app.get("/api/question", (req, res) => {
  const chosenQuestion = questions[Math.floor(Math.random() * questions.length)];
  res.send(chosenQuestion);
});

// Function to get predictions from the Gradio API
async function getPrediction(text) {
  try {
    const apiUrl = `${GRADIO_URL}/gradio_api/call/predict`;

    // Prepare the payload according to the Gradio API requirements
    const payload = { data: [text] };

    // First API call (POST)
    const postResponse = await axios.post(apiUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });

    if (!postResponse.data || !postResponse.data.event_id) {
      throw new Error("POST response from Gradio did not contain event_id");
    }

    const { event_id } = postResponse.data;

    // Second API call (GET)
    const getResponse = await axios.get(`${apiUrl}/${event_id}`);
    return getResponse.data;
  } catch (error) {
    console.error("Error communicating with Gradio:", error.message);
    throw new Error("Error communicating with Gradio: " + error.message);
  }
}

// Controller to handle essay submission and call Gradio API
const submitEssay = async (req, res) => {
  const { essay } = req.body;
  try {
    const result = await getPrediction(essay);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error processing essay grading" });
  }
};

// Essay submission route
router.post("/api/submit", submitEssay);

// Use the router in the main app
app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
