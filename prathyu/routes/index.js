var utils    = require( '../utils' );
var mongoose = require( 'mongoose' );
var Prathyu     = mongoose.model( 'Prathyu' );
 
exports.index = function ( req, res, next ){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;
 
  Prathyu.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, prathyus ){
      if( err ) return next( err );
 
      res.render( 'index', {
          title : 'Express Todo Example',
          prathyus : prathyus
      });
    });
};
 
exports.create = function ( req, res, next ){
  new Prathyu({
      user_id    : req.cookies.user_id,
      content    : req.body.content,
      updated_at : Date.now()
  }).save( function ( err, prathyu, count ){
    if( err ) return next( err );
 
    res.redirect( '/' );
  });
};
 
exports.destroy = function ( req, res, next ){
  Todo.findById( req.params.id, function ( err, prathyu ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;
 
    if( prathyu.user_id !== req.cookies.user_id ){
      return utils.forbidden( res );
    }
 
    prathyu.remove( function ( err, prathyu ){
      if( err ) return next( err );
 
      res.redirect( '/' );
    });
  });
};
 
exports.edit = function( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;
 
  Prathyu.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, prathyus ){
      if( err ) return next( err );
 
      res.render( 'edit', {
        title   : 'Express Todo Example',
        prathyus   : prathyus,
        current : req.params.id
      });
    });
};
 
exports.update = function( req, res, next ){
  Prathyu.findById( req.params.id, function ( err, prathyu ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;
 
    if( prathyu.user_id !== user_id ){
      return utils.forbidden( res );
    }
 
    prathyu.content    = req.body.content;
    prathyu.updated_at = Date.now();
    prathyu.save( function ( err, prathyu, count ){
      if( err ) return next( err );
 
      res.redirect( '/' );
    });
  });
};
 
// ** express turns the cookie key to lowercase **
exports.current_user = function ( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;
 
  if( !user_id ){
    res.cookie( 'user_id', utils.uid( 32 ));
  }
 
  next();
};