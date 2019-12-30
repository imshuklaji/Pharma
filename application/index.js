const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

// Import all function modules
const addToWallet = require('./1_addToWallet');
const registerCompany = require('./2_registerCompany');
const addDrug = require('./3_addDrug');
const createPO = require('./4_createPO');
const createShipment = require('./5_createShipment');
const updateShipment = require('./6_updateShipment');
const retailDrug = require('./7_retailDrug');
const viewHistory = require('./8_viewHistory');
const viewDrugCurrentState = require('./9_viewDrugCurrentState');

// Define Express app settings
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('title', 'Pharma App');

app.get('/', (req, res) => res.send('hello world'));

app.post('/addToWallet', (req, res) => {
	addToWallet.execute(req.body.certificatePath, req.body.privateKeyPath)
			.then(() => {
				console.log('User credentials added to wallet');
				const result = {
					status: 'success',
					message: 'User credentials added to wallet'
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});


app.post('/registerCompany', (req, res) => {
	registerCompany.execute(req.body.companyCRN, req.body.companyName, req.body.location, req.body.organisationRole)
			.then((obj) => {
				console.log('Comapny Registered!!');
				const result = {
					status: 'success',
					message: 'New Company Registered',
					obj: obj
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});

app.post('/addDrug', (req, res) => {
	addDrug.execute(req.body.drugName, req.body.serialNo, req.body.mfgData, req.body.expDate, req.body.companyCRN)
			.then((obj) => {
				console.log('Drug added!!');
				const result = {
					status: 'success',
					message: 'Drug added',
					obj: obj
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});

app.post('/createPO', (req, res) => {
	createPO.execute(req.body.buyerCRN, req.body.sellerCRN, req.body.drugName, req.body.quantity)
			.then((obj) => {
				console.log('Purchase Order added!!');
				const result = {
					status: 'success',
					message: 'Purchase Order added.',
					obj: obj
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});

app.post('/createShipment', (req, res) => {
	createShipment.execute(req.body.buyerCRN, req.body.drugName, req.body.listOfAssets, req.body.transporterCRN)
			.then((obj) => {
				console.log('Shipment created!!');
				const result = {
					status: 'success',
					message: 'Shipment created.',
					obj: obj
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});

app.post('/updateShipment', (req, res) => {
	updateShipment.execute(req.body.buyerCRN, req.body.drugName, req.body.transporterCRN)
			.then((obj) => {
				console.log('Shipment updated!!');
				const result = {
					status: 'success',
					message: 'Shipment updated.',
					obj: obj
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});

app.post('/retailDrug', (req, res) => {
	retailDrug.execute(req.body.drugName, req.body.serialNo, req.body.retailerCRN, req.body.customerAadhar)
			.then((obj) => {
				console.log('Drug retailed!!');
				const result = {
					status: 'success',
					message: 'Drug retailed.',
					obj: obj
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});

app.post('/viewHistory', (req, res) => {
	viewHistory.execute(req.body.drugName, req.body.serialNo)
			.then((obj) => {
				const result = {
					status: 'success',
					message: 'Drug history found.',
					obj: obj
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});

app.post('/viewDrugCurrentState', (req, res) => {
	viewDrugCurrentState.execute(req.body.drugName, req.body.serialNo)
			.then((obj) => {
				const result = {
					status: 'success',
					message: 'Drug history found.',
					obj: obj
				};
				res.json(result);
			})
			.catch((e) => {
				const result = {
					status: 'error',
					message: 'Failed',
					error: e
				};
				res.status(500).send(result);
			});
});



app.listen(port, () => console.log(`Distributed Pharma App listening on port ${port}!`));