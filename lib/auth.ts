import "server-only";
import { createHmac, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
const COOKIE_NAME="hepra_session";
const SESSION_MAX_AGE=30*24*60*60;
function sessionDigest(token:string):string{
 const secret=process.env.SESSION_SECRET;
 if(!secret||secret.length<32)throw new Error("SESSION_SECRET must be configured with at least 32 characters.");
 return createHmac("sha256",secret).update(token).digest("hex");
}
export async function createSession(userId:string):Promise<void>{
 const token=randomBytes(32).toString("base64url");
 const tokenHash=sessionDigest(token);
 const expiresAt=new Date(Date.now()+SESSION_MAX_AGE*1000);
 await prisma.session.create({data:{tokenHash,userId,expiresAt}});
 const cookieStore=await cookies();
 cookieStore.set(COOKIE_NAME,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",expires:expiresAt});
}
export async function getCurrentUser(){
 const cookieStore=await cookies();
 const token=cookieStore.get(COOKIE_NAME)?.value;
 if(!token||token.length>100)return null;
 const tokenHash=sessionDigest(token);
 const session=await prisma.session.findUnique({where:{tokenHash},select:{expiresAt:true,user:{select:{id:true,name:true,email:true}}}});
 if(!session)return null;
 if(session.expiresAt.getTime()<=Date.now()){
  await prisma.session.deleteMany({where:{tokenHash}});
  cookieStore.delete(COOKIE_NAME);
  return null;
 }
 return session.user;
}
export async function requireUser(){
 const user=await getCurrentUser();
 if(!user)redirect("/login");
 return user;
}
export async function deleteCurrentSession():Promise<void>{
 const cookieStore=await cookies();
 const token=cookieStore.get(COOKIE_NAME)?.value;
 if(token&&token.length<=100)await prisma.session.deleteMany({where:{tokenHash:sessionDigest(token)}});
 cookieStore.delete(COOKIE_NAME);
}
