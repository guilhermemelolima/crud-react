import axios from 'axios'
import { ClientType } from '../types/ClientType';

const api = axios.create({ baseURL: import.meta.env.VITE_URL_API });

export const UseApi = () => ({
	saveClient: async (client: ClientType): Promise<ClientType | string> => {
		try {
			const response = await api.post('/client/create', client);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return error.response.data as string;
			} else {
				return 'Erro desconhecido';
			}
		}
	},
	searchAllClient: async (): Promise<ClientType[] | string> => {
		try {
			const respose = await api.get('/client/get-all');
			return respose.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response){
				return error.response.data as string;
			} else {
				return '';
			}
		}
	},
	searchByCpf: async (cpf: string): Promise<ClientType | string> => {
		try {
			const respose = await api.get(`/client/get-by?cpf=${cpf}`);
			return respose.data
		}catch (error) {
			if (axios.isAxiosError(error) && error.response){
				return error.response.data as string;
			} else {
				return 'Erro desconhecido'
			}
		}
	},
	searchById: async (id: string): Promise<ClientType | string> => {
		try {
			const respose = await api.get(`/client/get?id=${id}`);
			return respose.data
		}catch (error) {
			if (axios.isAxiosError(error) && error.response){
				return error.response.data as string;
			} else {
				return 'Erro desconhecido'
			}
		}
	},
	deleteClient: async (id: string): Promise<string> => {
		try {
			await api.delete(`/client/delete?id=${id}`);
			return 'Cliente deletado com sucesso';
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return error.response.data as string;
			} else {
				return 'Erro desconhecido';
			}
		}
	},
	updateClient: async (client: ClientType): Promise<ClientType | string> => {
		try {
			const response = await api.put(`/client/update`, client);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return error.response.data as string;
			}else {
				return 'Erro desconhecido'
			}
		}
	}
});