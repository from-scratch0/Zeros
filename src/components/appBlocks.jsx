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
    }, [content])

    document.ondragstart = function(){ return false };

    return ( 
        <div id="editArea">         
                <div className="slateBlocks">
                    {
                        content.map(
                            (item) => <SlateBlock key={item._id} 
                                                blockId={item._id} 
                                                initialValue={_.pick(item, ["type", "children"])} />)
                    }
                </div>
            
        </div>
    );
}
 
export default AppBlocks;
