"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { registerAction } from "../_actions/authAction";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const [role, setRole] = useState<"tenant" | "landlord">("tenant");
  const [state, action, pending] = useActionState(registerAction, null);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Registration successful");
      
   
      router.refresh(); 

      router.push(`/dashboard/${role}`);


    } else {
      toast.error(state.message || "Registration failed");
    }
  }, [state, router, role]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-6 space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRole("tenant")}
            className={`flex-1 rounded-md border py-2 text-sm font-medium ${
              role === "tenant" ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            Tenant
          </button>
          <button
            type="button"
            onClick={() => setRole("landlord")}
            className={`flex-1 rounded-md border py-2 text-sm font-medium ${
              role === "landlord" ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            Landlord
          </button>
        </div>

        <input type="hidden" name="role" value={role} />

        <Input name="name" type="text" placeholder="Enter Your Name" required />
        <Input name="email" type="email" placeholder="Enter Your Email" required />
        <Input name="password" type="password" placeholder="Enter Your Password" required />

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Submitting..." : "Register"}
        </Button>
      </Card>
    </form>
  );
};

export default RegistrationForm;