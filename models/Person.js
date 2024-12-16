const mongoose = require('mongoose')
require('dotenv').config({ path: './Entorno.env' });

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)


mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


  const personShema = new mongoose.Schema({
    name: {
    type:  String,
    required: true,
    minLength: 3
    },
    number: {
    type:  String,
    required: true,
    minLength: 10,
    validate:{
      validator: function(number) {
        return  /\d{3}-\d{7}/.test(number);
        
      },
      message: props => `${props.value} is not a valid phone number!, it should be in the format xxx-xxxxxxx`
    },
    },
  })

  

/* document el documento original de mongoose
returnedObject el objecto que sera convertido a json

el meotodo tojson es para definir tranformaciones personalizdaas
 antes de que los documentos devueltos se conviertan en json


*/
  
  personShema.set('toJSON', {
    transform: (document, returnedObject) => {
      // Convertir _id a id
      returnedObject.id = returnedObject._id.toString();
      // Eliminar propiedades no deseadas
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });

 

  module.exports = mongoose.model('Person', personShema)


 