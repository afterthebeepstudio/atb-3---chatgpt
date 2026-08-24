export async function onRequestPost({request, env}) {
  const form = await request.formData();
  const name=form.get("name"), email=form.get("email"), message=form.get("message");
  if(!name||!email||!message) return new Response("Missing required fields",{status:400});
  // Production: connect this endpoint to your preferred email provider.
  return Response.redirect(new URL("/contact.html?sent=1",request.url),303);
}
