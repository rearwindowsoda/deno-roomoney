/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import mongoose from "npm:mongoose@^6.7";
import manifest from "@/fresh.gen.ts";
import envConfig from "@/utils/config.ts";

await mongoose.connect(envConfig.db_connection_strng);
await start(manifest);
