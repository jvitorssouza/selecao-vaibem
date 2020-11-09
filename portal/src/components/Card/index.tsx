import React from 'react';

import { Container } from './styles';

interface Props {
    headerChildren?: React.ReactNode;
    headerClassname?: string;
}

const Card: React.FC<Props> = ({
    children,
    headerClassname,
    headerChildren,
}) => {
    return (
        <Container>
            {headerChildren && (
                <div className={headerClassname}>{headerChildren}</div>
            )}

            <div className="card-body">{children}</div>
        </Container>
    );
};

export default Card;
