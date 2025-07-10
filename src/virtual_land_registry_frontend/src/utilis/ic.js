// src/utils/ic.js
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/virtual_land_registry_backend";
import canisterIds from "../canister_ids.json"; // ✅ Step 3: Import here

const canisterId = canisterIds.virtual_land_registry_backend.local;
const agent = new HttpAgent({ host: "http://localhost:4943" });

await agent.fetchRootKey();

export const virtual_land_registry_backend = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});
