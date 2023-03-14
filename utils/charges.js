const STT = 0.001
const ExchangeTXN = 0.0000345
const GST = 0.18
const SEBI = 0.000001
const stamp = 0.00015
const DPcharge = 15.93
const brokerage = 0

const charges = async (buy, price, quantity) => {

    let STT_charge = price*quantity*STT
    let ExchangeTXN_charges = price*quantity*ExchangeTXN
    let GST_charge = GST*ExchangeTXN_charges
    let DP_charge =0
    let Stamp_charge = 0;
    
    if(buy){
        Stamp_charge = stamp*quantity*price
    }

    if(!buy){
        DP_charge = DPcharge
    }

    let SEBI_charge = SEBI*(price*quantity*1.18)

    let Total_charges = STT_charge + ExchangeTXN_charges + GST_charge + DP_charge + Stamp_charge + SEBI_charge + brokerage
    return Total_charges
};

module.exports = charges
