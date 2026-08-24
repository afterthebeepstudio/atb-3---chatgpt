export async function onRequestPost({request, env}) {
  if (!env.SQUARE_ACCESS_TOKEN || !env.SQUARE_LOCATION_ID) {
    return new Response(JSON.stringify({error:"Square checkout is not configured. Add SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID in your Cloudflare environment variables."}),{status:503,headers:{"content-type":"application/json"}});
  }
  const body=await request.json();
  const amount=Math.round(body.items.reduce((s,i)=>s+Number(i.price||0),0)*100);
  const payload={
    idempotency_key: crypto.randomUUID(),
    order:{location_id:env.SQUARE_LOCATION_ID,line_items:body.items.map(i=>({name:i.name,quantity:"1",base_price_money:{amount:Math.round(i.price*100),currency:"CAD"}}))},
    checkout_options:{redirect_url:env.PUBLIC_SITE_URL+"/booking.html?paid=1"}
  };
  const r=await fetch("https://connect.squareup.com/v2/online-checkout/payment-links",{
    method:"POST",headers:{"Square-Version":"2026-08-19","Authorization":"Bearer "+env.SQUARE_ACCESS_TOKEN,"Content-Type":"application/json"},
    body:JSON.stringify(payload)
  });
  const d=await r.json();
  if(!r.ok) return new Response(JSON.stringify({error:d.errors?.[0]?.detail||"Square error",details:d}),{status:502,headers:{"content-type":"application/json"}});
  return new Response(JSON.stringify({url:d.payment_link?.url,id:d.payment_link?.id}),{headers:{"content-type":"application/json"}});
}
