import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
async function main(){const plans=[{name:"Starter",slug:"starter",pricePaise:29900,maxProducts:50,maxStaff:1,customDomain:false},{name:"Growth",slug:"growth",pricePaise:69900,maxProducts:500,maxStaff:5,customDomain:true},{name:"Business",slug:"business",pricePaise:149900,maxProducts:5000,maxStaff:20,customDomain:true}];for(const plan of plans)await prisma.plan.upsert({where:{slug:plan.slug},update:plan,create:plan});console.log("HEPRA plans seeded.");}
main().finally(async()=>prisma.$disconnect());