const app = require("./src/app");

const PORT = process.env.PORT || 3002;

app.listen(PORT, (err, addr) => {
  if (err) throw err;
});
