export async function handler(event) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: "Say hello"
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: response.status,
      data
    })
  };
}
