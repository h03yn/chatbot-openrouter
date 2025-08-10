headers: {
  "Authorization": "Bearer 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"
}


//const apiKey = "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";
const chatBox = document.getElementById("chat-box");

// بارگذاری تاریخچه هنگام شروع
window.onload = () => {
  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  history.forEach(msg => {
    chatBox.innerHTML += `<div><strong>${msg.role}:</strong> ${msg.content}</div>`;
  });
};

async function sendMessage() {
  const input = document.getElementById("user-input").value;
  if (!input) return;

  // نمایش پیام کاربر
  chatBox.innerHTML += `<div><strong>شما:</strong> ${input}</div>`;
  saveToHistory("شما", input);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o",
      messages: [{ role: "user", content: input }]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  // نمایش پاسخ چت‌بات
  chatBox.innerHTML += `<div><strong>چت‌بات:</strong> ${reply}</div>`;
  saveToHistory("چت‌بات", reply);

  document.getElementById("user-input").value = "";
}

// ذخیره پیام در LocalStorage
function saveToHistory(role, content) {
  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  history.push({ role, content });
  localStorage.setItem("chatHistory", JSON.stringify(history));

}
