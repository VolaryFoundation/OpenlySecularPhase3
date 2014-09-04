
function str() {
  return { type: 'string', minLength: 1 }
}

module.exports = {
  type: 'object',
  properties: {
    title: str(),
    about1: {
      type: 'object',
      properties: {
        title: str(),
        content: str() 
      },
      required: [ 'title', 'content' ]
    },
    about2: {
      type: 'object',
      properties: {
        title: str(),
        content: str()
      },
      required: [ 'title', 'content' ]
    },
    about3: {
      type: 'object',
      properties: {
        title: str(),
        content: str()
      },
      required: [ 'title', 'content' ]
    },
    about4: {
      type: 'object',
      properties: {
        title: str(),
        content: str()
      },
      required: [ 'title', 'content' ]
    }
  },
  required: [ 
    'title', 
    'about1', 
    'about2',
    'about3',
    'about4'
  ]
}
