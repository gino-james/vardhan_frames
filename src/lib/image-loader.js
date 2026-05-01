/**
 * Dynamically loads all images from src/assets and categorizes them by folder.
 */

const rawImages = import.meta.glob("@/assets/**/*.{png,jpg,jpeg,JPG,PNG,webp}", {
  eager: true,
  import: "default",
});

export const categories = {
  fashion: [],
  products: [],
  street: [],
  portrait: [],
};

// Process images and group by folder
Object.entries(rawImages).forEach(([path, url]) => {
  const parts = path.split("/");
  const folder = parts[parts.length - 2]; // Get the parent folder name
  const filename = parts[parts.length - 1]; // Get the filename

  const imageObj = { url, filename, path };

  if (folder === "fashion" || folder === "fashion-gallery") {
    categories.fashion.push(imageObj);
  } else if (folder === "products") {
    categories.products.push(imageObj);
  } else if (folder === "street") {
    categories.street.push(imageObj);
  } else if (folder === "portrait") {
    categories.portrait.push(imageObj);
  }
});

// Sort each category alphabetically by filename to ensure consistency
Object.keys(categories).forEach((key) => {
  categories[key].sort((a, b) => a.filename.localeCompare(b.filename));
});

/**
 * Gets all images for a specific category.
 * @param {string} categoryName
 * @returns {string[]}
 */
export function getCategoryImages(categoryName) {
  const key = categoryName.toLowerCase();
  const imgs = categories[key] || [];
  return imgs.map((img) => img.url);
}

/**
 * Gets a specific preview image for a category based on requirements.
 * @param {string} categoryName
 * @returns {string|null}
 */
export function getCategoryPreview(categoryName) {
  const key = categoryName.toLowerCase();
  const images = categories[key] || [];
  if (images.length === 0) return null;

  // Specific cover requirements
  if (key === "products") {
    const cover = images.find((img) => img.filename === "Screenshot 2026-04-29 111230.webp");
    if (cover) return cover.url;
  }

  if (key === "fashion") {
    const cover = images.find((img) => img.filename === "model5.webp");
    if (cover) return cover.url;
  }

  // Default to the first image (alphabetical)
  return images[0].url;
}
