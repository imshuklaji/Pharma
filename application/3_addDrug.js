'use strict';

/**
 * This is a Node.JS application to add a drug to the network
 * 
 * 
 */

const helper = require('./contractHelper');

async function main(drugName, serialNo, mfgData, expDate, companyCRN) {

	try {
		const contract = await helper.getContractInstance();

		console.log('.....Adding Drug');
		const buffer = await contract.submitTransaction('addDrug', drugName, serialNo, mfgData, expDate, companyCRN);

		// process response
		console.log('.....Processing Add Drug Transaction Response\n\n');
		let obj = JSON.parse(buffer.toString());
		console.log(obj);
		console.log('\n\n.....Add Drug Transaction Complete!');
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