import React from 'react';
import { useTimeout } from '../hooks/useTimeout';
import { useSelector } from 'react-redux';

const Toast = (props: { close: () => void; children: any }) => {
  useTimeout(props.close, 5000);
  const show = useSelector((state: any) => state.toast.show);
  console.log('show', show);
  if (true) {
    return (
      <div className="toast">
        <div className="toast__text">{props.children}</div>
        <div>
          <button onClick={props.close} className="toast__close-btn">
            x
          </button>
        </div>
      </div>
    );
  }
};

export default Toast;
