import React, { Children, Component, useEffect, useState } from 'react';
import { useSlate, SlateProvider } from 'slate-react';
import { getBlocks } from '../services/fakeArticleService';
import SlateBlock from './slateBlock';
import _ from "lodash";

function getContent(){
    return new Promise((resolve)=>{ 
                    resolve(getBlocks()); 
                    }
                );
}

const AppBlocks = () => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        getContent().then(res=>{
            setContent(res);
        });
    }, [content]);

    document.ondragstart = function(){ return false };

    const addBlock = (blockId) => {
        const newItem = {
            _id: Date.now().toString(),
            type: 'paragraph',
            selection: {
                anchor: { path: [0, 0], offset: 0 },
                focus: { path: [0, 0], offset: 2 },
              },
            children: [{ text: '' }],
        };
        content.splice(_.findIndex(content, (item) => (item._id == blockId)) + 1, 
                                        0, newItem);
        setContent(content.slice()); //
          
        // const point = Editor.start(editor, [0, 0]);
    }

    return ( 
        <div id="editArea">         
                <div className="slateBlocks">
                    {
                        content.map(
                            (item) => <SlateBlock key={item._id} 
                                                blockId={item._id} 
                                                initialValue={_.pick(item, ["type","selection","children"])} 
                                                addBlock={addBlock}/>)
                    }
                </div>
            
        </div>
    );
}
 
export default AppBlocks;
