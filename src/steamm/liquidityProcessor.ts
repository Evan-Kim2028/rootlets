import { pool } from "../types/sui/steamm.js";



export function initSteamProcessor() {

    pool.bind().onEventNewPoolResult((event, ctx) => {
        ctx.eventLogger.emit("aftermath_swap_event", {
            protocol_version: "v1",
            pool_id: event.data_decoded.pool_id,
            coin_type_a: event.data_decoded.coin_type_a,
            coin_type_b: event.data_decoded.coin_type_b,
            quoter_type: event.data_decoded.quoter_type,
            lp_token_type: event.data_decoded.lp_token_type,
            swap_fee_bps: event.data_decoded.swap_fee_bps.toString()
        })
    },

}