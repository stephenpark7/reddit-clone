const apiUrl = (endpoint: string): string => `${process.env.REACT_APP_API_URL}/api/${endpoint}`;

const apiRequest = async (endpoint: string, method: string = 'GET', body: any = null): Promise<any> => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(apiUrl(endpoint), options);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
};

export const signUp = async (username: string, password: string): Promise<any> => {
  return apiRequest('user/signup', 'POST', { username, password });
};

export const logIn = async (username: string, password: string): Promise<any> => {
  return apiRequest('user/login', 'POST', { username, password });
};

export const getCategories = async (): Promise<any> => {
  return apiRequest('category', 'GET');
};
