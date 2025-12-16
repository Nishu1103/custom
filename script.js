const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const template = new Image();
template.src = "template.png";

let uploadedImage = null;

// Draw base template
template.onload = render;

document.getElementById("photo").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    uploadedImage = new Image();
    uploadedImage.onload = render;
    uploadedImage.src = reader.result;
  };
  reader.readAsDataURL(file);
});

const nameInput = document.getElementById("name");

// force uppercase while typing
nameInput.addEventListener("input", () => {
  nameInput.value = nameInput.value.toUpperCase();
  render();
});

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Template
  ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

  // 2. User photo (aligned to placeholder)
  if (uploadedImage) {
    ctx.drawImage(
      uploadedImage,
      30,  // X
      110, // Y
      280, // WIDTH
      300  // HEIGHT
    );
  }

  // 3. Name text (centered on yellow banner)
  const name = nameInput.value.toUpperCase();
  if (name) {
    ctx.font = "bold 44px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    // start text a bit from left edge of yellow band
    ctx.fillText(name, 80, 470);
  }
}

document.getElementById("download").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "final-poster.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
