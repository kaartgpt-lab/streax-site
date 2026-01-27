/**
 * Generate a URL-friendly slug from a title
 * @param {string} title - The title to convert
 * @returns {string} - The generated slug
 */
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') 
    .replace(/[\s_-]+/g, '-') 
    .replace(/^-+|-+$/g, ''); 
};

export default generateSlug;
