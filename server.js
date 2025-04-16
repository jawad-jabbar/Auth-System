const dotenv = require('dotenv');
dotenv.config();

const connectdb = require('./db/connectdb');
const app = require('./index');

const PORT = process.env.PORT || 5500;

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
