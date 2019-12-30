'use strict';

const helper = require('./contractHelper');

/**
 * This is a Node.JS application to perform retaildrug function on the network
 */

async function main(drugName, serialNo, retailerCRN, customerAadhar) {

	try {
		const contract = await helper.getContractInstance();

		const buffer = await contract.submitTransaction('retailDrug', drugName, serialNo, retailerCRN, customerAadhar);
		// process response
		console.log('.....Processing Retail Drug Transaction Response \n\n');
		let obj = JSON.parse(buffer.toString());
		console.log(obj);
		console.log('\n\n.....Create Retail Drug Transaction Complete!');
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