export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { input } = req.body;
  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }

  try {
    const API_KEY = process.env.GEMINI_API_KEY;

    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Create a short, unique, and creative Instagram bio based on this input: ${input}`
              }
            ]
          }
        ]
      })
    });

    const data = await geminiRes.json();
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.status(200).json({ bio: output || "Sorry, no bio generated." });
  } catch (err) {
    res.status(500).json({ error: 'Error generating bio', details: err.message });
  }
}
