import React, { useMemo, useState } from "react";
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { getBlock } from "./services/fakeArticleService";

const SlateBlock = ({ blockId }) => {
    const editor = useMemo(() => withReact(createEditor()), []);

    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem(blockId)) || [
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        },
        ]
    );

    return (
        <Slate 
            editor={editor} 
            value={value} 
            onChange={newValue => {
                setValue(newValue)
                const content = JSON.stringify(value)
                localStorage.setItem(blockId, content)
            }}
        >
            <div className="slate">
                <Editable 
                    className="editable"
                    onMouseover={event => {
                        event.preventDefault();
                    }}
                />
                <button
                    className="switch"
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