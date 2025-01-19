import axios from "axios"

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions"

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function generateMistralResponse(prompt: string): Promise<string> {
  if (!MISTRAL_API_KEY) {
    console.error("MISTRAL_API_KEY is not set")
    throw new Error("MISTRAL_API_KEY is not set")
  }

  let retries = 0
  while (retries < MAX_RETRIES) {
    try {
      console.log(`Attempt ${retries + 1} to send request to Mistral AI`)
      const response = await axios.post(
        MISTRAL_API_URL,
        {
          model: "mistral-tiny",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MISTRAL_API_KEY}`,
          },
        },
      )
      console.log("Received response from Mistral AI")
      return response.data.choices[0].message.content
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 429) {
          console.log(`Rate limit exceeded. Retrying in ${RETRY_DELAY / 1000} seconds...`)
          await sleep(RETRY_DELAY)
          retries++
        } else {
          console.error("Error calling Mistral AI API:", error.response.data)
          throw new Error(`Failed to generate response from Mistral AI: ${error.response.data.message}`)
        }
      } else {
        console.error("Unexpected error:", error)
        throw new Error("An unexpected error occurred while calling Mistral AI")
      }
    }
  }

  throw new Error("Max retries reached. Failed to generate response from Mistral AI")
}

