import { range } from "lodash";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import { createEditor, Transforms, Editor, Range } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { getBlock, editBlock } from "./services/fakeArticleService";

const SlateBlock = ({ blockId }) => {
    const editor = useMemo(() => withReact(createEditor()), []);

    const { type: type, children: children} = getBlock(blockId);  
    const initialValue = { type, children };
    const [value, setValue] = useState(
        [initialValue] || [
            {
                type: 'paragraph',
                children: [{ text: 'A line of text in a paragraph.' }],
            },
        ]
    );

    const renderElement = useCallback(props => {
        switch (props.element.type) {
          case 'code':
            return <CodeElement {...props} />
          default:
            return <DefaultElement {...props} />
        }
    }, []);

    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            const [match] = Editor.nodes(editor, {
              match: n => n.type === 'code',
            });
            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'code' },
              { match: n => Editor.isBlock(editor, n) }
            );
        }
    }

    return (
        <Slate 
            editor={editor} 
            value={value} 
            onChange={newValue => {
                setValue(newValue);
                const content = JSON.stringify(value);
                editBlock(blockId, content);
            }}
        >
            <div className="slate">
                <Editable 
                    renderElement={renderElement}
                    className="editable"
                    onMouseover={event => {
                        event.preventDefault();
                    }}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="block-button switch"
                    onMouseDown={event => {
                        event.preventDefault();
                    }}
                >
                ···
                </button>
                <button
                    className="block-button add-after"
                    onMouseDown={event => {
                        event.preventDefault();
                    }}
                >
                +
                </button>
            </div>
        </Slate>
    )
}

const CodeElement = props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
}
  
const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
}

export default SlateBlock;