'use strict';

const helper = require('./contractHelper');

/**
 * This is a Node.JS application to create a PO to the network
 */
 
async function main(buyerCRN, sellerCRN, drugName, quantity) {

	try {
		const contract = await helper.getContractInstance();

		const buffer = await contract.submitTransaction('createPO', buyerCRN, sellerCRN, drugName, quantity);
		// process response
		console.log('.....Processing Create Purchasing Order Transaction Response \n\n');
		let obj = JSON.parse(buffer.toString());
		console.log(obj);
		console.log('\n\n.....Create Purchasing Order Transaction Complete!');
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