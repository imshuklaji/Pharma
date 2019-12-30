'use strict';

const helper = require('./contractHelper');

/**
 * This is a Node.JS application to update a shipment on the network
 */

async function main(buyerCRN, drugName, transporterCRN) {

	try {
		const contract = await helper.getContractInstance();

		const buffer = await contract.submitTransaction('updateShipment', buyerCRN, drugName, transporterCRN);
		// process response
		console.log('.....Processing Update Shipment Transaction Response \n\n');
		let obj = JSON.parse(buffer.toString());
		console.log(obj);
		console.log('\n\n.....Update Shipment Transaction Complete!');
		return obj;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		helper.disconnect();

	}
}

module.exports.execute = main;