async function generateBio() {
  const prompt = document.getElementById("prompt").value;
  const outputDiv = document.getElementById("output");

  outputDiv.innerText = "Thinking...";

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Create a creative Instagram bio for: ${prompt}` }] }],
      }),
    }
  );

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Bio not generated.";
  outputDiv.innerText = text;
}