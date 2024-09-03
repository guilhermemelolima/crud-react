import { Button, TextField, Alert, AlertTitle } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { ClientType } from '../types/ClientType';

type FormProps = {
    title: string;
    onSubmit: (client: ClientType) => Promise<string | boolean>;
    initialValues?: ClientType | null;
};

export const FormClient = ({ title, onSubmit, initialValues }: FormProps) => {
    const [formData, setFormData] = useState<ClientType>({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        ...initialValues, 
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>();

    useEffect(() => {
        if (initialValues) {
            setFormData(initialValues); 
        }
    }, [initialValues]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = async () => {
        if (Object.values(formData).some(value => value === '')) {
            setMessage('Todos os campos devem estar preenchidos');
            setMessageType('error');
            return;
        }

        const response = await onSubmit(formData);
        if (typeof response === 'string') {
            setMessage(response);
            setMessageType('error');
        } else {
            setMessageType('success')
            setMessage('Operação realizada')
            setFormData({ name: '', email: '', cpf: '', phone: '' });
        }

        setTimeout(() => setMessage(''), 1900);
    };

    return (
        <div className='form-container'>
            <form className='form-client'>
                <h1>{title}</h1>
                <TextField
                    required
                    id="name"
                    label="Nome"
                    onChange={handleChange}
                    value={formData.name}
                    size="medium"
                />
                <TextField
                    required
                    id="email"
                    label="Email"
                    onChange={handleChange}
                    value={formData.email}
                    size="medium"
                    type="email"
                />
                <TextField
                    required
                    id="cpf"
                    label="CPF"
                    onChange={handleChange}
                    value={formData.cpf}
                    size="medium"
                    type="number"
                />
                <TextField
                    required
                    id="phone"
                    label="Telefone"
                    onChange={handleChange}
                    value={formData.phone}
                    size="medium"
                    type="number"
                />
                <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    endIcon={<FaSave />}
                    onClick={handleSubmit}
                >
                    Salvar
                </Button>
                {message && (
                    <Alert severity={messageType} variant="filled">
                        <AlertTitle>{messageType === 'error' ? 'Erro' : 'Sucesso'}</AlertTitle>
                        {message}
                    </Alert>
                )}
            </form>
        </div>
    );
};
