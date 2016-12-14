'use strict'
import mongoose from 'mongoose'
import mongooseRedisCache from 'mongoose-redis-cache'
module.exports = (app)=>{


  const url = 'mongodb://localhost/estacionamentos'

  mongoose.Promise = require('bluebird')

  mongoose.connect(url)


  .then(() =>{
   mongoose.connection.on('error', err =>{
    console.log(`mongoose connection: `+err)
  })
   console.log(`Mongodb conectado : )`)


 })
  .catch(err => {
    console.log(`rejected promise ${err}`)
    mongoose.disconnect()      

  })

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongodb: bye : )');
      process.exit(0);
    });
  });

  mongooseRedisCache(mongoose, {
    cache: true
  })
  
}