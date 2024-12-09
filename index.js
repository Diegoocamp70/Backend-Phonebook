const express = require('express')
const app = express()
var morgan = require('morgan')




let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.use(express.static('dist'))

app.use(morgan('tiny'))

const cors = require('cors')
app.use(cors())


morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/info', (request, response) => {
    response.send( `<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`)

  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(persons => persons.id !== id)
    response.status(204).end()
  })
  
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1  
  }

 

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.number && !body.name ) { 
      return response.status(400).json({ 
        error: 'the name or number is missing' 
      })
    }
  
    const person = {
        id: generateId(),
        name: body.name,
      content: body.content,
      number: body.number,
      important: Boolean(body.important) || false,
      
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})