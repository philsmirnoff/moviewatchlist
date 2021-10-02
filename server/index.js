const express = require("express");
const app = express();

const PORT = 8080;

const dbConnection = require("./db");

const startServer = async () => {
  await dbConnection.sync();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!~`);
 });
};
startServer();

app.get("/", (req, res) => {
  res.send("Hello :)");
});

/*
    Movie model
        - title (not null)
        - imdbLink (null)
        - watched (not null, boolean, default false)
    Genre model
        - name (not null)
    Many-to-many movies and genres
    belongsToMany
*/

const Movie = dbConnection.define("movie", {
  title: {
    type: Sequelize.DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imdbLink: {
    type: Sequelize.DataTypes.STRING(1000),
    allowNull: true,
    validate: {
        isUrl: true
    }
},
watched: {
    type: Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
}
});
