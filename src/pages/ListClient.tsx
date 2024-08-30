import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import { FaSearch, FaUserCircle, FaUserEdit } from 'react-icons/fa';
import { FaDeleteLeft } from "react-icons/fa6";
import { ClientType } from '../types/ClientType';
import { useApi } from '../hooks/UseApi';
import { ChangeEvent, useEffect, useState } from 'react';
import './ListClient.css'
import { useNavigate } from 'react-router-dom';

/*
    TODO: ERRO de requisição infinita relacionada ao handleSearchAllClient
*/


export const ListClient = () => {
    const api = useApi();
    const navigate = useNavigate()

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>();

    const [client, setClient] = useState<ClientType | null >(null);
    const [clientList, setClientList] = useState<ClientType[] | null>(null)
    const [cpf, setcpf] = useState('');

    const handleSearchAllClient = async () => {
        const  searchedClientsList = await api.searchAllClient();
        if (typeof searchedClientsList === 'string') {
            setMessage(searchedClientsList);
            setMessageType('error');
        }else{
            setClientList(searchedClientsList)
        }

        setTimeout(() => {
            setMessage('');
        }, 1900);
    }

    useEffect(() => {
        handleSearchAllClient();
    });

    async function handleSearch() {
        if (cpf !== '') {
            const searchedClient = await api.searchByCpf(cpf);

            if (typeof searchedClient === 'string') {
                setMessage(searchedClient);
                setMessageType('error');
                setClient(null);
            } else {
                setClient(searchedClient);
                setMessage('');
            }
        } else {
            setMessageType('error');
            setMessage('Informe algum valor para a busca');
        }

        setTimeout(() => {
            setMessage('');
        }, 1900);
    }

    const handleDeleteClient = async () => {
        if (client && client.id) {
            const deleteMessage = await api.deleteClient(client.id);
            
            setMessageType('success');
            setMessage(deleteMessage);
            
            handleSearchAllClient();
            setClient(null)

            setTimeout(() => {
                setMessage('');
            }, 1900);
        }
    }

    const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
		setcpf(event.target.value);
	}

    const redirectTo = () => {navigate('/update-client')}

    return (
        <div className="list-client">
            <div className="search-container">
                <TextField 
                    id="outlined-search" 
                    placeholder='Digite um cpf'
                    type="search" 
                    size='small'
                    onChange={handleSearchInput}
                />
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleSearch}
                >
                    <FaSearch />
                </Button>
            </div>
            {message && (
                <Alert severity={messageType === 'error' ? "error" : "success"} variant="filled">
                    <AlertTitle>{messageType === 'error' ? "Erro" : "Sucesso"}</AlertTitle>
                    {message}
                </Alert>
            )}
            {client && (
                <div className="client">
                    <FaUserCircle />
                    <span>Nome: {client.name}</span>
                    <span>E-mail: {client.email}</span>
                    <span>CPF: {client.phone}</span>
                    <div className="icon-button">
                        <IconButton aria-label="delete" color="secondary" onClick={redirectTo} id='icons'>
                            <FaUserEdit />
                        </IconButton>
                        <IconButton aria-label="delete" color="secondary" onClick={handleDeleteClient} id='icons'>
                            <FaDeleteLeft />
                        </IconButton>
                    </div>
                </div>
            )}
            <hr />
            <table> 
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                    </tr>
                </thead>
                <tbody>
                    {clientList && clientList.length > 0 && (
                    clientList.map(client => (
                        <tr key={client.id} className="client-list">
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>{client.phone}</td>
                        </tr>
                    ))
                    )}
                </tbody>
            </table>
        </div>
    );
}