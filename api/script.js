async function generateBio() {
  const input = document.getElementById('input').value.trim();
  const output = document.getElementById('output');
  
  if (!input) {
    output.innerText = "Please enter something!";
    return;
  }

  output.innerText = "Generating...";

  try {
    const res = await fetch('/api/generateBio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });

    const data = await res.json();
    output.innerText = data.bio || "No bio received.";
  } catch (err) {
    output.innerText = "Error generating bio.";
  }
}
