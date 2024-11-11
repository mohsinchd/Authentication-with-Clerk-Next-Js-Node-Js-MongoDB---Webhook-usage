import { Webhook } from "svix";
import { headers } from "next/headers";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Handle different webhook events
  try {
    switch (evt.type) {
      case "user.created":
        // Handle new user signup
        const { id, email_addresses, first_name, last_name, image_url } =
          evt.data;
        await fetch("http://localhost:5000/api/v1/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkId: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            imageUrl: image_url,
          }),
        });
        console.log("Created new user:", id);
        break;

      case "user.updated":
        // Handle user updates
        const updatedUser = evt.data;
        await fetch("http://localhost:5000/api/v1/user/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkId: updatedUser.id,
            email: updatedUser.email_addresses[0].email_address,
            name: `${updatedUser.first_name} ${updatedUser.last_name}`,
            imageUrl: updatedUser.image_url,
          }),
        });
        console.log("Updated user:", updatedUser.id);
        break;

      case "user.deleted":
        // Handle user deletion
        await fetch(`http://localhost:5000/api/v1/user/${evt.data.id}`, {
          method: "DELETE",
        });
        console.log("Deleted user:", evt.data.id);
        break;

      default:
        console.log(`Unhandled webhook event: ${evt.type}`);
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Error processing webhook", { status: 500 });
  }
}
