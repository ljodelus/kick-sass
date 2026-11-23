# KickSaaS

KickSaaS is an open-source, multi-tenant SaaS foundation: one OpenAPI contract implemented by two interchangeable backends (Spring Boot and FastAPI), two fronts (Angular and React), Keycloak for identity, and a shared PostgreSQL database isolated by row-level security.

> **Status:** increment 0 (foundations) is in progress. There is no released version yet; nothing may be published or tagged before the Cyber Resilience Act qualification (H-65).

## Repository layout

| Path | Content |
|---|---|
| `contracts/` | Single source of everything shared: OpenAPI, AsyncAPI events, modules, surfaces, jobs, authorization, audit, retention, resilience, telemetry, secrets, templates, AI prompts and tool definitions (`ai/`), container images (`images.yaml`), reference cases |
| `kicksaas-api-spring/` | Java 25 / Spring Boot backend |
| `kicksaas-api-fastapi/` | Python 3.14 / FastAPI backend |
| `kicksaas-web-angular/` | Angular application and customer portal |
| `kicksaas-web-react/` | React application and customer portal |
| `web-shared/` | Translations, design tokens, `config.json` schema, accessibility rules shared by the fronts |
| `web-components/` | Public widget, capture forms and public pages |
| `migrations/` | Liquibase changelogs, one directory per module and one for `platform` |
| `keycloak/` | Realm configuration and the foundation's Keycloak extensions |
| `acceptance/` | Neutral acceptance suite run against both backends and the four front/back combinations |
| `infra/` | Docker Compose, Helm charts, Terraform, Traefik and Caddy configuration |

## Documentation

The architecture dossier (arc42, ADRs, diagrams), the planning and the instructions for AI agents are maintained privately by the project owner. Identifiers quoted in this repository, such as `ADR-0033`, `arc42 §5.2.5`, `TK-010` or `dev-java-spring`, refer to that dossier.

Code, API fields, commits and repository guides are in English.

## License

Apache License 2.0 — see [`LICENSE`](LICENSE) and [`NOTICE`](NOTICE).
