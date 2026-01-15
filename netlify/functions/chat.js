export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: message
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.generated_text ||
      data?.[0]?.generated_text ||
      "Xin lỗi, tôi chưa hiểu rõ.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "Chatbot hiện không khả dụng."
      })
    };
  }
}
