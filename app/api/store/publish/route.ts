import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
export const runtime="nodejs";
const schema=z.object({storeId:z.string().min(1).max(100)});
export async function POST(request:Request){
 const user=await getCurrentUser();
 if(!user)return NextResponse.json({error:"Please log in to publish your store."},{status:401});
 const input=schema.safeParse(await request.json().catch(()=>null));
 if(!input.success)return NextResponse.json({error:"Select a valid store."},{status:400});
 const membership=await prisma.membership.findFirst({where:{userId:user.id,role:{in:["OWNER","ADMIN"]}},include:{organization:{include:{stores:{where:{id:input.data.storeId},take:1}}}}});
 const store=membership?.organization.stores[0];
 if(!membership||!store)return NextResponse.json({error:"You do not have permission to publish this store."},{status:403});
 if(store.status==="SUSPENDED")return NextResponse.json({error:"A suspended store cannot be published. Contact support."},{status:409});
 if(store.status!=="ACTIVE"){
  await prisma.store.update({where:{id:store.id},data:{status:"ACTIVE"}});
  await prisma.auditLog.create({data:{organizationId:membership.organizationId,actorUserId:user.id,action:"STORE_PUBLISHED",entityType:"Store",entityId:store.id,metadata:{slug:store.slug}}});
 }
 return NextResponse.json({ok:true,slug:store.slug,status:"ACTIVE"});
}
