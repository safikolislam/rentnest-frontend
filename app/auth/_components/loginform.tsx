"use client"

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginAction } from '../_actions/authAction';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const LoginForm = () => {

  const [state,action,pending] = useActionState(loginAction,null)
const router = useRouter()
 useEffect(()=>{
  if(!state) return;
  if(state.success){
   toast.success(state.message || "Login successful");
   router.refresh();
   router.push("/")
   
 
  }
  if(!state.success){
    toast.error(state.message || "Login failed")
  }
 },[state,router])
 
 
 
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