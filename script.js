const giftBox = document.getElementById("giftBox");
const lid = document.querySelector(".lid");
const sceneContainer = document.getElementById("sceneContainer");
const textBlock = document.getElementById("textBlock");

giftBox.onclick = () => {
  lid.style.transform = "rotateX(120deg)";
  setTimeout(() => {
    giftBox.style.display = "none";
    sceneContainer.classList.remove("hidden");
    textBlock.classList.remove("hidden");
    initThree();
    startText();
  }, 900);
};

let scene, camera, renderer;
let roseGroup;
let dragging = false;
let lastX = 0;
let rotationY = 0;

function initThree() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / (window.innerHeight * 0.58),
    0.1,
    100
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight * 0.58);
  sceneContainer.appendChild(renderer.domElement);

  /* Lights */
  scene.add(new THREE.AmbientLight(0xffffff, 1));

  const keyLight = new THREE.DirectionalLight(0xffdddd, 1.4);
  keyLight.position.set(3, 3, 5);
  scene.add(keyLight);

  /* ROSE GROUP */
  roseGroup = new THREE.Group();

  const texture = new THREE.TextureLoader().load("rose.png");

  const material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    roughness: 0.35,
    metalness: 0.05
  });

  // 3 layered planes for depth illusion
  for (let i = 0; i < 3; i++) {
    const geo = new THREE.PlaneGeometry(3, 3);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.z = i * 0.05;
    mesh.scale.set(1 - i * 0.04, 1 - i * 0.04, 1);
    roseGroup.add(mesh);
  }

  scene.add(roseGroup);

  renderer.domElement.addEventListener("pointerdown", e => {
    dragging = true;
    lastX = e.clientX;
    spawnHearts(e.clientX, e.clientY);
  });

  window.addEventListener("pointermove", e => {
    if (!dragging) return;
    rotationY += (e.clientX - lastX) * 0.004;
    rotationY = Math.max(-0.8, Math.min(0.8, rotationY)); // limit flip
    roseGroup.rotation.y = rotationY;
    lastX = e.clientX;
  });

  window.addEventListener("pointerup", () => dragging = false);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  roseGroup.rotation.y += 0.0015; // slow auto spin
  renderer.render(scene, camera);
}

/* HEARTS */
function spawnHearts(x, y) {
  for (let i = 0; i < 6; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.innerHTML = "❤️";
    h.style.left = x + Math.random() * 20 + "px";
    h.style.top = y + "px";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 2000);
  }
}

/* TEXT */
const lines = [
  "A Rose for You, Priyanka 🌹",
  "This rose is not just a flower,",
  "it’s a reminder of how special you are to me.",
  "Happy Rose Day ❤️",
  "- Your Dhanu"
];

function typeText(el, text, delay = 50) {
  let i = 0;
  el.style.opacity = 1;
  const interval = setInterval(() => {
    el.innerHTML += text.charAt(i++);
    if (i === text.length) clearInterval(interval);
  }, delay);
}

function startText() {
  typeText(line1, lines[0]);
  setTimeout(() => typeText(line2, lines[1]), 2000);
  setTimeout(() => typeText(line3, lines[2]), 4000);
  setTimeout(() => typeText(line4, lines[3]), 6000);
  setTimeout(() => typeText(line5, lines[4]), 8000);
}
