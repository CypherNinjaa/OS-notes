"use server"

export async function generateGroqResponse(query: string): Promise<string> {
  try {
    const GROQ_API_KEY = process.env.GROQ_API_KEY

    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not defined in environment variables")
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant specialized in operating systems concepts. Answer the following question about operating systems in a clear, educational manner. If appropriate, include code examples, diagrams descriptions, or step-by-step explanations.",
          },
          {
            role: "user",
            content: query,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`API request failed: ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error calling Groq API:", error)
    return "I'm sorry, I encountered an error while processing your request. Please try again later."
  }
}
