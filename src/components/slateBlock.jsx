import { range, reduce } from "lodash";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { createEditor, Transforms, Editor, Range, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { CodeElement, DefaultElement, Leaf } from "./common/customElements";
import { editBlock } from '../services/fakeArticleService';
import { CustomEditor } from "@/scripts/customEditor";
import ZerosToggle from './zerosToggle';
import _ from "lodash";

const SlateBlock = ({ blockId, initialValue, visible }) => {
    const editor = useMemo(() => withReact(createEditor()), []);

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

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    const handleKeyDown = (e) => {
        if (e.ctrlKey) {
            
            switch (e.key) {
                case 'b': {
                    CustomEditor.toggleFormat(e, editor, 'bold');
                    break;
                }

                case 'e': {
                    CustomEditor.toggleFormat(e, editor, 'code');
                    break;
                }
                
                case 'i': {
                    CustomEditor.toggleFormat(e, editor, 'italic');
                    break;
                }

                case 'u': {
                    CustomEditor.toggleFormat(e, editor, 'underline');
                    break;
                }
            }
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
            <div className="slate" >
                <Editable 
                    //data-block-id={blockId}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    className="editable"
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

export default SlateBlock;

