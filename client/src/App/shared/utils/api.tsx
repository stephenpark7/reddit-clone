const apiUrl = (endpoint: string): string => `${process.env.REACT_APP_API_URL}/api/user/${endpoint}`;

const apiRequest = async (endpoint: string, body: any): Promise<any> => {
  try {
    const response = await fetch(apiUrl(endpoint), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const signUp = async (username: string, password: string): Promise<any> => {
  return apiRequest('signup', { username, password });
};

export const logIn = async (username: string, password: string): Promise<any> => {
  return apiRequest('login', { username, password });
};
