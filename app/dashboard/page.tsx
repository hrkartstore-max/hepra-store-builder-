import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { StorePublishButton } from "@/components/store-publish-button";
function money(paise:number,currency="INR"){return new Intl.NumberFormat("en-IN",{style:"currency",currency,maximumFractionDigits:0}).format(paise/100);}
export default async function DashboardPage(){
 const user=await requireUser();
 const membership=await prisma.membership.findFirst({where:{userId:user.id},include:{organization:{include:{stores:{orderBy:{createdAt:"asc"},take:1}}}}});
 const store=membership?.organization.stores[0];
 let productCount=0;
 let orderCount=0;
 let paidRevenuePaise=0;
 let recentOrders: Awaited<ReturnType<typeof prisma.order.findMany>>=[];
 if(store){
  const [products,orders,revenue,latest]=await Promise.all([
   prisma.product.count({where:{storeId:store.id}}),
   prisma.order.count({where:{storeId:store.id}}),
   prisma.order.aggregate({where:{storeId:store.id,paymentStatus:"PAID"},_sum:{totalPaise:true}}),
   prisma.order.findMany({where:{storeId:store.id},orderBy:{createdAt:"desc"},take:5})
  ]);
  productCount=products;
  orderCount=orders;
  paidRevenuePaise=revenue._sum.totalPaise??0;
  recentOrders=latest;
 }
 return <main className="app-shell"><aside className="app-sidebar"><Link className="brand" href="/"><span className="brand-mark">H</span>HEPRA</Link><nav className="app-nav" aria-label="Merchant navigation"><a className="active" href="/dashboard">▦　Overview</a>{store&&<a href={`/store/${store.slug}`}>◇　View store</a>}<a href="/dashboard/products">▤　Products</a><a href="#orders">↗　Orders</a><a href="#settings">⚙　Settings</a></nav><div style={{marginTop:"auto",fontSize:11,color:"var(--muted)",padding:10}}>Signed in as<br/><strong style={{color:"var(--ink)"}}>{user.email}</strong><form action="/api/auth/logout" method="post" style={{marginTop:12}}><button className="btn btn-light" style={{width:"100%"}}>Log out</button></form></div></aside>
 <section className="app-main"><header className="app-topbar"><div><h1>Good to see you{user.name?`, ${user.name.split(" ")[0]}`:""}.</h1><p>Here is what is happening with your store today.</p></div>{store&&<Link className="btn btn-primary" href={`/store/${store.slug}`}>View storefront ↗</Link>}</header>
 <div className="stat-grid"><article className="stat-card"><div className="stat-label">Products</div><div className="stat-value">{productCount}</div><p style={{fontSize:11,color:"var(--muted)"}}>In your catalog</p></article><article className="stat-card"><div className="stat-label">Orders</div><div className="stat-value">{orderCount}</div><p style={{fontSize:11,color:"var(--muted)"}}>All-time orders</p></article><article className="stat-card"><div className="stat-label">Paid revenue</div><div className="stat-value">{money(paidRevenuePaise,store?.currency??"INR")}</div><p style={{fontSize:11,color:"var(--muted)"}}>Confirmed paid orders</p></article></div>
 <div className="panel" style={{marginBottom:18}}><h2>Your storefront</h2>{store?<><p><strong>{store.name}</strong> · <span className="pill">{store.status}</span><br/>Your store address: <Link style={{color:"var(--brand)",fontWeight:800}} href={`/store/${store.slug}`}>/store/{store.slug}</Link></p><p>Preview your storefront, then publish it when you are ready for customers.</p><StorePublishButton storeId={store.id} status={store.status}/></>:<p>No store has been created for this account yet.</p>}</div>
 <div className="panel" id="orders"><h2>Recent orders</h2>{recentOrders.length?<div className="table-wrap"><table className="data-table"><thead><tr><th>Order</th><th>Customer</th><th>Status</th><th>Total</th></tr></thead><tbody>{recentOrders.map(order=><tr key={order.id}><td>{order.orderNumber}</td><td>{order.customerName}</td><td><span className="pill">{order.status}</span></td><td>{money(order.totalPaise,order.currency)}</td></tr>)}</tbody></table></div>:<p>No orders yet. Once customers start ordering, your latest activity will appear here.</p>}</div>
 <div className="panel" id="products" style={{marginTop:18}}><h2>Next steps</h2><p>Make your store ready for customers. Product management and the visual theme editor will be expanded in the next implementation phase.</p><div style={{display:"flex",gap:10,flexWrap:"wrap"}}><span className="pill">1. Add products</span><span className="pill">2. Customize design</span><span className="pill">3. Configure checkout</span></div></div></section></main>;
}