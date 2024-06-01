// components/Guard.tsx
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface GuardProps {
  children: ReactNode;
}

const Guard: React.FC<GuardProps> = ({ children }) => {
  const router = useRouter();

  // Verificar si el usuario está autenticado
  const isLoggedIn = () => {
    const token = localStorage.getItem('authToken'); // Obtener el token de acceso desde el almacenamiento local
    return token ? true : false;
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
};

export default Guard;
