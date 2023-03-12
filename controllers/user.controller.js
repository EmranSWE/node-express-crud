const data = require('../user.json');

module.exports.getRandomUser = (req, res, nex) => {
    const id = Math.ceil(Math.random(100) * 10)
    const randomUser = data.filter(rand => rand.id == id);
    res.send(randomUser)
}

module.exports.getAllUser =(req,res,next)=>{
    const {limit} = req.query;
    res.send(data.slice(0,limit))
}
module.exports.saveAUser =(req,res,next)=>{
    const newUser = req.body;
    const requiredFields = ['id','gender','name', 'contact', 'address']; // Define required fields here
    const missingFields = [];

    // Check if all required fields are present in the request body
    requiredFields.forEach((field) => {
      if (!newUser[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      // If any required fields are missing, send a 400 error response
      res.status(400).send(`Missing required fields: ${missingFields.join(', ')}`);
    } else {
      // If all required fields are present, add the new user to the data array and send a success response
      data.push(newUser);
      res.send(data);
    }
  }


  module.exports.updateUser = (req, res, next) => {
    const id = Number(req.query.id);
  
    // Check if id is a valid number
    if (isNaN(id)) {
      return res.status(400).send('Invalid user ID');
    }
  
    const updateData = data.find(user => user.id === id);
  
    // Check if user with the specified id exists in the data array
    if (!updateData) {
      return res.status(404).send('User not found');
    }
  
    updateData.gender = req.body.gender;
    updateData.contact = req.body.contact;
    updateData.name = req.body.name;
    updateData.address = req.body.address;
  
    // Send success response with updated user data
    res.status(200).send({
      success: true,
      message: 'Successfully updated',
      data: updateData
    });
  };

  
  module.exports.updateMultipleUsers = (req, res, next) => {
    const userIds = req.body.id;
    const requiredFields = ['gender', 'contact', 'name', 'address']; // Define required fields here
    const missingFields = [];
  
    // Check if all required fields are present in the request body
    requiredFields.forEach((field) => {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    });
  
    if (missingFields.length > 0) {
      // If any required fields are missing, send a 400 error response
      return res.status(400).send(`Missing required fields: ${missingFields.join(', ')}`);
    }
  
    // Loop through the array of user ids and update each user with the new information
    const updatedUsers = [];
    userIds.forEach((id) => {
      const user = data.find(user => user.id === id);
      if (user) {
        user.gender = req.body.gender;
        user.contact = req.body.contact;
        user.name = req.body.name;
        user.address = req.body.address;
        updatedUsers.push(user);
      }
    });
  
    // Send success response with updated user data
    res.status(200).send({
      success: true,
      message: 'Successfully updated',
      data: updatedUsers
    });
  };

  module.exports.deleteAUser =(req,res,next)=>{
    const id = Number(req.query.id);
    // Check if id is a valid number
    if (isNaN(id)) {
        return res.status(400).send('Invalid user ID');
      }
    const notDeletedData = data.filter(user => user.id !== id);
    res.send(notDeletedData)
  }