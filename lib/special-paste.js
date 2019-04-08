'use babel'

import { CompositeDisposable } from 'atom'

export default {
  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'special-paste:paste': () => this.paste()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  paste() {
    let editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      clipboardText = atom.clipboard.read()
      atom.clipboard.write(editor.getSelectedText())
      editor.insertText(clipboardText)
    }
  }
}
