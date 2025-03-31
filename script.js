document.addEventListener("DOMContentLoaded", () => {
  const imageUrls = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
  ];
  
  const outputDiv = document.getElementById("output");
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "loading";
  loadingDiv.innerText = "Loading...";
  loadingDiv.style.display = "none";
  document.body.insertBefore(loadingDiv, outputDiv);
  
  const errorDiv = document.createElement("div");
  errorDiv.id = "error";
  errorDiv.style.color = "red";
  document.body.insertBefore(errorDiv, outputDiv);

  const downloadButton = document.getElementById("download-images-button");

  const downloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    });
  };

  const downloadImages = async () => {
    outputDiv.innerHTML = "";
    errorDiv.innerText = "";
    loadingDiv.style.display = "block";
    
    try {
      const imageElements = await Promise.all(imageUrls.map(downloadImage));
      imageElements.forEach(img => outputDiv.appendChild(img));
    } catch (err) {
      errorDiv.innerText = err.message;
    } finally {
      loadingDiv.style.display = "none";
    }
  };

  downloadButton.addEventListener("click", downloadImages);
});
