import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Chart from 'react-google-charts';
import { format, parseISO } from 'date-fns';

import { Api } from '~/configs/Api';

import { Container } from './styles';

const Home: React.FC = () => {
    const [daily, setDaily] = useState<any[][]>([]);
    const [agents, setAgents] = useState<any[][]>([]);
    const [clients, setClients] = useState<any[][]>([]);
    const [tags, setTags] = useState<any[][]>([]);

    useEffect(() => {
        Api.get(`reports`).then(({ data }: AxiosResponse) => {
            const auxDaily = data?.daily.map((item: any) => {
                return [
                    format(parseISO(item.created_at), 'dd/MM/yyyy'),
                    parseInt(item.count),
                ];
            });

            const auxClients = data?.dataClients.map((item: any) => {
                return [item.name, parseInt(item.count)];
            });

            const auxTags = data?.dataTags.map((item: any) => {
                return [item.name, parseInt(item.count)];
            });

            const auxAgents = data?.dataAgents.map((item: any) => {
                return [item.name, parseInt(item.count)];
            });

            console.log('auxDaily', auxDaily);

            setDaily(auxDaily);
            setClients(auxClients);
            setTags(auxTags);
            setAgents(auxAgents);
        });
    }, []);

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <label>
                        Abertura diária de tickets nos últimos 30 dias.
                    </label>
                    <Chart
                        height="400px"
                        chartType="LineChart"
                        loader={<div>Carregando</div>}
                        data={[['Dia', 'Quantidade'], ...daily]}
                        options={{
                            chartArea: { width: '100%' },
                            colors: ['red', 'yellow', 'blue'],
                        }}
                        legendToggle
                    />
                </Col>

                <Col md={6}>
                    <label>
                        Top 10 de clientes que mais abriram tickets nos últimos
                        30 dias.
                    </label>
                    <Chart
                        height="400px"
                        chartType="Bar"
                        loader={<div>Carregando</div>}
                        data={[['Cliente', 'Quantidade'], ...clients]}
                        options={{
                            chartArea: { width: '100%' },
                        }}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <label>
                        {' '}
                        Top 10 de TAGS solicitadas para atendimento nos últimos
                        30 dias.{' '}
                    </label>
                    <Chart
                        height="400px"
                        chartType="Bar"
                        loader={<div>Carregando</div>}
                        data={[['Tag', 'Quantidade'], ...tags]}
                        options={{
                            chartArea: { width: '100%' },
                        }}
                        legendToggle
                    />
                </Col>

                <Col md={6}>
                    <label>
                        Top 10 dos agentes que mais atenderam nos últimos 30
                        dias.
                    </label>
                    <Chart
                        height="400px"
                        chartType="Bar"
                        loader={<div>Carregando</div>}
                        data={[['Cliente', 'Quantidade'], ...agents]}
                        options={{
                            chartArea: { width: '100%' },
                        }}
                        legendToggle
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
