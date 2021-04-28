import { range, reduce } from "lodash";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { createEditor, Transforms, Editor, Range, Text } from 'slate';
import { Slate, Editable, withReact, useSelected } from 'slate-react';
import { CodeElement, DefaultElement, Leaf } from "./common/customElements";
import { editBlock } from '../services/fakeArticleService';
import { CustomEditor } from "@/scripts/customEditor";
import ZerosToggle from './zerosToggle';
import _ from "lodash";

const SlateBlock = ({ blockId, initialValue }) => {
    const editor = useMemo(() => withReact(createEditor()), []);

    const [value, setValue] = useState(
        [initialValue] || [
            {
                type: 'paragraph',
                children: [{ text: 'A line of text in a paragraph.' }],
            },
        ]
    );

    const [visible, setVisible] = useState(false);
    const selected = useSelected();

    const handleChange = (value) => {
        // value
        setValue(value);
        const content = JSON.stringify(value);
        editBlock(blockId, content); 

        // toggleBar
        const selection = editor.selection;
        if(!selection || Range.isCollapsed(selection) ) setVisible(false);

        const toggleBarShow = _.debounce(() => {
            setVisible(true);
            const clientRect = document.getSelection().getRangeAt(0).getBoundingClientRect();
            const toggleBar = document.getElementById("toggle-bar");
            toggleBar.style.left = `${clientRect.left + 20}px`;
            toggleBar.style.top = `${clientRect.top - 47}px`;
            toggleBar.style.left = clientRect.left;
        }, 400);
        if(selection && !Range.isCollapsed(selection) ) { 
            toggleBarShow();
        }
    }

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
            onChange={handleChange}
        >
            {visible ? <ZerosToggle blockId={blockId}/> : null}
            <div className="slate" >
                <Editable 
                    //data-block-id={blockId}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    className="editable"
                    onKeyDown={handleKeyDown}
                />
                <div className="block-buttons">
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
            </div>
        </Slate>
    )
}

export default SlateBlock;

