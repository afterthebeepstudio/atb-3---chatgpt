export async function onRequestGet({request, env}) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");
  if (!date) return new Response(JSON.stringify({error:"Missing date"}), {status:400,headers:{"content-type":"application/json"}});
  // Production: call Square Bookings API here using env.SQUARE_ACCESS_TOKEN,
  // search availability for the configured location/service, then return true/false.
  // This safe starter returns available until Square is configured.
  return new Response(JSON.stringify({available:true,date}), {headers:{"content-type":"application/json"}});
}
