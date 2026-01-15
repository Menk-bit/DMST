export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body || "{}");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: `Bạn là bác sĩ dinh dưỡng người Việt. Trả lời thân thiện.\n\nNgười dùng: ${message}`
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.output_text || "Không nhận được phản hồi từ AI."
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "Lỗi máy chủ."
      })
    };
  }
}
