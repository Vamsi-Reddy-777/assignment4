const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    title : String,
    description : String,
});

module.exports = mongoose.model('Todos',TodoSchema);
 