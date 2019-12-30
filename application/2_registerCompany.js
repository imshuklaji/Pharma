'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const helper = require('./contractHelper');	
let gateway;

async function main(companyCRN, companyName, location, organisationRole) {

	try {

		const contract = await helper.getContractInstance();

		// Create a new student account
		console.log('.....Registering a new company');
		const buffer = await contract.submitTransaction('registerCompany', companyCRN, companyName, location, organisationRole);

		// process response
		console.log('.....Processing Registering Company Transaction Response \n\n');
		let obj = JSON.parse(buffer.toString());
		console.log(obj);
		console.log('\n\n.....Register Company Transaction Complete!');
		return obj;

	} catch (error) {

		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);

	} finally {

		// Disconnect from the fabric gateway
		console.log('.....Disconnecting from Fabric Gateway');
		helper.disconnect();

	}
}

/*main('Sun Pharma', 'Aakash Bansal', 'connect@aakashbansal.com', "Manufacturer").then(() => {
console.log('Student account created');
});*/

module.exports.execute = main;