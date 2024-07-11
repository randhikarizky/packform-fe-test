export const bytesConverter = (bytes: any) => {
  const kilobyte = 1000;
  const megabyte = 1000000;
  const gigabyte = 1000000000;

  let size = 0;

  if (bytes >= kilobyte) {
    size = bytes / kilobyte;
  }

  if (bytes >= megabyte) {
    size = bytes / megabyte;
  }

  if (bytes >= gigabyte) {
    size = bytes / megabyte;
  }

  return size.toFixed(2);
};

export const bytesConstant = (bytes: any) => {
  const kilobyte = 1000;
  const megabyte = 1000000;
  const gigabyte = 1000000000;

  let size = "";

  if (bytes >= kilobyte) {
    size = "KB";
  }

  if (bytes >= megabyte) {
    size = "MB";
  }

  if (bytes >= gigabyte) {
    size = "GB";
  }

  return size;
};

export const numberWithDotsConverter = (number: any) => {
  let result: any;

  if (!isNaN(number)) {
    result = new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(Number(number));
  } else {
    result = new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(number);
  }

  return result;
};

export const ImgTo64 = async (request: "link" | "file", img: string | Blob) => {
  if (request === "link") {
    if (typeof img === "string") {
      const result = !img
        ? ""
        : await fetch(`${process.env.NEXT_PUBLIC_IMG}${img}`, {
            mode: "no-cors",
          })
            .then((response) => response.blob())
            .then(
              (blob) =>
                new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result as string);
                  reader.onerror = reject;
                  reader.readAsDataURL(blob);
                })
            )
            .then((url) => {
              return url;
            });

      return result as string;
    }
  } else {
    if (typeof img !== "string") {
      const result = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      }).then((url) => {
        return url;
      });

      return result;
    }
  }
};

export const HexToRGB = (hex: string) => {
  const sliced = hex.slice(1); // remove the #
  let parsed: number[] = [];

  if (sliced) {
    const converted = sliced.match(/.{1,2}/g);

    if (converted !== null) {
      parsed = [
        parseInt(converted[0], 16),
        parseInt(converted[1], 16),
        parseInt(converted[2], 16),
      ];
    }
  }

  return parsed;
};
