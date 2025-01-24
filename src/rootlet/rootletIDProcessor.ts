import { rootlet } from "../types/sui/rootlets.js";
import { SuiObjectTypeProcessor } from "@sentio/sdk/sui"
import { MoveAccountFetchConfig } from '@sentio/protos'
import { RootletStaticFields } from "../schema/store.js"

const fetchConfig: MoveAccountFetchConfig = {
    owned: true
  }

export function initRootletProcessor() {
    SuiObjectTypeProcessor.bind({
    objectType: rootlet.Rootlet.type()
    })
    .onTimeInterval(async (self, _, ctx) => {
        await ctx.store.upsert( new RootletStaticFields({
            id: self.data_decoded.id.toString(),
            attributes: JSON.stringify(self.data_decoded.attributes),
            description: self.data_decoded.description,
            imageUrl: self.data_decoded.image_url,
            number: self.data_decoded.number,
            someAddress: ctx.address
        }))
    }, undefined, 4800, fetchConfig)
  }
  