'use babel';

import SpecialPasteView from './special-paste-view';
import { CompositeDisposable } from 'atom';

export default {

  specialPasteView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.specialPasteView = new SpecialPasteView(state.specialPasteViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.specialPasteView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'special-paste:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.specialPasteView.destroy();
  },

  serialize() {
    return {
      specialPasteViewState: this.specialPasteView.serialize()
    };
  },

  toggle() {
    console.log('SpecialPaste was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
