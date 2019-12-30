'use strict';

const helper = require('./contractHelper');

/**
 * This is a Node.JS application to view history of the transaction of drugon the network
 */

async function main(drugName, serialNo) {

	try {
		const contract = await helper.getContractInstance();

		const buffer = await contract.submitTransaction('viewHistory', drugName, serialNo);
		// process response
		console.log('.....Processing View History Transaction Response \n\n');
		let obj = JSON.parse(buffer.toString());
		console.log(obj);
		console.log('\n\n.....View History Transaction Complete!');
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