/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

// Import statements in Polymer 3.0 can now use package names.
// polymer-element.js now exports PolymerElement instead of Element,
// so no need to change the symbol.
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import './to-do-input.js';

// Set to do items id
let toDoId = 1;

class ToDoListApp extends PolymerElement {
  static get properties() {
    return {
      toDoItems: {
        type: Array,
        value() {
          return [
            {
              id: toDoId++,
              text: 'Find Nessie'
            },
            {
              id: toDoId++,
              text: 'Go West'
            }
          ];
        }
      }
    };
  }

  addToDo(event) {
    // Fire when user press 'enter'
    if (event.which === 13 || event.keyCode === 13) {
      // Catch input value
      let toDoText = this.$.toDoInput.$.toDoInput.value;
      // Populate new array item
      let toDo = {
        id: toDoId++,
        text: toDoText
      };
      // Push to array, Polymer style
      this.push('toDoItems', toDo);
      // Clear input
      this.$.toDoInput.$.toDoInput.value = '';
    }
  }

  // I failed this one...
  // Update, i got it to work... it certainly is not pretty.. but it works for now
  // Input appreciated.
  removeToDoItem(e) {
    console.log(typeof e.target);
    console.log(e.target.parentNode.id);
    console.log('target', e.target);
    console.log(this.toDoItems);
    this.toDoItems = this.toDoItems.filter(todo => {
      console.log('todo: ', todo);
      console.log(this.toDoItems);
      return todo.id !== Number(e.target.parentNode.id);
    });
    console.log(this.toDoItems);
  }

  static get template() {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>

      </style>

      <h1>Polymer To Do</h1>

      <ol>
        <li>
          <to-do-input id="toDoInput" on-keydown="addToDo"></to-do-input>
        </li>
      </ol>


      <template is="dom-if" if=[[toDoItems.length]]>
        <ul>
          <template is="dom-repeat" id="todo" items="{{toDoItems}}">
            <li id="{{item.id}}">{{item.text}} # {{item.id}}<button on-click="removeToDoItem">X</button</li>
          </template>
        </ul>
      </template>
    `;
  }
}

// Register the element with the browser.
customElements.define('to-do-list-app', ToDoListApp);
