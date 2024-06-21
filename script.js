document.addEventListener("DOMContentLoaded", () => {
  const directoryElement = document.getElementById("directory");
  const scaleUpButton = document.getElementById("scale-up");
  const scaleDownButton = document.getElementById("scale-down");
  let itemSize = 100; // Initial size for file items

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
      fileItem.style.width = `${itemSize}px`;
      fileItem.style.height = `${itemSize}px`;

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
    itemSize = Math.min(200, itemSize + 10); // Maksimum ukuran item adalah 200px
    updateItemSize();
  });

  scaleDownButton.addEventListener("click", () => {
    itemSize = Math.max(50, itemSize - 10); // Minimum ukuran item adalah 50px
    updateItemSize();
  });

  function updateItemSize() {
    document.querySelectorAll(".file-item").forEach((item) => {
      item.style.width = `${itemSize}px`;
      item.style.height = `${itemSize}px`;
    });
  }

  fetchDirectoryContents();
});
