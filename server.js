const app = require("./config/app").app;

const PORT = 9000; 

app.listen(PORT, () => {
    console.log("Server running on port 9000");
});
