# contracts

Single source of everything shared between the backends and the fronts. Code that depends on it (controllers, models, clients) is generated from it, never written by hand.

| Path | Content |
|---|---|
| `openapi.yaml` | HTTP API (OpenAPI 3.1): shared conventions and, per module tag, its operations |
| `surfaces.yaml` | API surfaces: route prefix, token issuer and audience ([schema](schemas/surfaces.schema.json)) |
| `events/` | Events and asynchronous commands (AsyncAPI 3.1): `envelope.json`, one document per module from `module-template.yaml`, `translators.yaml` ([schema](schemas/translators.schema.json)) |
| `COMPATIBILITY.md` | What may change within a version, deprecation, event versions |
| `.spectral.yaml` | Style and project rules checked on every change |
| `schemas/` | JSON schemas of the shared files |

Still to come: modules (`modules.yaml`), jobs, authorization, audit, retention, resilience, telemetry, secrets, templates, AI prompts and tool definitions (`ai/`), container images (`images.yaml`) and reference cases.

## Check

```bash
npm ci --prefix contracts --ignore-scripts
npm run --prefix contracts lint
```
