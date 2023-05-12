import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()


export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getDefaultFilter,
}

// items.sort((a, b) => {
//   const nameA = a.name.toUpperCase(); // ignore upper and lowercase
//   const nameB = b.name.toUpperCase(); // ignore upper and lowercase
//   if (nameA < nameB) {
//     return -1;
//   }
//   if (nameA > nameB) {
//     return 1;
//   }

//   // names must be equal
//   return 0;
// });


function query(filterBy = {}) {
  return storageService.query(NOTE_KEY)
  .then(notes => {
      notes.sort((a, b) => {
        const noteA = a.isPinned
        const noteB = b.isPinned
        if (noteA < noteB) {
          return 1
        }
        if (noteA > noteB) {
          return -1
        }
        return 0
      })

    if (filterBy.info.txt) {
        const regExp = new RegExp(filterBy.info.txt, 'i')
        notes = notes.filter(note => regExp.test(note.info.txt) || regExp.test(note.info.title))
    }

    if (filterBy.info.title) {
      const regExp = new RegExp(filterBy.info.title, 'i')
      notes = notes.filter(note => regExp.test(note.info.title))
    }
    return notes
})
}

function get(noteID) {
  return storageService.get(NOTE_KEY, noteID)
}

function remove(noteID) {
  return storageService.remove(NOTE_KEY, noteID)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function getDefaultFilter() {
  return { info: {
    title: '',
    txt: ''
  } }
}

function getEmptyNote() {
  return {
    id: '',
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#B4FF9F'
    },
    info: {
      title: '',
      txt: ''
    }
  }
}


function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        type: 'NoteTxt',
        isPinned: true,
        info: {
          title: 'First try',
          txt: 'Fullstack Me Baby!'
        },
        style: {
          backgroundColor: '#B4FF9F'
        }
      },
      {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
          url: 'http://some-img/me',
          title: 'Bobi and Me'
        },
        style: {
          backgroundColor: '#F9FFA4'
        }
      },
      {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
          title: 'Get my stuff together',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 }]
        },
        style: {
          backgroundColor: '#B4FF9F'
        }
      },
      {
        id: 'n104',
        type: 'NoteTxt',
        isPinned: false,
        info: {
          title: 'To Remember',
          txt: 'First of all - I am the best!First of all - I am the best!First of all - I am the best!First of all - I am the best!'
        },
        style: {
          backgroundColor: '#F9FFA4'
        }
      },
      {
        id: 'n105',
        type: 'NoteTxt',
        isPinned: false,
        info: {
          title: 'First try',
          txt: 'Fullstack Me Baby!'
        },
        style: {
          backgroundColor: '#FFD59E'
        }
      },
      {
        id: 'n106',
        type: 'NoteTxt',
        isPinned: false,
        info: {
          title: 'My goal is:',
          txt: 'To finish NOTE APP!'
        },
        style: {
          backgroundColor: '#B4FF9F'
        }
      },
      {
        id: 'n107',
        type: 'NoteTxt',
        isPinned: false,
        info: {
          title: 'Someday',
          txt: 'Someday they will remember me!!'
        },
        style: {
          backgroundColor: '#FFD59E'
        }
      },
      {
        id: 'n108',
        type: 'NoteTxt',
        isPinned: false,
        info: {
          title: 'In case of fire',
          txt: 'Hello! How are you doing'
        },
        style: {
          backgroundColor: '#FFD59E'
        }
      },
      {
        id: 'n109',
        type: 'NoteTxt',
        isPinned: false,
        info: {
          title: 'Note Note',
          txt: 'I just finished to watch Game of Thrones'
        },
        style: {
          backgroundColor: '#B4FF9F'
        }
      },
      {
        id: 'n110',
        type: 'NoteTxt',
        isPinned: false,
        info: {
          title: 'Give a chance',
          txt: 'I need to give a chance to myself!'
        },
        style: {
          backgroundColor: '#FFA1A1'
        }
      },
      {
        id: 'n111',
        type: 'NoteTxt',
        isPinned: true,
        info: {
          title: 'Last try',
          txt: 'Lets see how it works'
        },
        style: {
          backgroundColor: '#FFA1A1'
        }
      }

    ]
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}



