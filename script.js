document.addEventListener("DOMContentLoaded", () => {
  const directoryElement = document.getElementById("directory");
  const scaleUpButton = document.getElementById("scale-up");
  const scaleDownButton = document.getElementById("scale-down");
  let scale = 1;

  async function fetchDirectoryContents() {
    try {
      const response = await fetch("files.json");
      const files = await response.json();
      displayFiles(files);
    } catch (error) {
      console.error("Error fetching directory contents:", error);
    }
  }

  function displayFiles(files) {
    directoryElement.innerHTML = "";
    files.forEach((file) => {
      const fileItem = document.createElement("div");
      fileItem.className = "file-item";
      fileItem.style.transform = `scale(${scale})`;

      if (file.type === "image") {
        const img = document.createElement("img");
        img.src = file.src;
        fileItem.appendChild(img);
      } else if (file.type === "text") {
        const textIcon = document.createElement("div");
        textIcon.textContent = "📄";
        textIcon.style.fontSize = "50px";
        fileItem.appendChild(textIcon);
      }

      const span = document.createElement("span");
      span.textContent = file.name;
      fileItem.appendChild(span);

      const downloadButton = document.createElement("a");
      downloadButton.textContent = "Download";
      downloadButton.href = file.src;
      downloadButton.setAttribute("download", file.name);
      fileItem.appendChild(downloadButton);

      directoryElement.appendChild(fileItem);
    });
  }

  scaleUpButton.addEventListener("click", () => {
    scale = Math.min(2, scale + 0.1); // Maksimum skala adalah 2x dari ukuran asli
    updateScale();
  });

  scaleDownButton.addEventListener("click", () => {
    scale = Math.max(0.5, scale - 0.1); // Minimum skala adalah setengah dari ukuran asli
    updateScale();
  });

  function updateScale() {
    document.querySelectorAll(".file-item").forEach((item) => {
      item.style.transform = `scale(${scale})`;
    });
  }

  fetchDirectoryContents();
});
