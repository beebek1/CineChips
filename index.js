const express = require("express");
const app = express();
const { sequelize, connectDB } = require("./db/database")

//middleware
app.use(express.json());

//userRoutes and productRoutes
app.use("/api/user", require('./routes/userRoute'))
app.use("/api/movie", require('./routes/movieRoute'))

app.get("/",(req,res) =>{
    res.json({message: "Welcome to the Home Page"});
});

//start server
const startServer = async () => {
    const PORT = process.env.PORT || 3000;
    await connectDB();
    await sequelize.sync();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();