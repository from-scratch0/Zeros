import React, { Component } from 'react';
import { getBlocks } from './services/fakeArticleService';
import SlateBlock from './slateBlock';


class AppBlocks extends Component {
    state = { 
        contents: [],
     };

    async componentDidMount() {
        const contents = await getBlocks();
        this.setState({ contents });
    }

    render() {

        return ( 
            <div className="editArea">
                <div className="slateBlocks">
                    {this.state.contents.map((item) => (<SlateBlock key={item._id} blockId={item._id} />))}
                </div>
            </div>
         );
    }
}
 
export default AppBlocks;