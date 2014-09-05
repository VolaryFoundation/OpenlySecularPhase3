
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
    },
    downloads: {
      type:'object',
      properties: {
        title: str(),
        list: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: str(),
            }
          }
        }
      }
    },
    resources: {
      type:'object',
      properties: {
        title: str(),
        list: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: str(),
              desc: str(),
              link: {
                type: 'string',
                _format: 'uri'
              }
            }
          }
        }
      }
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
