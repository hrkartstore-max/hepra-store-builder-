import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
export const dynamic="force-dynamic";
function money(paise:number,currency:string){return new Intl.NumberFormat("en-IN",{style:"currency",currency,maximumFractionDigits:0}).format(paise/100);}
export default async function StorefrontPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const store=await prisma.store.findUnique({where:{slug},include:{products:{where:{isActive:true},orderBy:{createdAt:"desc"},take:24}}});
 if(!store||store.status==="SUSPENDED")notFound();
 if(store.status==="DRAFT"){
  const user=await getCurrentUser();
  if(!user)notFound();
  const membership=await prisma.membership.findFirst({where:{userId:user.id,organizationId:store.organizationId},select:{id:true}});
  if(!membership)notFound();
 }
 const theme=typeof store.themeConfig==="object"&&store.themeConfig!==null?store.themeConfig as Record<string,unknown>:{};
 const primary=typeof theme.primaryColor==="string"?theme.primaryColor:"#400378";
 return <main className="storefront" style={{"--brand":primary} as React.CSSProperties}>
 {store.status==="DRAFT"&&<div style={{background:"#fff3cd",color:"#694d00",textAlign:"center",padding:10,fontSize:12,fontWeight:800}}>Store preview · Only you and your team can view this draft</div>}
 <header className="container store-header" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:18}}><a className="brand" href={`/store/${store.slug}`}><span className="brand-mark">H</span>{store.name}</a><span style={{fontSize:12,color:"var(--muted)"}}>Online store</span></header>
 <section className="store-hero"><span className="eyebrow">WELCOME TO OUR STORE</span><h1>{store.name}</h1><p>{store.description||"Discover something you will love."}</p><a className="btn btn-primary" href="#products">Explore products ↓</a></section>
 <section className="section container" id="products"><div className="section-heading"><span className="kicker">THE COLLECTION</span><h2>Featured products</h2><p>Explore the latest products from {store.name}.</p></div>
 {store.products.length?<div className="store-products">{store.products.map(product=><article className="store-product" key={product.id}><div className="store-product-art">{product.imageUrl?<img src={product.imageUrl} alt={product.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span aria-hidden="true">✧</span>}</div><div className="store-product-body"><h3>{product.title}</h3>{product.description&&<p>{product.description}</p>}<div className="store-price">{money(product.pricePaise,store.currency)}</div></div></article>)}</div>:<div className="panel" style={{textAlign:"center",padding:40}}><h2>New collection coming soon</h2><p>This store is getting ready. Please check back soon.</p></div>}
 </section><footer className="footer"><div className="container footer-row"><span className="brand">{store.name}</span><span>Powered by HEPRA</span></div></footer></main>;
}