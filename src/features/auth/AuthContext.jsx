import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      }
    }
    setLoading(false);
  }, []);

  // Load users from localStorage with sample users
  const loadUsers = () => {
    const users = localStorage.getItem('users');
    const existingUsers = users ? JSON.parse(users) : [];
    
    // Add sample users if none exist
    if (existingUsers.length === 0) {
      const sampleUsers = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          role: 'user',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: 'securepass123',
          role: 'user',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('users', JSON.stringify(sampleUsers));
      return sampleUsers;
    }
    return existingUsers;
  };

  // Signup function
  const signup = async (userData) => {
    try {
      const users = loadUsers();
      const existingUser = users.find(user => user.email === userData.email);
      
      if (existingUser) {
        return { success: false, message: 'Email already exists' };
      }

      const newUser = {
        id: Date.now().toString(),
        ...userData
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Signup failed' };
    }
  };

  // Login function
  const updateProfile = async (updatedData) => {
    try {
      if (!currentUser) {
        throw new Error('No user is currently logged in');
      }

      // Get all users from localStorage
      const users = localStorage.getItem('users');
      const existingUsers = users ? JSON.parse(users) : [];

      // Find the current user and update their data
      const updatedUsers = existingUsers.map(user => 
        user.id === currentUser.id 
          ? { ...user, ...updatedData }
          : user
      );

      // Save updated users back to localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Update current user state
      const updatedCurrentUser = updatedUsers.find(user => user.id === currentUser.id);
      setCurrentUser(updatedCurrentUser);

      // Update currentUser in localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));

      return updatedCurrentUser;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const users = loadUsers();
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        return { success: false, message: 'Invalid credentials' };
      }

      setCurrentUser(user);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    signup,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
