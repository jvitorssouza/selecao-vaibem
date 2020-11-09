import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { IoIosArrowBack, IoIosSave } from 'react-icons/io';
import { IRouteParams } from '~/util/interfaces/RouteParams';

import { Button } from '~/components/Button';
import {
    documentMask,
    phoneNumberMask,
    unmask,
    zipCodeMask,
} from '~/util/Functions/Auxiliar';

import useUser from '~/util/Hooks/UseUser';
import { IViaCepResponse } from '~/util/interfaces/ViaCepResponse';
import { ViaCepService } from '~/util/Services/ViaCep';
import { EstablishmentService } from '../Services';

// import { Container } from './styles';

const buttonsStyle: React.CSSProperties = {
    float: 'right',
    padding: '3% 0',
    fontSize: '0.9rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const EstablishmentsForm: React.FC = () => {
    const { addToast } = useToasts();
    const history = useHistory();
    const { user } = useUser();

    const { id } = useParams<IRouteParams>();

    const [document, setDocument] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [tradeName, setTradeName] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');
    const [addressStreet, setAddressStreet] = useState<string>('');
    const [addressNumber, setAddressNumber] = useState<string>('');
    const [complement, setComplement] = useState<string>('');
    const [neighboorhood, setNeighboorhood] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [status, setStatus] = useState<string>('true');

    useEffect(() => {
        if (id) {
            EstablishmentService.getOne(parseInt(id)).then(({ data }) => {
                setDocument(documentMask(data?.document));
                setCompanyName(data?.companyName);
                setTradeName(data?.tradeName);
                setZipCode(zipCodeMask(data?.zipCode));
                setAddressStreet(data?.addressStreet);
                setAddressNumber(data?.addressNumber);
                setComplement(data?.complement);
                setNeighboorhood(data?.neighboorhood);
                setCity(data?.city);
                setState(data?.state);
                setPhoneNumber(phoneNumberMask(data?.phoneNumber));
                setEmail(data?.email);
                setStatus(data?.status);
            });
        }
    }, [id]);

    const handleUpdateAddressFieldsByZipCode = (address: IViaCepResponse) => {
        setAddressStreet(address?.logradouro);
        setNeighboorhood(address?.bairro);
        setCity(address?.localidade);
        setState(address?.uf);
    };

    const fnOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        try {
            const data = {
                document: unmask(document),
                companyName,
                tradeName,
                zipCode: unmask(zipCode),
                addressStreet,
                addressNumber,
                complement,
                neighboorhood,
                city,
                state,
                phoneNumber: unmask(phoneNumber),
                email,
                ownerUserId: user.id,
                status: status === 'true' ? true : false,
            };

            if (id) {
                EstablishmentService.update(
                    parseInt(id),
                    {
                        id: parseInt(id),
                        ...data,
                    },
                    () => {
                        addToast('Estabelecimento atualizado com sucesso!', {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                    }
                );
            } else {
                EstablishmentService.create(data, () => {
                    addToast('Estabelecimento criado com sucesso!', {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                });
            }

            history.push('/establishments');
        } catch (error) {}
    };

    return (
        <>
            <Form onSubmit={fnOnSubmit}>
                <Row style={{ alignItems: 'flex-end' }}>
                    <Col sm={2}>
                        <Form.Group>
                            <Form.Label> CNPJ </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: 12.345.678/0001-99"
                                onChange={({ target }) => {
                                    setDocument(documentMask(target.value));
                                }}
                                value={document}
                                required
                                maxLength={18}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row style={{ alignItems: 'flex-end' }}>
                    <Col sm={6}>
                        <Form.Group>
                            <Form.Label> Razão Social </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: VS Software Development Solutions LTDA"
                                onChange={({ target }) => {
                                    setCompanyName(target.value);
                                }}
                                value={companyName}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={6}>
                        <Form.Group>
                            <Form.Label> Nome Fantasia </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: VS Desenvolvimento de Softwares"
                                onChange={({ target }) => {
                                    setTradeName(target.value);
                                }}
                                value={tradeName}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row style={{ alignItems: 'flex-end' }}>
                    <Col sm={2}>
                        <Form.Group>
                            <Form.Label> CEP </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: 69250-460"
                                onChange={({ target }) => {
                                    setZipCode(zipCodeMask(target.value));
                                }}
                                onBlur={() =>
                                    ViaCepService.getAddressByCep(
                                        zipCode,
                                        handleUpdateAddressFieldsByZipCode
                                    )
                                }
                                value={zipCode}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={4}>
                        <Form.Group>
                            <Form.Label> Logradouro </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: Rua Mário Albert"
                                onChange={({ target }) => {
                                    setAddressStreet(target.value);
                                }}
                                value={addressStreet}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label> Número </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: 2140"
                                onChange={({ target }) => {
                                    setAddressNumber(target.value);
                                }}
                                value={addressNumber}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label> Complemento </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: Casa B - Altos"
                                onChange={({ target }) => {
                                    setComplement(target.value);
                                }}
                                value={complement}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row style={{ alignItems: 'flex-end' }}>
                    <Col sm={6}>
                        <Form.Group>
                            <Form.Label> Bairro </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: Jereissati I"
                                onChange={({ target }) => {
                                    setNeighboorhood(target.value);
                                }}
                                value={neighboorhood}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label> Cidade </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: Maracanaú"
                                onChange={({ target }) => {
                                    setCity(target.value);
                                }}
                                value={city}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label> Estado </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: CE"
                                onChange={({ target }) => {
                                    setState(target.value);
                                }}
                                value={state}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row style={{ alignItems: 'flex-end' }}>
                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label> Telefone </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex: (85) 99999-9999"
                                onChange={({ target }) => {
                                    setPhoneNumber(
                                        phoneNumberMask(target.value)
                                    );
                                }}
                                value={phoneNumber}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={3}>
                        <Form.Group>
                            <Form.Label> Email </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ex: meuemail@email.com"
                                onChange={({ target }) => {
                                    setEmail(target.value);
                                }}
                                value={email}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col sm={6}>
                        <Form.Group>
                            <Form.Label> Status </Form.Label>
                            <Form.Control
                                as="select"
                                placeholder="Ex: Tag de Exemplo"
                                onChange={({ target }) => {
                                    setStatus(target.value);
                                }}
                                value={status}
                                required
                            >
                                <option value="true"> Ativo </option>
                                <option value="false"> Inativo </option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={8} />
                    <Col md={2}>
                        <Link to="/establishments">
                            <Button color="danger" style={buttonsStyle}>
                                <IoIosArrowBack
                                    style={{ marginRight: '10px' }}
                                />{' '}
                                Cancelar
                            </Button>
                        </Link>
                    </Col>
                    <Col md={2}>
                        <Button
                            color="success"
                            type="submit"
                            style={buttonsStyle}
                        >
                            <IoIosSave style={{ marginRight: '10px' }} /> Salvar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default EstablishmentsForm;
