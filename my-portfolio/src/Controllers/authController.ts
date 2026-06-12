export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data: AuthResponse = await response.json();
  localStorage.setItem("token", data.token);
  return data;
};

export const logout = (): void => {
  localStorage.removeItem("token");
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};
