import React, { useCallback, useEffect, useState } from 'react';

import { Row, Col, Table, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import { MdEdit } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { BiAddToQueue, BiRefresh } from 'react-icons/bi';

import Loading from '~/components/Loading';
import { Button } from '~/components/Button';

import { Container } from './styles';
import { IEstablishments } from '../interfaces/Establishments';
import { EstablishmentService } from '../Services';

const buttonsStyle: React.CSSProperties = {
    float: 'right',
    padding: '3% 0',
    fontSize: '0.9rem',
};

const actionsButtonsStyle: React.CSSProperties = {
    marginRight: '10px',
    marginTop: isMobile ? '10px' : '',
};

const EstablishmentsList: React.FC = () => {
    const [establishments, setEstablishments] = useState<IEstablishments[]>([]);

    // Pagination States
    const [perPage] = useState<number>(10);
    const [atualPage, setAtualPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pages, setPages] = useState<React.ReactNode[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = useCallback(() => {
        setLoading(true);

        EstablishmentService.getAll(
            perPage,
            setEstablishments,
            totalPages,
            setTotalPages,
            atualPage,
            setAtualPage,
            setPages,
            setLoading
        );
    }, [atualPage, perPage, totalPages]);

    useEffect(() => {
        handleSearch();
    }, [atualPage, perPage, totalPages, handleSearch]);

    return (
        <Container>
            {loading && <Loading />}

            {!loading && (
                <>
                    <Row>
                        <Col md={8} />
                        <Col md={2}>
                            <Button
                                color="primary"
                                style={buttonsStyle}
                                onClick={() => handleSearch()}
                            >
                                <BiRefresh size={20} /> Atualizar Dados
                            </Button>
                        </Col>
                        <Col md={2}>
                            <Link to="establishments/create">
                                <Button color="primary" style={buttonsStyle}>
                                    <BiAddToQueue size={20} /> Novo
                                    Estabelecimento
                                </Button>
                            </Link>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Table
                                striped
                                bordered
                                hover
                                responsive
                                style={{ fontSize: 14 }}
                            >
                                <thead>
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th>CNPJ</th>
                                        <th>Razão Social</th>
                                        <th>Fantasia</th>
                                        <th>Telefone</th>
                                        <th>Endereço</th>
                                        <th colSpan={1} className="text-center">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {establishments.map(
                                        (
                                            item: IEstablishments,
                                            index: number
                                        ) => (
                                            <tr>
                                                <td className="text-center">
                                                    {item.id}
                                                </td>

                                                <td>{item.document}</td>

                                                <td>{item.companyName}</td>

                                                <td>{item.tradeName}</td>

                                                <td>{item.phoneNumber}</td>

                                                <td>
                                                    {item.addressStreet},{' '}
                                                    {item.addressNumber}{' '}
                                                    {item.complement
                                                        ? `, ${item.complement}`
                                                        : ''}{' '}
                                                    , {item.neighboorhood},{' '}
                                                    {item.city}/{item.state} -{' '}
                                                    {item.zipCode}
                                                </td>

                                                <td className="text-center">
                                                    <Link
                                                        to={`establishments/edit/${item.id}`}
                                                    >
                                                        <Button
                                                            color="warning"
                                                            size={
                                                                isMobile
                                                                    ? 100
                                                                    : 50
                                                            }
                                                            applyMargin={false}
                                                            style={
                                                                actionsButtonsStyle
                                                            }
                                                        >
                                                            <MdEdit />
                                                        </Button>
                                                    </Link>

                                                    <Button
                                                        color="danger"
                                                        size={
                                                            isMobile ? 100 : 50
                                                        }
                                                        applyMargin={false}
                                                        style={
                                                            actionsButtonsStyle
                                                        }
                                                        onClick={() =>
                                                            EstablishmentService.handleDelete(
                                                                item.id,
                                                                handleSearch
                                                            )
                                                        }
                                                    >
                                                        <FaTrashAlt />
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </Table>

                            <Pagination style={{ float: 'right' }}>
                                <Pagination.Prev
                                    onClick={() => setAtualPage(atualPage - 1)}
                                    disabled={atualPage === 1}
                                />

                                {pages.map((item: any) => item)}

                                <Pagination.Next
                                    onClick={() => setAtualPage(atualPage + 1)}
                                    disabled={atualPage === totalPages}
                                />
                            </Pagination>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default EstablishmentsList;
