import React, { Children, Component, useEffect, useState } from 'react';
import ZerosToggle from './zerosToggle';
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

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        document.ondragstart = function(){ return false };
        document.onselectionchange = _.debounce(function(e) {
            const selection = document.getSelection();
            
            let toggleBar;
            if(!selection.isCollapsed) {
                const clientRect = selection.getRangeAt(0).getBoundingClientRect();
                e.preventDefault();
                setVisible(true);
                toggleBar = document.getElementById("toggle-bar");
                //toggleBar.style.visibility = "visible";
                toggleBar.style.left = `${clientRect.left + 20}px`;
                toggleBar.style.top = `${clientRect.top - 47}px`;
                toggleBar.style.left = clientRect.left;    
            } else {
                setVisible(false);
            }
        }, 400);
    }, [document.getSelection()]);

    return ( 
        <div id="editArea">
            {visible ? <ZerosToggle /> : null}
            <div className="slateBlocks">
                {
                    content.map(
                        (item) => <SlateBlock key={item._id} 
                                            blockId={item._id} 
                                            initialValue={_.pick(item, ["type", "children"])}
                                            visible={visible} />)
                }
            </div>
        </div>
    );
}
 
export default AppBlocks;
