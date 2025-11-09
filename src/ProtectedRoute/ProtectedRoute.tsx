// ProtectedRoute.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext'; // Adjust the import path
import supabase from '../Supabase/Supabase'; // Adjust the import path

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles: string[]; // Specify allowed roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [userRole, setUserRole] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const getUserSession = async () => {
            if (user) {
                const { data } = await supabase
                    .from('users')
                    .select()
                    .eq('id', user.id)
                    .single(); // Assuming user IDs are unique

                if (data) {
                    setUserData(data);
                    if (data.is_admin) {
                        setUserRole('admin');
                    } else if (data.is_client) {
                        if(data.firstTimeUser){
                            setUserRole('first_time');
                        }else{
                            setUserRole('client');
                        }
                    } else if (data.is_trainer) {
                        setUserRole('trainer');
                    } else if (data.non_client) {
                        setUserRole('non_client');
                    }
                }

                setLoading(false); // Stop loading after fetching data
            }
        };

        getUserSession();
    }, [user]);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate('/');
            } else if (!allowedRoles?.includes(userRole)) {
                navigate('/unauthorized'); // Redirect if not authorized
            } else if (userRole) {
                if (userRole === 'admin') {
                    navigate('/dashboard/admin', { state: { userData } });
                } else if (userRole === 'trainer') {
                    navigate('/dashboard/trainer', { state: { userData } }); // Assuming a different path for trainers
                } else if(userRole === 'client'){
                    navigate('/dashboard/client/tasks');
                } else if (userRole === 'non_client'){
                    navigate('/verifyAccount');
                } else if (userRole === 'first_time'){
                    navigate('/firstTimeUser');
                }
            }
        }
    }, [loading, user, userRole, navigate, allowedRoles, userData]);

    return <>{children}</>; // Render the children if authorized
};

export default ProtectedRoute;
