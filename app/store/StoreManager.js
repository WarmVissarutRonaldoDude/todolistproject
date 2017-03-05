/**
 * @class StoreManager
 * for manage storage
 * - TODO Should store with nedb but quite lazy todo for now
 */

import Note from 'models/Note';

const uuidV4 = require('uuid/v4');


class StoreManager {

  addNote(noteModel) {
    return new Promise((resolve) => {
      const id = `${uuidV4()}`;
      const noteTemplate = Object.assign({ id, complete: false }, noteModel);
      const note = new Note(noteTemplate);
      const storageKey = `note_${id}`;
      let currentStoreLocalStorage = window.localStorage[storageKey] ?
        JSON.parse(window.localStorage[storageKey]) : {};
      currentStoreLocalStorage = note;
      window.localStorage[storageKey] = JSON.stringify(currentStoreLocalStorage);

      return resolve(note);
    });
  }

  getNoteById(id) {
    const storageKey = `note_${id}`;
    const note = window.localStorage[storageKey] ?
     JSON.parse(window.localStorage[storageKey]) : null;
    return note;
  }

  deleteNote(id) {
    return new Promise((resolve, reject) => {
      const storageKey = `note_${id}`;
      if (window.localStorage[storageKey]) {
        delete window.localStorage[storageKey];
        return resolve();
      }

      return reject('no note object in storage');
    });
  }

  /*
    options can be like filter: complete, active
  */
  getNotes(options = {}) {
    const notes = [];
    Object.entries(window.localStorage).forEach(([key, value]) => {
      if (key.indexOf('note_') === 0) {
        // Is Note noteModel
        const notesModel = JSON.parse(value);

        // filter if it have
        if (options && options.filter) {
          switch (options.filter) {
            case 'completed':
              if (notesModel.complete === true) {
                notes.push(notesModel);
              }
              break;
            case 'active':
              if (notesModel.complete === false) {
                notes.push(notesModel);
              }
              break;
            default:
              break;
          }
        } else {
          notes.push(notesModel);
        }
      }
    });
    return notes;
  }

  updateNote(noteModel) {
    return new Promise((resolve, reject) => {
      const id = noteModel.id;
      const storageKey = `note_${id}`;
      let currentStoreLocalStorage = window.localStorage[storageKey] ?
        JSON.parse(window.localStorage[storageKey]) : null;

      if (!currentStoreLocalStorage) {
        return reject(`not have reminders id : ${id} in storage`);
      }

      currentStoreLocalStorage = Object.assign(currentStoreLocalStorage, noteModel);

      window.localStorage[storageKey] = JSON.stringify(currentStoreLocalStorage);

      return resolve(currentStoreLocalStorage);
    });
  }

  setComplete(id, isComplete) {
    return new Promise((resolve, reject) => {
      const storageKey = `note_${id}`;
      const currentStoreLocalStorage = window.localStorage[storageKey] ?
        JSON.parse(window.localStorage[storageKey]) : null;

      if (!currentStoreLocalStorage) {
        return reject(`not have reminders id : ${id} in storage`);
      }

      currentStoreLocalStorage.complete = isComplete;

      window.localStorage[storageKey] = JSON.stringify(currentStoreLocalStorage);

      return resolve(currentStoreLocalStorage);
    });
  }
}

export default new StoreManager();
