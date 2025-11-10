// Map backend category strings to frontend category IDs
export const mapBackendCategoryToId = (backendCategory, categories) => {
  const normalizedBackend = backendCategory?.toLowerCase().replace(/[^a-z0-9]/g, '');
  return categories.find(c => 
    c.name.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedBackend
  )?.id;
};

// Map frontend category ID to backend category string
export const mapCategoryIdToBackend = (categoryId, categories) => {
  const category = categories.find(c => c.id === categoryId);
  return category?.name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'other';
};