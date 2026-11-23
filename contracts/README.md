# contracts

Single source of everything shared between the backends and the fronts. Code that depends on it (controllers, models, clients) is generated from it, never written by hand.

| Path | Content |
|---|---|
| `openapi.yaml` | HTTP API (OpenAPI 3.1): shared conventions and, per module tag, its operations |
| `surfaces.yaml` | API surfaces: route prefix, token issuer and audience ([schema](schemas/surfaces.schema.json)) |
| `events/` | Events and asynchronous commands (AsyncAPI 3.1): `envelope.json`, one document per module from `_template.yaml`, `translators.yaml` ([schema](schemas/translators.schema.json)) |
| `COMPATIBILITY.md` | What may change within a version, deprecation, event versions |
| `.spectral.yaml` | Style and project rules checked on every change |
| `spectral-tests/` | Conforming and faulty documents that test every project rule |
| `schemas/` | JSON schemas of the shared files |

Still to come: modules (`modules.yaml`), jobs, authorization, audit, retention, resilience, telemetry, secrets, templates, AI prompts and tool definitions (`ai/`), container images (`images.yaml`) and reference cases.

## Check

```bash
npm ci --prefix contracts          # install scripts are disabled by contracts/.npmrc
npm run --prefix contracts lint
npm run --prefix contracts test:rules
```
