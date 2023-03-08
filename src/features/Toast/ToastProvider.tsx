import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { ToastContext } from './ToastContext';
import Toast from '../../components/Toast';

// Create a random ID
function generateUEID() {
  let first: any = (Math.random() * 46656) | 0;
  let second: any = (Math.random() * 46656) | 0;
  first = ('000' + first.toString(36)).slice(-3);
  second = ('000' + second.toString(36)).slice(-3);

  return first + second;
}

export const ToastProvider = (props: any) => {
  const [toasts, setToasts] = useState<any>([]);
  const open = (content: any) =>
    setToasts((currentToasts: any) => [
      ...currentToasts,
      { id: generateUEID(), content },
    ]);
  const close = (id: any) =>
    setToasts((currentToasts: any) =>
      currentToasts.filter((toast: any) => toast.id !== id)
    );
  const contextValue = useMemo(() => ({ open }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}

      {createPortal(
        <div className="toasts-wrapper">
          {toasts.map(
            (toast: { id: React.Key | null | undefined; content: any }) => (
              <Toast key={toast.id} close={() => close(toast.id)}>
                {toast.content}
              </Toast>
            )
          )}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
