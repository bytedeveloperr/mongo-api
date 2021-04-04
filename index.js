const app = require("./src/app");

app.listen(process.env.PORT || 3002, (err, addr) => {
  if (err) throw err;
});
