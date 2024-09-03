import "./CreateClient.css"
import { UseApi } from '../hooks/UseApi';

import { useState } from 'react';
import { ClientType } from '../types/ClientType';
import { FormClient } from '../components/FormClient';

export const CreateUser = () => {
    const api = UseApi();
    const [client, setClient] = useState<ClientType>();


    const handleCreateClient = async (newClient: ClientType) => {
        const response = await api.saveClient(newClient);
        if (typeof response === 'string'){
            return response
        } else {
            setClient(response)
        }
        return typeof response === 'string' ? response: true;
    }

    return (
        <>
            <FormClient 
            title='Atualização de cliente' 
            onSubmit={handleCreateClient}
            initialValues={client}
            />
        </>

    );
}