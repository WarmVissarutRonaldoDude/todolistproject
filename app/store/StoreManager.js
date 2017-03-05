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
      const noteTemplate = Object.assign({ id }, noteModel);
      const note = new Note(noteTemplate);
      const currentStoreLocalStorage = window.localStorage.store ?
        JSON.parse(window.localStorage.store) : {};
      if (!currentStoreLocalStorage.note) {
        currentStoreLocalStorage.note = {};
      }
      currentStoreLocalStorage.note[id] = note;
      window.localStorage.store = JSON.stringify(currentStoreLocalStorage);

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
    //TODO
  }

  updateNote(noteModel) {

  }
}

export default new StoreManager();
