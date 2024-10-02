// Importing modules
const express = require('express'); // build connection for request and response
const path = require('path'); // to worki with static file
const app = express(); // consigure routes and middleware

app.use(express.static(path.join(__dirname, 'HTML')));
app.use(express.json()); // Add this middleware to handle JSON bodies
app.use(express.urlencoded({ extended: true })); // Add this middleware to handle form bodies

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML', 'index.html'));
});

function userValidation(validateRoles = [], validTasks = []) {
  const allowedRoles = ['student', 'teacher', 'admin'];
  const allowedTasks = {
    student: ['read notes', 'read attendance', 'read time table'],
    teacher: ['read notes', 'write notes', 'read attendance', 'write attendance', 'read time table'],
    admin: ['read notes', 'write notes', 'read attendance', 'write attendance', 'read time table', 'write time table']
  };

  // Normalize roles to lowercase
  const normalizedRoles = validateRoles.map(role => role.toLowerCase());
  const hasValidRoles = normalizedRoles.some(role => allowedRoles.includes(role)); // check if role is in allowed roles
  
  // If roles are not valid, return validation message
  if (!hasValidRoles) {
    return objectValidation(normalizedRoles[0], validTasks[0]);
  }

  // Check for valid tasks
  const validRole = normalizedRoles[0]; 
  const hasValidTasks = validTasks.some(task => allowedTasks[validRole] && allowedTasks[validRole].some(allowedTask => allowedTask.toLowerCase() === task.toLowerCase()));

  if (hasValidTasks) {
    return `You can perform this task`;
  } else {
    return `You cannot perform this task`;
  }
}

function objectValidation(role) {
  const allowedRoles = ['student', 'teacher', 'admin'];
 
  if (!allowedRoles.includes(role)) {
    return `Please enter a valid user role`;
  }

  return null; // Return null if both are valid
}

app.post('/submit', (req, res) => {
  const userRole = req.body.role.trim(); // Trim to remove front and back white spaces
  const userTask = req.body.task.trim(); 

  // Ensure userRole and userTask are arrays
  const result = userValidation(Array.isArray(userRole) ? userRole : [userRole], Array.isArray(userTask) ? userTask : [userTask]);

  if (result) {
    // Send the result as the response
    res.send(result);
  } else {
    // If there's no result
    res.send('An unexpected error occurred');
  }
});

const port = process.env.PORT || 3000; // defining port for connection
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
