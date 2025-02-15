# Rootlet Sentio Processor: Introduction and Entities

This project processes data for Rootlets on the Sui blockchain using the Sentio SDK. It focuses on extracting and storing information related to Rootlet static fields and ownership changes.

## Entities

The project defines two main entities in `src/schema/store.ts`:

### RootletStaticFields

Stores static information about a Rootlet.

| Field       | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `id`        | `ID!`    | Unique identifier of the Rootlet.         |
| `attributes` | `String!` | JSON string of Rootlet attributes.       |
| `description` | `String!` | Description of the Rootlet.              |
| `imageUrl`  | `String!` | URL of the Rootlet's image.              |
| `number`    | `BigInt!` | Number associated with the Rootlet.       |
| `accessories` | `String` | Accessory of the Rootlet, if present.    |
| `head`      | `String` | Head of the Rootlet, if present.         |
| `mouth`     | `String` | Mouth of the Rootlet, if present.        |
| `eyes`      | `String` | Eyes of the Rootlet, if present.         |
| `theme`     | `String` | Theme of the Rootlet, if present.        |

### RootletOwner

Stores information about Rootlet ownership changes.

| Field        | Type     | Description                                                                  |
| :----------- | :------- | :--------------------------------------------------------------------------- |
| `id`         | `ID!`    | Unique identifier, combining object ID and timestamp.                       |
| `objectID`   | `ID!`    | The ID of the Rootlet object.                                                |
| `objectChange` | `String!` | Type of change: 'created' or 'mutated'.                                      |
| `sender`     | `String!` | Address of the sender involved in the ownership change.                     |
| `digest`     | `String!` | Transaction digest associated with the change.                               |
| `timestamp`  | `BigInt!` | Timestamp of the ownership change (in milliseconds).                        |