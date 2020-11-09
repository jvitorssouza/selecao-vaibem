import React from 'react';
import Header from './Header';
import { Container } from './styles';

const DashboardLayout: React.FC = ({ children }) => {
    return (
        <>
            <Header />
            <Container>{children}</Container>
        </>
    );
};

export default DashboardLayout;
