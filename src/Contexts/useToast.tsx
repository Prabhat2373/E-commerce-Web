import { useContext } from 'react';
import { ToastContext } from '../features/Toast/ToastContext';

export const useToast = () => useContext(ToastContext);
