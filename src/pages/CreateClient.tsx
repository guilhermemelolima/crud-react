import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { ChangeEvent, useState } from 'react';
import { FaSave, FaUserCircle  } from 'react-icons/fa';
import "./CreateClient.css"
import { useApi } from '../hooks/UseApi';
import { ClientType } from '../types/ClientType';

export const CreateUser = () => {

    const api = useApi();
    
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [fone, setFone] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>, setField: (value: string) => void) => {
        setField(event.target.value);
    };
    
    const handleSaveClient = async () =>{
        if(nome !== '' && email !== '' && cpf !== '' && fone !== '' ){
            
            const newClient: ClientType = {
                name: nome,
                email: email,
                cpf: cpf,
                phone: fone
            }

            const savedClient = await api.saveClient(newClient);

            if (typeof savedClient === 'string') {
                setMessage(savedClient);
                setMessageType('error');
            } else {
                setMessage('Cadastro realizado com sucesso!');
                setMessageType('success');
            }
            
        }else{
            setMessage('Todos os campos devem estar preenchidos')            
            setMessageType('error');
        }

        setNome('')
        setEmail('')
        setCpf('')
        setFone('')

        setTimeout(() => {
            setMessage('');
        }, 1900); 
    }

    return (
        <div className='form-container'>
        <form className='form-client'> 
            <h1>Cadastro de cliente <FaUserCircle /> </h1>
            <TextField
                required  
                id="nome" 
                label="Nome" 
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, setNome)}
                value={nome}
                size="medium"
            />
            <TextField
                required  
                id="email" 
                label="E-mail" 
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, setEmail)}
                value={email}
                size="medium"
            />
            <TextField
                required  
                id="cpf" 
                label="CPF" 
                size="medium"
                placeholder="Digite apenas números"
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, setCpf)}
                value={cpf}
                type="number"
            />
            <TextField
                required  
                id="fone" 
                label="Telefone" 
                placeholder="Digite apenas números"
                size="medium"
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, setFone)}
                value={fone}
                type="number"
            />
            <Button 
                variant="contained" 
                color="secondary" 
                size="medium"
                endIcon={<FaSave/>}
                onClick={handleSaveClient}
            >
                Salvar
            </Button>
            {message && (
                <Alert severity={messageType} variant="filled">
                    <AlertTitle>{messageType === 'error' ? "Erro" : "Sucesso"}</AlertTitle>
                    {message}
                </Alert>
            )}
        </form>
    </div>
    );
}