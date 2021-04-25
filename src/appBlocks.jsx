import React, { Component, useEffect, useState } from 'react';
import ZerosToggle from './components/zerosToggle';
import { getBlocks } from './services/fakeArticleService';
import SlateBlock from './slateBlock';
import { debounce } from 'lodash';

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

        document.onselectionchange = debounce(function(e) {
            const selection = document.getSelection();
            const clientRect = selection.getRangeAt(0).getBoundingClientRect();
            
            const toggleBar = document.getElementById("toggle-bar");
            if(!selection.isCollapsed) {
                e.preventDefault();
                    toggleBar.style.visibility = "visible";
                    toggleBar.style.left = `${clientRect.left + 20}px`;
                    toggleBar.style.top = `${clientRect.top - 40}px`;
                    toggleBar.style.left = clientRect.left;    
            } else {
                toggleBar.style.visibility = "hidden";
            }
        }, 400);

    }, [content, !document.getSelection().isCollapsed]);

    return ( 
        <div className="editArea">
            <ZerosToggle />
            <div className="slateBlocks">
                {content.map((item) => (<SlateBlock key={item._id} blockId={item._id} />))}
            </div>
        </div>
    );
}
 
export default AppBlocks;
