"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
export function ProductForm(){
 const [busy,setBusy]=useState(false);const [error,setError]=useState("");const router=useRouter();
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setBusy(true);setError("");
  const payload=Object.fromEntries(new FormData(event.currentTarget).entries());
  try{const response=await fetch("/api/products",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});const result=await response.json();if(!response.ok)throw new Error(result.error||"Unable to create product.");event.currentTarget.reset();router.refresh();}
  catch(err){setError(err instanceof Error?err.message:"Unable to create product.");}
  finally{setBusy(false);}
 }
 return <form onSubmit={submit}><div className="form-field"><label htmlFor="title">Product name</label><input id="title" name="title" placeholder="e.g. Everyday Tote Bag" required minLength={2} maxLength={120}/></div><div className="form-field"><label htmlFor="price">Price (₹)</label><input id="price" name="price" type="number" min="0.01" max="10000000" step="0.01" placeholder="999.00" required/></div><div className="form-field"><label htmlFor="inventory">Stock quantity</label><input id="inventory" name="inventory" type="number" min="0" max="1000000" step="1" defaultValue="10" required/></div><div className="form-field"><label htmlFor="imageUrl">Product image URL (optional)</label><input id="imageUrl" name="imageUrl" type="url" placeholder="https://example.com/product.jpg" maxLength={2048}/></div><div className="form-field"><label htmlFor="description">Description (optional)</label><textarea id="description" name="description" rows={3} maxLength={3000} placeholder="Tell customers what makes this product special." style={{width:"100%",border:"1px solid #ddd4e6",borderRadius:10,padding:13,resize:"vertical"}}/></div>{error&&<div className="form-error" role="alert">{error}</div>}<button className="btn btn-primary" type="submit" disabled={busy}>{busy?"Saving…":"Add product →"}</button></form>;
}