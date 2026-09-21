"use client"

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginAction } from '../_actions/authAction';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

const LoginForm = () => {

  const [state,action,pending] = useActionState(loginAction,null)
 
 useEffect(()=>{
  if(!state) return;
  if(state.success){
   toast.success(state.message || "Login successful")
  }
  if(!state.success){
    toast.error(state.message || "Login failed")
  }
 },[state])
 
 
 
  return (
    <form action={action} className="space-y-4"> 
      <Card className="p-6 space-y-4">
        <Input name="email" type="email" placeholder="Enter Your Email" required />
        <Input name="password" type="password" placeholder="Enter Your Password" required />
        
     
        <Button type="submit" className="w-full">
          {pending? "submitting..." : "Login"}
        </Button>
      </Card>
    </form>
  );
};

export default LoginForm;