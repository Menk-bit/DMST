document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-button");
  const chatBox = document.getElementById("chat-messages");

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className =
      sender === "user"
        ? "self-end bg-green-600 text-white p-3 rounded-2xl max-w-[70%]"
        : "self-start bg-white border p-3 rounded-2xl max-w-[70%]";
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  sendBtn.addEventListener("click", async () => {
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    addMessage("Đang tư vấn...", "bot");

    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    chatBox.lastChild.innerText = data.reply;
  });
});
