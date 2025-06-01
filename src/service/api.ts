const BASE_URL = 'http://localhost:3333'; // Ensure this matches your backend's port

const fetchData = async (endpoint, options = {}) => {
  const url = `${BASE_URL}/${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('authToken'); // Get token from storage

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`; // Add Authorization header
  }

  // Merge default headers with any custom headers provided in options
  const headers = {
    ...defaultHeaders,
    ...options.headers, // Allow overriding/adding custom headers
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Improved error handling
    let errorMessage = 'An unknown error occurred.';
    try {
      const errorData = await response.json();
      // Adjust this based on how your backend's errorHandler sends messages
      errorMessage =
        errorData.message ||
        errorData.detail ||
        `Server Error: ${response.status}`;
    } catch (e) {
      // If response is not JSON or other parsing error
      errorMessage = `Network or server error: ${response.statusText}`;
    }

    // Specific handling for authentication/authorization errors
    if (response.status === 401) {
      console.error('Authentication required. Redirecting to login...');
      // Optionally: Redirect to login page or clear token
      localStorage.removeItem('authToken');
      // window.location.href = '/login'; // Example redirect
    } else if (response.status === 403) {
      console.error('Authorization failed. You do not have permission.');
    }

    throw new Error(errorMessage);
  }
  return await response.json();
};

// --- Example Usage for Authenticated Routes ---

export async function getSpaces() {
  return await fetchData('api/spaces/', {
    method: 'GET',
  });
}
