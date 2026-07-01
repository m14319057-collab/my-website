function setGreeting() {
  const hour = new Date().getHours();
  const name = "Mani Kumar";
  let greeting = "";

  if (hour < 12) {
    greeting = "🌅 Good Morning, I'm " + name;
  } else if (hour < 17) {
    greeting = "☀️ Good Afternoon, I'm " + name;
  } else {
    greeting = "🌙 Good Evening, I'm " + name;
  }

  typeText(greeting);
}

function typeText(text) {
  const el = document.getElementById('typed-text');
  if (!el) return;
  let i = 0;
  el.textContent = '';
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 60);
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

async function sendMessage() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!name || !email || !message) {
    alert('Please fill all fields!');
    return;
  }

  try {
    const response = await fetch('https://formspree.io/f/mzdljegb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      document.getElementById('success-msg').style.display = 'block';
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('message').value = '';
    } else {
      alert('Something went wrong. Try again!');
    }
  } catch (error) {
    alert('Failed to send. Check your internet!');
  }
}
function toggleMenu() {
  const nav = document.getElementById('nav-links');
  nav.classList.toggle('open');
}
// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
  }, 1500);
});
// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = progress + '%';
});
// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section, .project-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
