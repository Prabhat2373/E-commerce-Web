import React from 'react';
import { useTimeout } from '../hooks/useTimeout';
import { useSelector } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Toast = (props: { close: () => void; children: any }) => {
  // useTimeout(props.close, 5000);
  const show = useSelector((state: any) => state.toast.show);
  console.log('show', show);
  if (true) {
    return (
      <div className="toast bg-blue-400 rounded-lg flex items-center text-white">
        <div className="toast__text">{props.children}</div>
        <div>
          <button onClick={props.close} className="toast__close-btn">
            <XMarkIcon width={20} height={20} />
          </button>
        </div>
      </div>
    );
  }
};

export default Toast;
