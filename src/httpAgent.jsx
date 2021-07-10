import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { idlFactory, canisterId } from "dfx-generated/counter";

const httpAgent = async () => {
  console.log("authActor0");
  const authClient = await AuthClient.create();
  console.log("authActor1");
  const isauthed = await authClient.isAuthenticated();
  const identity = await authClient.getIdentity();
  console.log("authActor2");
  console.log(isauthed);
  const agent = new HttpAgent({
    identity: identity,
    host: "http://localhost:8000",
  });
  console.log(agent);
  const authActor = Actor.createActor(idlFactory, {
    agent,
    canisterId: canisterId,
  });
  console.log("authActor4");
  console.log(authActor);
  return authActor;
};
export default httpAgent;
