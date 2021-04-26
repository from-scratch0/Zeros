import { Transforms, Editor, Text } from 'slate';

export const CustomEditor = {

  isFormatActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n[format] === true,
      universal: true,
    })
  
    return !!match;
  },

  toggleFormat(event, editor, format) {
    event.preventDefault()
    const isActive = this.isFormatActive(editor, format);
  
    Transforms.setNodes(
      editor,
      { [format]: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    )
  },

}