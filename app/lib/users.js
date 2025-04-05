import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}

if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

const getUsers = () => {
  try {
    const users = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    console.log('Getting all users:', users);
    return users;
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

 const addUser = (user) => {
  try {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
    console.log('Current users after adding:', users);
    return user;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

const findUser = (email) => {
  try {
    const users = getUsers();
    const user = users.find(user => user.email === email);
    console.log('Finding user:', email, 'Result:', user);
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
};

export { getUsers, addUser, findUser }; 