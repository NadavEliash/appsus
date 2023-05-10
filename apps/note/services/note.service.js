import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()


export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote
}


function query() {
  return storageService.query(NOTE_KEY)
    .then(notes => {
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

function getEmptyNote() {
  return {
    id: '',
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#00d'
    },
    info: {
      title: 'Title',
      txt: 'Text here'
    }
  }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        // createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        info: {
          title: 'First try',
          txt: 'Fullstack Me Baby!'
        },
        style: {
          backgroundColor: '#00d'
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
          backgroundColor: '#00d'
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
          backgroundColor: '#00d'
        }
      }
    ]
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}



