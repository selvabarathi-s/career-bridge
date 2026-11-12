import { CONFIG } from '../config.ts';

export interface ApiResponse<T = any> {
  status: number;
  ok: boolean;
  data: T;
  rawText: string;
  headers: Headers;
}

export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl = CONFIG.baseUrl) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  clearToken(): void {
    this.token = null;
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  private async request<T>(method: string, path: string, body?: any, customHeaders?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path.startsWith('/') ? path : '/' + path}`;
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      ...customHeaders
    };

    if (body !== undefined) {
      headers['Content-Type'] = 'application/json';
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined
    });

    const rawText = await res.text();
    let data: any = null;
    try {
      data = JSON.parse(rawText);
    } catch {
      data = rawText;
    }

    return {
      status: res.status,
      ok: res.ok,
      data,
      rawText,
      headers: res.headers
    };
  }

  async get<T = any>(path: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', path, undefined, headers);
  }

  async post<T = any>(path: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('POST', path, body, headers);
  }

  async put<T = any>(path: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', path, body, headers);
  }

  async delete<T = any>(path: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', path, undefined, headers);
  }

  async login(email = CONFIG.credentials.student.email, password = CONFIG.credentials.student.password, portalRole = 'student'): Promise<ApiResponse> {
    const res = await this.post('/api/auth/login', { email, password, portalRole });
    if (res.ok && res.data?.token) {
      this.setToken(res.data.token);
    }
    return res;
  }
}

export const api = new ApiClient();
