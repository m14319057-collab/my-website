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

  // Show success message
  document.getElementById('success-msg').style.display = 'block';

  // Clear the form
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
}