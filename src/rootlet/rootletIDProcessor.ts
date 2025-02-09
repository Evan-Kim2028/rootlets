import { rootlet } from "../types/sui/rootlets.js";
import { SuiObjectTypeProcessor } from "@sentio/sdk/sui"
import { MoveAccountFetchConfig } from '@sentio/protos'
import { RootletStaticFields, RootletOwner } from "../schema/store.js"

const fetchConfig: MoveAccountFetchConfig = {
    owned: true
  }

export function initRootletProcessor() {
    SuiObjectTypeProcessor.bind({
    objectType: rootlet.Rootlet.type(),
    startCheckpoint: 51594000n
    })
    .onTimeInterval(async (self, _, ctx) => {
        await ctx.store.upsert( new RootletStaticFields({
            id: self.data_decoded.id.id,
            attributes: JSON.stringify(self.data_decoded.attributes),
            description: self.data_decoded.description,
            imageUrl: self.data_decoded.image_url,
            number: self.data_decoded.number,
            accessories: self.data_decoded.attributes.contents.find((a: any) => a.key === "Accessories")?.value || undefined,
            head: self.data_decoded.attributes.contents.find((a: any) => a.key === "Head")?.value || undefined,
            mouth: self.data_decoded.attributes.contents.find((a: any) => a.key === "Mouth")?.value || undefined,
            eyes: self.data_decoded.attributes.contents.find((a: any) => a.key === "Eyes")?.value || undefined,
            theme: self.data_decoded.attributes.contents.find((a: any) => a.key === "Theme")?.value || undefined
        }))
    }, undefined, 4800, fetchConfig)
    .onObjectChange(async (changes, ctx) => {
        for (const change of changes) {
            if (change.type === 'mutated' || change.type === 'created') {
                await ctx.store.upsert(new RootletOwner({
                    objectID: change.objectId,
                    id: `${change.objectId}-${ctx.timestamp.getTime()}`,
                    objectChange: change.type,
                    sender: change.sender,
                    timestamp: BigInt(ctx.timestamp.getTime())
                }));
            }
        }
    });

    // // This isn't working. I think the function is private so it wont show the input arguments...
    // rootlet.bind().onEntryMint(async (call, ctx) => {
    //     console.log("Received mint event with arguments:", {
    //         id: call.arguments_decoded[0],
    //         rootletId: call.arguments_decoded[1],
    //         mintedBy: call.arguments_decoded[2],
    //         passes: call.arguments_decoded[3],
    //         kiosk: call.arguments_decoded[4],
    //         kioskCap: call.arguments_decoded[5],
    //         payment: call.arguments_decoded[6],
    //         amount: call.arguments_decoded[7],
    //         clock: call.arguments_decoded[8],
    //         txContext: call.arguments_decoded[9]
    //     });

    //     try {
    //         await ctx.store.upsert(new RootletMint({
    //             id: call.arguments_decoded[0],
    //             rootletId: call.arguments_decoded[1],
    //             mintedBy: call.arguments_decoded[2],
    //             passes: JSON.stringify(call.arguments_decoded[3]),
    //             kiosk: call.arguments_decoded[4],
    //             kioskCap: call.arguments_decoded[5],
    //             payment: call.arguments_decoded[6],
    //             amount: call.arguments_decoded[7],
    //             clock: call.arguments_decoded[8],
    //             txContext: call.arguments_decoded[9]
    //         }));
    //         console.log("Successfully stored RootletMint event");
    //     } catch (error) {
    //         console.error("Failed to store RootletMint event:", error);
    //         // Re-throw to ensure the error is properly handled upstream
    //         throw error;
    //     }
    // })
  }
  