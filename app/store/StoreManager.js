/**
 * @class StoreManager
 * for manage storage
 * - TODO Should store with nedb but quite lazy todo for now
 */

import { EventEmitter } from 'events';

import Note from 'models/Note';

import _ from 'lodash';
const uuidV4 = require('uuid/v4');


class StoreManager extends EventEmitter {

  constructor() {
    super();
  }

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
    //TODO
  }

  /*
    options can be like filter: complete, active
  */
  getNotes(options = {}) {
    // TODO defaults is all
    const notes = [];
    Object.entries(window.localStorage).forEach(([key, value]) => {
      if (key.indexOf('note_') === 0) {
        // Is Note noteModel
        const notesModel = JSON.parse(value);

        // filter if it have
        if (options && options.filter) {
          switch (options.filter) {
            case 'complete':
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
    // TODO
  }

  setComplete(isComplete) {
    // TODO
  }
}

export default new StoreManager();
