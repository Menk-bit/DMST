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
        model: "gpt-4o-mini",
        input: `Bạn là một bác sĩ dinh dưỡng người Việt. Hãy trả lời thân thiện.\n\nNgười dùng: ${message}`
      })
    });

    const data = await response.json();

    // DEBUG SAFETY (kept short)
    const reply =
      data.output_text ??
      data.output?.[0]?.content?.find(c => c.type === "output_text")?.text ??
      data.output?.[0]?.content?.[0]?.text ??
      null;

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: reply || "Xin lỗi, tôi không thể trả lời lúc này."
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "Có lỗi máy chủ. Vui lòng thử lại."
      })
    };
  }
}
