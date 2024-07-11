export const DownloadFile = (file: Blob, fileName: string) => {
  if (file) {
    let url = window.URL.createObjectURL(file);
    let a = document.createElement("a");

    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);

    a.click();
  }
};

export const CompressImage = (file: File, maxSize: number): Promise<Blob> => {
  //maxSize in MB
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event: ProgressEvent<FileReader>) {
      const image = new Image();
      image.onload = function () {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        let maxWidth = image.width;
        let maxHeight = image.height;
        const max = maxSize * 1024 * 1024;
        let compressionRatio = 1;

        if (file.size > max) {
          compressionRatio = Math.sqrt(file.size / max);
          maxWidth /= compressionRatio;
          maxHeight /= compressionRatio;
        }

        canvas.width = maxWidth;
        canvas.height = maxHeight;

        if (context) {
          context.drawImage(image, 0, 0, maxWidth, maxHeight);

          canvas.toBlob(function (blob) {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to compress image."));
            }
          }, file.type);
        } else {
          reject(new Error("Failed to get canvas context."));
        }
      };
      if (event.target && typeof event.target.result === "string") {
        image.src = event.target.result;
      } else {
        reject(new Error("Invalid file content."));
      }
    };
    reader.readAsDataURL(file);
  });
};

export const CalculateAspectRatio = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event: ProgressEvent<FileReader>) {
      const image = new Image();
      image.onload = function () {
        const aspectRatio = image.width / image.height;
        resolve(aspectRatio);
      };
      if (event.target && typeof event.target.result === "string") {
        image.src = event.target.result;
      } else {
        reject(new Error("Invalid file content."));
      }
    };
    reader.readAsDataURL(file);
  });
};
