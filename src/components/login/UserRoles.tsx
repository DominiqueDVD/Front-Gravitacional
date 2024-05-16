import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useAuth0 } from "@auth0/auth0-react"

interface Role {
  id: string;
  name: string;
  description: string;
}

interface UserRolesProps {
  userId: string;
  token: string;
}

const UserRoles: React.FC<UserRolesProps> = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const fetchRoles = async () => {
      const options = {
        method: 'GET',
        url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user?.sub}/roles`,

        headers: {
          authorization: `Bearer ${process.env.REACT_APP_AUTH0_ROLES_DOMAIN}`,
        },
      };
      try {
        const response = await axios.request<Role[]>(options);
        setRoles(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          // El error es un error de Axios
          setError(err.response?.data?.message || err.message);
        } else if (err instanceof Error) {
          // El error es una instancia de Error
          setError(err.message);
        } else {
          // Error desconocido
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Roles</h2>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            <strong>{role.name}</strong>: {role.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRoles;
