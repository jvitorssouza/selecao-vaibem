import { AxiosRequestConfig } from 'axios';
import { Api } from '~/configs/Api';

Api.interceptors.request.use(
    async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        const { url } = config;
        const user = JSON.parse(localStorage.getItem('userData') || '{}');
        const token = user?.token;

        if (!url?.endsWith('login') || !url.endsWith('subscribe')) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }
);
