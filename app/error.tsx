"use client";
import { useEffect } from "react";
export default function ErrorPage({error,reset}:{error:Error & {digest?:string};reset:()=>void}){
 useEffect(()=>{console.error("HEPRA page error",error);},[error]);
 return <main className="auth-main" style={{minHeight:"70vh"}}><section className="auth-card"><h2>Something went wrong</h2><p>We couldn't load this page. Try again, or return to the HEPRA homepage.</p><button className="btn btn-primary" onClick={()=>reset()}>Try again</button></section></main>;
}