import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";
export const runtime="nodejs";
const schema=z.object({email:z.string().trim().email().max(254).transform(v=>v.toLowerCase()),password:z.string().min(1).max(128)});
export async function POST(request:Request){
 const input=schema.safeParse(await request.json().catch(()=>null));
 if(!input.success)return NextResponse.json({error:"Enter a valid email and password."},{status:400});
 const user=await prisma.user.findUnique({where:{email:input.data.email}});
 if(!user||!(await compare(input.data.password,user.passwordHash)))return NextResponse.json({error:"Email or password is incorrect."},{status:401});
 try{await createSession(user.id);return NextResponse.json({ok:true});}
 catch(error){console.error("Login session creation failed",error);return NextResponse.json({error:"Unable to start a session. Check server configuration."},{status:500});}
}