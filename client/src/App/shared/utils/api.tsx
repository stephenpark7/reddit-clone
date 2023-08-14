export const signUp = async (username: string, password: string) => {
  try {
    const response = await fetch
    (`${process.env.REACT_APP_API_URL}/api/user/signup`, 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'username': username, 'password': password}),
      }
    );
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const data = await response.json();
    return data;
  } catch (err: any) {
    throw err;
  }
};

export const logIn = async (username: string, password: string) => {
  try {
    const response = await fetch
    (`${process.env.REACT_APP_API_URL}/api/user/login`, 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'username': username, 'password': password}),
      }
    );
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const data = await response.json();
    return data;
  }
  catch (err: any) {
    throw err;
  }
};
