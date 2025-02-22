export const isValidUrl = (url: string | undefined): boolean => {
  try {
    if (!url) return false;
    new URL(url);
    return true;
  } catch (error) {
    console.error("Invalid URL:", error);
    return false;
  }
};
