import React, { Component } from 'react';
import { CustomEditor } from "@/scripts/customEditor";

const ZerosToggle = () => {
    const toggleItems = [
        { func: "bold", label: "B" },
        { func: "italic", label: "i" },
        { func: "underline", label: "U" },
        { func: "linethrough", label: "S" },
        { func: "code", label: "<>" },
    ];

    return ( 
        <div id="toggle-bar" className="btn-group btn-group-sm" role="group" aria-label="First group">
            { toggleItems.map((item) => {
                return <button key={item.func} type="button" className="btn btn-light" 
                    style={{ 
                        fontWeight: item.label == "B" ? 'bold' : 'normal',
                        fontStyle: item.label == "i" ? 'italic' : 'normal',
                        textDecoration: item.label == "U" ? 'underline': (item.label == "S" ? 'line-through': null),
                    }}
                    onMouseDown={(e) => {
                    }}
                >
                    {item.label}
                </button> 
            })}
        </div> 
     );
}
 
export default ZerosToggle;
