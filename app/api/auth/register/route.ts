import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";
export const runtime = "nodejs";
const schema=z.object({name:z.string().trim().min(2).max(80),email:z.string().trim().email().max(254).transform(v=>v.toLowerCase()),password:z.string().min(10).max(128),storeName:z.string().trim().min(2).max(80)});
function slugify(value:string){return value.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,48)||"my-store";}
export async function POST(request:Request){
 const input=schema.safeParse(await request.json().catch(()=>null));
 if(!input.success)return NextResponse.json({error:"Enter a valid name, email, store name and a password of at least 10 characters."},{status:400});
 const {name,email,password,storeName}=input.data;
 if(await prisma.user.findUnique({where:{email},select:{id:true}}))return NextResponse.json({error:"An account with this email already exists. Try logging in."},{status:409});
 try{
  const passwordHash=await hash(password,12); const base=slugify(storeName);
  const user=await prisma.$transaction(async tx=>{
   const created=await tx.user.create({data:{name,email,passwordHash}});
   const organization=await tx.organization.create({data:{name:storeName,slug:`${base}-${randomUUID().slice(0,6)}`}});
   await tx.membership.create({data:{userId:created.id,organizationId:organization.id,role:"OWNER"}});
   await tx.store.create({data:{organizationId:organization.id,name:storeName,slug:`${base}-${randomUUID().slice(0,6)}`,description:`Welcome to ${storeName}`,status:"DRAFT",themeConfig:{version:1,primaryColor:"#400378",font:"Manrope"}}});
   return created;
  });
  await createSession(user.id); return NextResponse.json({ok:true},{status:201});
 }catch(error){console.error("Registration failed",error);return NextResponse.json({error:"We could not create your account. Check database setup and try again."},{status:500});}
}