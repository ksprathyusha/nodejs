var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Prathyu = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});
 
mongoose.model( 'Prathyu', Prathyu );
mongoose.connect( 'mongodb://localhost/express-prathyu' );