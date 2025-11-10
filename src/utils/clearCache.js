// Clear persisted store cache
export const clearFinanceCache = () => {
  localStorage.removeItem('finance-store');
  sessionStorage.clear();
  window.location.reload();
};

// Debug function to check current store state
export const debugStoreState = () => {
  const stored = localStorage.getItem('finance-store');
  console.log('Stored data:', stored ? JSON.parse(stored) : 'No data');
};