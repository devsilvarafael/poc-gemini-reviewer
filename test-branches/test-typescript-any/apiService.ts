// ❌ VIOLAÇÃO: Serviço com any em todo lugar

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // ❌ VIOLAÇÃO: retorno any
  async get(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json();
  }

  // ❌ VIOLAÇÃO: body como any
  async post(endpoint: string, body: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return response.json();
  }

  // ❌ VIOLAÇÃO: parâmetro e retorno any
  transformData(data: any): any {
    return data.map((item: any) => ({
      ...item,
      processed: true,
    }));
  }
}

export const apiService = new ApiService('/api');
