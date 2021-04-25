import React from "react";

const ToggleBar = ({ toggleItems }) => {
    return (
        <div>
            <div id="toggle-bar" className="btn-group btn-group-sm" role="group" aria-label="First group">
                { toggleItems.map((item) => 
                    <button key={item.func} type="button" className="btn btn-outline-secondary">
                        {item.label}
                    </button>
                )}
            </div> 
        </div> 
    );
}
 
export default ToggleBar;