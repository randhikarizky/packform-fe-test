export const getDeviceName = () => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Windows")) {
    return "Windows";
  } else if (userAgent.includes("Android")) {
    return "Android";
  } else if (userAgent.includes("iPhone")) {
    return "iPhone";
  } else if (userAgent.includes("iPad") || userAgent.includes("iPod")) {
    return "iOS";
  } else if (
    userAgent.includes("Macintosh") ||
    userAgent.includes("Mac OS X")
  ) {
    return "Mac";
  } else {
    return "Unknown";
  }
};

export const getDeviceType = () => {
  const userAgent = navigator.userAgent;

  if (
    userAgent.includes("Android") ||
    userAgent.includes("iPhone") ||
    userAgent.includes("iPad")
  ) {
    return "Mobile";
  } else {
    return "Desktop";
  }
};
