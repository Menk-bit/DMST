export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content: [
              { type: "text", text: "You are a friendly Vietnamese nutrition doctor." }
            ]
          },
          {
            role: "user",
            content: [
              { type: "text", text: message }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data?.output_text ||
      data?.output?.[0]?.content?.[0]?.text ||
      "Xin lỗi, tôi không thể trả lời lúc này.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "Có lỗi xảy ra. Vui lòng thử lại."
      })
    };
  }
}
