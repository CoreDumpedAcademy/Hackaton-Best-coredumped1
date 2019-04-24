const LifePolicyUser = require('../models/lifePolicy');


// Create and save a new user
function signUp(req, res) {
  const { email } = req.body.user;
  const { firstname } = req.body.user;
  const { surname } = req.body.user;
  const { age } = req.body.user;
  const { phone } = req.body.user;
  const { street } = req.body.user;
  const { zipCode } = req.body.user;
  const { documentIdentifier } = req.body;
  const { familySize } = req.body;
  const { familyBook } = req.body;
  const { beneficiary } = req.body;
  const { medicalLog } = req.body;
  const { hereditaryDiseases } = req.body;

  // Checks if the user already exist
  LifePolicyUser.findOne({ documentIdentifier }, (err, userExist) => {
    if (err) return res.status(500).send({ message: `Error finding user ${err}` });
    if (userExist) return res.status(409).send({ message: 'User already exist' });

    const lifePolicyUser = new LifePolicyUser({
      email,
      firstname,
      surname,
      age,
      phone,
      street,
      zipCode,
      documentIdentifier,
      familySize,
      familyBook,
      beneficiary,
      medicalLog,
      hereditaryDiseases,
    });

    // Save the new user
    lifePolicyUser.save((error, newUser) => {
      if (error) return res.status(500).send({ message: `Error saving user ${error}` });
      if (!newUser) return res.status(500).send({ message: 'No user to save' });

      return res.status(200).send({ message: 'Saved' });
    });
    return true;
  });
}


// Update the user information
function updateLifePolicyUser(req, res) {
  const { email } = req.body.user;
  const { firstname } = req.body.user;
  const { surname } = req.body.user;
  const { phone } = req.body.user;
  const { age } = req.body.user;
  const { street } = req.body.user;
  const { zipCode } = req.body.user;
  const { documentIdentifier } = req.body;
  const { familySize } = req.body;
  const { familyBook } = req.body;
  const { beneficiary } = req.body;
  const { medicalLog } = req.body;
  const { hereditaryDiseases } = req.body;
  const updatedFields = {};


  // Get the new information
  if (email) updatedFields.email = req.body.user.email;
  if (firstname) updatedFields.firstname = req.body.user.firstname;
  if (surname) updatedFields.surname = req.body.user.surname;
  if (phone) updatedFields.phone = req.body.user.phone;
  if (age) updatedFields.phone = req.body.user.phone;
  if (street) updatedFields.phone = req.body.user.phone;
  if (zipCode) updatedFields.phone = req.body.user.phone;
  if (documentIdentifier) updatedFields.documentIdentifier = req.body.documentIdentifier;
  if (familySize) updatedFields.familySize = req.body.familySize;
  if (familyBook) updatedFields.familyBook = req.body.familyBook;
  if (beneficiary) updatedFields.beneficiary = req.body.beneficiary;
  if (medicalLog) updatedFields.medicalLog = req.body.medicalLog;
  if (hereditaryDiseases) updatedFields.hereditaryDiseases = req.body.hereditaryDiseases;


  // Update the user
  LifePolicyUser.findOneAndUpdate(req.params.documentIdentifier, updatedFields, (err, user) => {
    if (err) return res.status(500).send({ message: `Error finding user ${err}` });
    if (!user) return res.status(404).send({ message: 'User not found' });

    return res.status(200).send({ message: 'User updated' });
  });
}


// Get user object by ID
function getLifePolictUser(req, res) {
  const { documentIdentifier } = req.params;

  LifePolicyUser.findOne({ documentIdentifier }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error on request: ${err}` });
    if (!user) return res.status(404).send({ message: `No users found: ${err}` });

    return res.status(200).send([user]);
  });
}

module.exports = {
  signUp,
  updateLifePolicyUser,
  getLifePolictUser,
};
