const resizeImage = (
  input: {
    file: File | Blob;
    width?: number;
    height?: number;
  },
  callback: (resultBlob: Blob) => void
) => {
  const { file, height = 200, width = 200 } = input;

  const img: HTMLImageElement = new window.Image();
  img.src = URL.createObjectURL(file);
  img.onload = async function () {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      let result = new File([blob!], "fileName.jpg", { type: "image/jpeg" });
      callback(result);
    }, "image/jpeg");
  };
};

export default resizeImage;
