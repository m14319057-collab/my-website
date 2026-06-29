function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

function setGreeting() {
  const hour = new Date().getHours();
  const name = "Mani kumar";
  let greeting = "";
  if (hour < 12) {
    greeting = "🌅 Good Morning, I'm " + name;
  } else if (hour < 17) {
    greeting = "☀️ Good Afternoon, I'm " + name;
  } else {
    greeting = "🌙 Good Evening, I'm " + name;
  }
  document.getElementById("greeting").textContent = greeting;
}
setGreeting();

function animateBars() {
  const bars = document.querySelectorAll('.fill');
  bars.forEach(bar => {
    const target = bar.getAttribute('data-width');
    bar.style.width = target + '%';
  });
}
animateBars();

function sendMessage() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  if (!name || !email || !message) {
    alert('Please fill all fields!');
    return;
  }
  document.getElementById('success-msg').style.display = 'block';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
}

function toggleChat() {
  const box = document.getElementById('chat-box');
  box.style.display = box.style.display === 'flex' ? 'none' : 'flex';
}

function handleKey(event) {
  if (event.key === 'Enter') sendChat();
}

async function sendChat() {
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');
  const userText = input.value.trim();
  if (!userText) return;

  messages.innerHTML += `<div class="user-msg">${userText}</div>`;
  input.value = '';
  messages.innerHTML += `<div class="loading-msg" id="loading">Thinking... 🤔</div>`;
  messages.scrollTop = messages.scrollHeight;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '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',
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: `You are an AI assistant for Mani Kumar's portfolio website.
Answer questions about Mani based on this info:
- Full name: Mani Kumar
- College: SNIST College, Hyderabad
- Degree: B.Tech in ECE (Electronics and Computer Engineering)
- Skills: Python, ARM Assembly, HTML, CSS, JavaScript, Java
- Projects: Map Relocation App (Python), Ride-Hailing Driver Matching Simulation (Python), ARM Assembly Programs, 8-bit Addition in MASM, Personal Portfolio Website
- Interests: Web development, AI, Embedded Systems
- Location: Hyderabad, India
- Contact: Via the contact form on this website
Keep answers short, friendly and professional.`,
        messages: [{ role: 'user', content: userText }]
      })
    });

    const data = await response.json();
    const botReply = data.content[0].text;
    document.getElementById('loading').remove();
    messages.innerHTML += `<div class="bot-msg">${botReply}</div>`;
    messages.scrollTop = messages.scrollHeight;

  } catch (error) {
    document.getElementById('loading').remove();
    messages.innerHTML += `<div class="bot-msg">Sorry, something went wrong. Try again! 😅</div>`;
  }
}