"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
function AuthForm({ register = false }: { register?: boolean }) {
 const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const router=useRouter();
 async function submit(event:FormEvent<HTMLFormElement>) {
  event.preventDefault(); setBusy(true); setError("");
  const payload=Object.fromEntries(new FormData(event.currentTarget).entries());
  try { const response=await fetch(register?"/api/auth/register":"/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}); const result=await response.json(); if(!response.ok) throw new Error(result.error||"Something went wrong."); router.push("/dashboard"); router.refresh(); }
  catch(err){setError(err instanceof Error?err.message:"Unable to continue.");} finally{setBusy(false);}
 }
 return <form onSubmit={submit}>{register&&<div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" placeholder="e.g. Ravi Kumar" required maxLength={80}/></div>}<div className="form-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@business.com" required maxLength={254}/></div><div className="form-field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete={register?"new-password":"current-password"} minLength={10} placeholder="At least 10 characters" required/></div>{register&&<div className="form-field"><label htmlFor="storeName">Business / store name</label><input id="storeName" name="storeName" autoComplete="organization" placeholder="e.g. The Modern Store" required maxLength={80}/></div>}{error&&<div className="form-error" role="alert">{error}</div>}<button className="btn btn-primary auth-submit" type="submit" disabled={busy}>{busy?"Please wait…":register?"Create account →":"Log in →"}</button>{register&&<p style={{fontSize:10,color:"var(--muted)",lineHeight:1.7,marginTop:12}}>Please review the final Terms and Privacy Policy before public launch.</p>}</form>;
}
export function LoginForm(){return <AuthForm/>}
export function RegisterForm(){return <AuthForm register/>}