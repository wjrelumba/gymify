// AuthContext.js
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import supabase from '../Supabase/Supabase';

interface AuthContextType {
    user: any; // Replace 'any' with your user type
    setUser: (user: any) => void; // Replace 'any' with your user type
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }:any) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const setUserSession = async() => {
            const {data:{session}} = await supabase.auth.getSession();
            if(session){
                setUser(session.user || null);
            }
        }

        setUserSession();

        const { data: subscription } = supabase.auth.onAuthStateChange((_:any, session:any) => {
            setUser(session?.user || null);
        });

        return () => {
            subscription.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
