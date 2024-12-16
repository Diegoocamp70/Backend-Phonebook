const mongoose = require('mongoose')

if (process.argv.length<5) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];
const name = process.argv[3];
const phone = process.argv[4];
const url =
  `mongodb+srv://ocampodiego834:${password}@cluster0.ow9vo.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personShema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('Person', personShema)

const person = new Person({
     name: name,
    phone: phone,

})

person.save().then(result => {
    console.log('persone saved to phonebook!')
    
    
  })


Person.find({}).then(person => {
    person.forEach(person => {
      console.log(process.argv[3] + process.argv[4])
    })
    mongoose.connection.close()
  })

