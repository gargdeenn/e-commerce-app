import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface GuardProps {
  children: ReactNode;
  allowedRoles: number[]; // Agrega una propiedad para los roles permitidos
}

const Guard: React.FC<GuardProps> = ({ children, allowedRoles }) => {
  const router = useRouter();

  const isLoggedIn = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const hasPermission = (user: any) => {
    if (!allowedRoles || !Array.isArray(allowedRoles)) return false;
    if (!user || !user.id_role) return false;
    return allowedRoles.includes(user.id_role);
  };

  useEffect(() => {
    const user = isLoggedIn();
    if (!user || !hasPermission(user)) {
      // Si el usuario no está autenticado o no tiene los permisos necesarios, redirige a la página de inicio de sesión
      router.push('/login');
    }
  }, [allowedRoles]);

  return <>{children}</>;
};

export default Guard;
