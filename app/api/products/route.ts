import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
export const runtime="nodejs";
const schema=z.object({title:z.string().trim().min(2).max(120),price:z.string().regex(/^\d{1,8}(\.\d{1,2})?$/,"Enter a valid price."),inventory:z.string().regex(/^\d{1,7}$/,"Enter a whole stock quantity."),description:z.string().max(3000).optional().default(""),imageUrl:z.union([z.literal(""),z.string().url().max(2048)]).optional().default("")});
function slugify(value:string){return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,48)||"product";}
export async function POST(request:Request){
 const user=await getCurrentUser();
 if(!user)return NextResponse.json({error:"Please log in to add products."},{status:401});
 const parsed=schema.safeParse(await request.json().catch(()=>null));
 if(!parsed.success)return NextResponse.json({error:"Check the product name, price, stock quantity and image URL."},{status:400});
 const membership=await prisma.membership.findFirst({where:{userId:user.id},include:{organization:{include:{stores:{orderBy:{createdAt:"asc"},take:1}}}}});
 const store=membership?.organization.stores[0];
 if(!store)return NextResponse.json({error:"Create a store before adding products."},{status:409});
 const data=parsed.data;const pricePaise=Math.round(Number(data.price)*100);
 if(!Number.isSafeInteger(pricePaise)||pricePaise<1)return NextResponse.json({error:"Price is outside the supported range."},{status:400});
 const product=await prisma.product.create({data:{storeId:store.id,title:data.title,slug:`${slugify(data.title)}-${randomUUID().slice(0,6)}`,pricePaise,inventory:Number(data.inventory),description:data.description||null,imageUrl:data.imageUrl||null,isActive:true}});
 return NextResponse.json({ok:true,productId:product.id},{status:201});
}