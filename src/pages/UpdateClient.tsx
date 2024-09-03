import { Alert, AlertTitle } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FormClient } from '../components/FormClient';
import { UseApi } from '../hooks/UseApi';
import { ClientType } from '../types/ClientType';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UpdateClient = () => {
    const api = UseApi();
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>();
    const [client, setClient] = useState<ClientType | null>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getClient = async () => {
            if (id) {
                const data = await api.searchById(id);
                if(typeof data !== "string"){
                    setClient(data);
                }else{
                    setMessage(data)
                }
            }
        };
        getClient();
    }, []);

    const handleUpdateClient = async (updatedClient: ClientType) => {
        if (updatedClient && id) {
            const response = await api.updateClient(updatedClient);
            return typeof response === 'string' ? response : true;
        }
        navigate(`/update-client/${client?.id}`)
        return false;
    };

    return (
        <>
            <FormClient 
            title='Atualização de cliente' 
            onSubmit={handleUpdateClient}
            initialValues={client}
            />
            {message && (
                <Alert severity='error' variant="filled">
                    <AlertTitle>Erro</AlertTitle>
                    {message}
                </Alert>
            )}
        </>
    )
};
