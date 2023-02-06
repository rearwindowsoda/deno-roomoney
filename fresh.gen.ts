// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_middleware.ts";
import * as $2 from "./routes/api/joke.ts";
import * as $3 from "./routes/api/login.ts";
import * as $4 from "./routes/api/register.ts";
import * as $5 from "./routes/avatars.tsx";
import * as $6 from "./routes/dashboard/_middleware.ts";
import * as $7 from "./routes/dashboard/index.tsx";
import * as $8 from "./routes/index.tsx";
import * as $9 from "./routes/name/[name].tsx";
import * as $$0 from "./islands/Counter.tsx";
import * as $$1 from "./islands/MainAlert.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_middleware.ts": $1,
    "./routes/api/joke.ts": $2,
    "./routes/api/login.ts": $3,
    "./routes/api/register.ts": $4,
    "./routes/avatars.tsx": $5,
    "./routes/dashboard/_middleware.ts": $6,
    "./routes/dashboard/index.tsx": $7,
    "./routes/index.tsx": $8,
    "./routes/name/[name].tsx": $9,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
    "./islands/MainAlert.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
