# Compatibility rules

These rules apply to every change of `contracts/`. A change that breaks them needs a new major version of the API or a new version of the event type.

## HTTP API (`openapi.yaml`)

- One contract and one version prefix, `/v1`. Within `/v1`, only compatible changes are allowed:
  - add an operation, an optional request member, an optional query parameter, a response member, a response code documented as possible;
  - relax a constraint on input (longer `maxLength`, wider range).
- Breaking changes, never allowed within `/v1`:
  - remove or rename an operation, a path, a parameter, a member, a tag or an `operationId`;
  - make an optional input required, add a required input, tighten an input constraint;
  - change a type, a format or the meaning of a value;
  - remove a value from an enumeration used in input.
- Adding a value to an enumeration is compatible for the contract but can break a client that handles values exhaustively: clients must handle unknown values, and the release note announces every new value.
- Request bodies are closed (`additionalProperties: false`); responses and events are read tolerantly: a new optional member is never a break.
- The check compares the contract with the merge base of the change, never with the tip of `main`.

## Deprecation

- A deprecated operation, parameter or member carries `deprecated: true` and a release note.
- Responses of a deprecated operation carry `Deprecation` (RFC 9745, `@<Unix timestamp>`), `Sunset` (RFC 8594) and a `Link` with `rel="deprecation"` to the note.
- Notice period: six months at least for the public API surface; `Sunset` is never earlier.
- Removal happens only in the next major version.

## Events (`events/`)

- Every type carries its version: `ContactCreated.v1`. A published type never changes incompatibly; a new version is a new type, `ContactCreated.v2`.
- Within a version, only optional payload members may be added.
- During the notice period, the producer writes only the new version to the outbox; a translator declared in `events/translators.yaml` produces the old version for subscribers and webhooks not yet migrated. Both versions are served until `until`.
- A stored event is never modified.
- The list of types exposed to webhooks (`x-kicksaas-webhook: true`) is closed and reviewed before each minor version; a security fact is never exposed.

## Versions

- `info.version` of `openapi.yaml` and of each AsyncAPI document follows Semantic Versioning.
- No version of the contract is published or tagged yet.

## Checks

| Check | Tool | When |
|---|---|---|
| Style and project rules | Spectral, `contracts/.spectral.yaml` | Every change |
| Breaking HTTP changes | oasdiff against the merge base | Every change, once wired in CI |
| Breaking event changes | AsyncAPI diff, or a schema compatibility check | Every change, once wired in CI |
| Backends against the contract | Schemathesis | Every change, once wired in CI |
