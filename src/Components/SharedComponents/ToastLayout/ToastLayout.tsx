import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastLayoutProps {
  children: ReactNode;
}

const ToastLayout = ({ children }: ToastLayoutProps) => (
  <div>
    {children}
    <ToastContainer />
  </div>
);

export default ToastLayout;