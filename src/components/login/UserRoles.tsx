import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useAuth0 } from "@auth0/auth0-react"

var token;
var options = {
  method: 'POST',
  url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: `${process.env.REACT_APP_CLIENT_ID}`,
    client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
    audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`
  })
};

axios.request(options).then(function (response) {
  token = response;
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

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
    const userId = user?.sub.replace(/\|/g, '%7C');
    const fetchRoles = async () => {
      const options = {
        method: 'GET',
        url: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${userId}/roles`,

        headers: {
          Accept: `${token}`,
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
