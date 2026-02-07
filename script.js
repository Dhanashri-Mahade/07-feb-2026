const lines = [
  "A Rose for You, Priyanka 🌹",
  "This rose is not just a flower,",
  "it’s a reminder of how special you are to me.",
  "Happy Rose Day ❤️",
  "- Your Dhanu"
];

function typeText(element, text, delay = 50) {
  let i = 0;
  element.style.opacity = 1;
  const interval = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;
    if (i === text.length) clearInterval(interval);
  }, delay);
}

setTimeout(() => typeText(document.getElementById("line1"), lines[0]), 2000);
setTimeout(() => typeText(document.getElementById("line2"), lines[1]), 4000);
setTimeout(() => typeText(document.getElementById("line3"), lines[2]), 6000);
setTimeout(() => typeText(document.getElementById("line4"), lines[3]), 8000);
