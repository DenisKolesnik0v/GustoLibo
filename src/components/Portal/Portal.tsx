import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

interface PortalProps {
    children: ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
    const portalRoot = document.getElementById('portal-root');

    if (!portalRoot) {
        return null;
    }

    return createPortal(children, portalRoot);
};
