const transport = require("./TransportRoute");
const dechets = require("./DechetRoutes");
const capitalGoods = require("./CapitalGoodRoutes");
const businessTravel = require("./BusinessTravelRoutes");
const purchasedGoodsAndServices = require("./PurchasedgoodsAndServiceRoutes")
const EmployesTransport = require("./EmployesTransportRoutes");



module.exports = {
    transport,
    dechets,
    capitalGoods,
    businessTravel,
    purchasedGoodsAndServices,
    EmployesTransport
}