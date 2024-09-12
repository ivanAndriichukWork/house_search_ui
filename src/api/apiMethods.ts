import axiosInstance from './index';

export const getData = async <T>(endpoint: string, params?: string): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(params ? `${endpoint}?${params}` : endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async <TRequest, TResponse>(endpoint: string, data: TRequest): Promise<TResponse> => {
  try {
    const response = await axiosInstance.post<TResponse>(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
