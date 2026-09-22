import React from 'react';
import RegistrationForm from '../_components/registrationform';

const RegisterPage = () => {
    return (
        <div>
              <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-gray-500">Register to start using RentNest</p>
        </div>
        <RegistrationForm />
      </div>
    </div>
        </div>
    );
};

export default RegisterPage;