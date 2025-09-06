'use client';

import { ReactNode } from 'react';

interface ScrollableContainerProps {
    children: ReactNode;
    label?: string;
    maxHeight?: string;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
    children,
    label,
    maxHeight = '80vh'
}) => {
    return (
        <div className="scrollable-wrapper">
            {label && <div className="label">{label}</div>}
            <div className="scrollable-content">
                {children}
            </div>
        </div>
    );
};

export default ScrollableContainer;