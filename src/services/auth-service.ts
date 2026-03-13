import { User } from "@/types/User.types";

interface LoginResponse {
  user: User;
  token: string;
}

class AuthService {
  private readonly baseUrl = "/api/auth";

  async login(email: string, password: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.statusText}`);
    }

    const data: LoginResponse = await response.json();
    localStorage.setItem("token", data.token);
    return data.user;
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }
}

export const authService = new AuthService();
