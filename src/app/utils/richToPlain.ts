export const richToPlain = (content: string): string => {
  return content.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
};
