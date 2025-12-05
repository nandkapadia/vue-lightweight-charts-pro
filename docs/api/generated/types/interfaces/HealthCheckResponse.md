[**Vue Lightweight Charts Pro API**](../../README.md)

***

[Vue Lightweight Charts Pro API](../../README.md) / [types](../README.md) / HealthCheckResponse

# Interface: HealthCheckResponse

Defined in: [src/types/api.ts:644](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L644)

Response from the API health check endpoint.

Used to verify the API server is running and responsive
before making data requests.

 HealthCheckResponse

## Properties

### status

> **status**: `"healthy"` \| `"unhealthy"`

Defined in: [src/types/api.ts:649](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L649)

Current health status of the server.
'healthy' means the server is operational.

***

### version

> **version**: `string`

Defined in: [src/types/api.ts:655](https://github.com/nandkapadia/vue-lightweight-charts-pro/blob/671d5cd007907deb6cccedaf4a020d5ebce0d527/src/types/api.ts#L655)

Version string of the API.
Useful for debugging compatibility issues.
