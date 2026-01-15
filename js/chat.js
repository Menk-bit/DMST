document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-button");
  const messages = document.getElementById("chat-messages");

  function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className =
      sender === "user" ? "text-right mb-2" : "text-left mb-2 text-green-700";
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    // typing indicator
    addMessage("Đang trả lời...", "bot");

    try {
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();

      // remove typing
      messages.lastChild.remove();
      addMessage(data.reply || "Không có phản hồi.", "bot");
    } catch (err) {
      messages.lastChild.remove();
      addMessage("Lỗi kết nối máy chủ.", "bot");
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });
});
