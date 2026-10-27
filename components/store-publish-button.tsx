"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function StorePublishButton({storeId,status}:{storeId:string;status:"DRAFT"|"ACTIVE"|"SUSPENDED"}){
 const [busy,setBusy]=useState(false);const [error,setError]=useState("");const router=useRouter();
 async function publish(){
  setBusy(true);setError("");
  try{
   const response=await fetch("/api/store/publish",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId})});
   const result=await response.json();
   if(!response.ok)throw new Error(result.error||"Unable to publish your store.");
   router.refresh();
  }catch(err){setError(err instanceof Error?err.message:"Unable to publish your store.");}
  finally{setBusy(false);}
 }
 if(status==="ACTIVE")return <span className="pill">Live storefront</span>;
 if(status==="SUSPENDED")return <span className="pill" style={{background:"#fff1f0",color:"#b42318"}}>Store suspended</span>;
 return <div style={{display:"grid",gap:8,justifyItems:"start"}}><button className="btn btn-primary" onClick={publish} disabled={busy}>{busy?"Publishing…":"Publish storefront →"}</button>{error&&<p className="form-error" role="alert">{error}</p>}</div>;
}
