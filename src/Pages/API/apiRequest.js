// utils/apiRequest.js

export const apiRequest = async (
  fetchFn,
  {
    showLoading = () => {},
    hideLoading = () => {},
    showGlobalLoading = true,
  } = {}
) => {
  try {
    if (showGlobalLoading) showLoading();
    const result = await fetchFn();
    return result;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  } finally {
    if (showGlobalLoading) hideLoading();
  }
};
