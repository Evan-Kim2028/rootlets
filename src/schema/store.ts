
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { String, Int, BigInt, Float, ID, Bytes, Timestamp, Boolean } from '@sentio/sdk/store'
import { Entity, Required, One, Many, Column, ListColumn, AbstractEntity } from '@sentio/sdk/store'
import { BigDecimal } from '@sentio/bigdecimal'
import { DatabaseSchema } from '@sentio/sdk'







interface RootletStaticFieldsConstructorInput {
  id: ID;
  attributes: String;
  description: String;
  imageUrl: String;
  number: BigInt;
  accessories?: String;
  head?: String;
  mouth?: String;
  eyes?: String;
  theme?: String;
}
@Entity("RootletStaticFields")
export class RootletStaticFields extends AbstractEntity  {

	@Required
	@Column("ID")
	id: ID

	@Required
	@Column("String")
	attributes: String

	@Required
	@Column("String")
	description: String

	@Required
	@Column("String")
	imageUrl: String

	@Required
	@Column("BigInt")
	number: BigInt

	@Column("String")
	accessories?: String

	@Column("String")
	head?: String

	@Column("String")
	mouth?: String

	@Column("String")
	eyes?: String

	@Column("String")
	theme?: String
  constructor(data: RootletStaticFieldsConstructorInput) {super()}
  
}


interface RootletOwnerConstructorInput {
  id: ID;
  objectID: ID;
  objectChange: String;
  sender: String;
  digest: String;
  timestamp: BigInt;
}
@Entity("RootletOwner")
export class RootletOwner extends AbstractEntity  {

	@Required
	@Column("ID")
	id: ID

	@Required
	@Column("ID")
	objectID: ID

	@Required
	@Column("String")
	objectChange: String

	@Required
	@Column("String")
	sender: String

	@Required
	@Column("String")
	digest: String

	@Required
	@Column("BigInt")
	timestamp: BigInt
  constructor(data: RootletOwnerConstructorInput) {super()}
  
}


const source = `type RootletStaticFields @entity {
  id: ID!
  attributes: String!
  description: String!
  imageUrl: String!
  number: BigInt!
  accessories: String
  head: String
  mouth: String
  eyes: String
  theme: String
}

type RootletOwner @entity {
  id: ID!
  objectID: ID!
  objectChange: String!
  sender: String!
  digest: String!
  timestamp: BigInt!
}`
DatabaseSchema.register({
  source,
  entities: {
    "RootletStaticFields": RootletStaticFields,
		"RootletOwner": RootletOwner
  }
})
