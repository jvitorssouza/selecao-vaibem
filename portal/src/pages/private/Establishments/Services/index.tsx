import React from 'react';
import { AxiosResponse } from 'axios';
import { Pagination } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

import { Api } from '~/configs/Api';
import { IEstablishments } from '../interfaces/Establishments';

export const EstablishmentService = {
    getAll: async (
        perPage: number,
        setEstablishments: React.Dispatch<
            React.SetStateAction<IEstablishments[]>
        >,
        totalPages: number,
        setTotalPages: React.Dispatch<React.SetStateAction<number>>,
        atualPage: number,
        setAtualPage: React.Dispatch<React.SetStateAction<number>>,
        setPages: React.Dispatch<React.SetStateAction<React.ReactNode[]>>,
        setLoading: React.Dispatch<boolean>
    ) => {
        setLoading(true);

        Api.get(`establishments?page=${atualPage}&limit=${perPage}`).then(
            ({ data }: AxiosResponse) => {
                setEstablishments(data[0]);

                let aux = [];

                setTotalPages(Math.ceil(data[1] / perPage));

                for (let i = 0; i < totalPages; i++) {
                    aux.push(
                        <Pagination.Item
                            active={atualPage === i + 1}
                            onClick={() => setAtualPage(i + 1)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    );
                }

                setPages(aux);
                setLoading(false);
            }
        );
    },
    getOne: async (id: number) => {
        return Api.get(`establishments/${id}`);
    },
    update: (id: number, data: any, callback: Function) => {
        Api.patch(`establishments/${id}`, data).then(
            ({ data }: AxiosResponse) => {
                callback();
            }
        );
    },
    create: (data: any, callback: Function) => {
        Api.post(`establishments`, data).then(({ data }: AxiosResponse) => {
            callback();
        });
    },
    handleDelete: (id: number, handleSearch: Function) => {
        confirmAlert({
            title: 'Desejas realmente deletar este registro ?',
            message: 'Esta ação não poderá ser desfeita.',
            buttons: [
                {
                    label: 'Não',
                    className: 'btn-secondary',
                    onClick: () => {},
                },
                {
                    label: 'Sim',
                    className: 'btn-danger',
                    onClick: () => {
                        Api.delete(`establishments/${id}`).then(() => {
                            handleSearch();
                        });
                    },
                },
            ],
        });
    },
};
