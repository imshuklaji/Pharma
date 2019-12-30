'use strict';


const helper = require('./contractHelper');

/**
 * This is a Node.JS application to create a Shipment on the network
 */

async function main(buyerCRN, drugName, listOfAssets, transporterCRN) {

	try {
		const contract = await helper.getContractInstance();
		console.log('.....Processing Create Shipment Transaction Request \n\n');
		const buffer = await contract.submitTransaction('createShipment', buyerCRN, drugName, listOfAssets, transporterCRN);
		// process response
		console.log('.....Processing Create Shipment Transaction Response \n\n');
		let obj = JSON.parse(buffer.toString());
		console.log(obj);
		console.log('\n\n.....Create Shipment Transaction Complete!');
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