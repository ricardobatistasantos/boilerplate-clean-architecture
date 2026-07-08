import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

@Injectable()
export class AxiosClient {
  private readonly client: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.client = axios.create({
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Intercepta requisições
    this.client.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Intercepta respostas
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data: any): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}