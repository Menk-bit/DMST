export async function handler(event) {
  try {
    const { message = "" } = JSON.parse(event.body || "{}");
    const text = message.toLowerCase().trim();

    let reply =
      "Chuyên gia sẽ phẩn hồi ngay. Bạn đợi một chút nhé!";

    // Greetings
    if (/^(hi|hello|hey|chào|xin chào)/i.test(text)) {
      reply =
        "Xin chào! Tôi là trợ lý dinh dưỡng. Tôi có thể giúp gì cho bạn hôm nay?";
    }

    // Nutrition / food
    else if (text.includes("ăn") || text.includes("eat")) {
      reply =
        "Một bữa ăn lành mạnh nên có rau xanh, đạm nạc, tinh bột vừa đủ và hạn chế đồ ngọt.";
    }

    // Weight loss
    else if (text.includes("giảm cân") || text.includes("lose weight")) {
      reply =
        "Để giảm cân an toàn, bạn nên ăn đủ đạm, nhiều rau, uống nước và vận động nhẹ mỗi ngày.";
    }

    // Exercise
    else if (text.includes("tập") || text.includes("exercise")) {
      reply =
        "Kết hợp dinh dưỡng hợp lý với tập luyện đều đặn sẽ mang lại hiệu quả tốt nhất.";
    }

    // Thanks
    else if (text.includes("cảm ơn") || text.includes("thank")) {
      reply = "Rất vui được giúp bạn 😊";
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: "Hệ thống đang bận, vui lòng thử lại sau."
      })
    };
  }
}
