import React from 'react';

export const CodeElement = props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
}

export const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
}

export const Leaf = (props) => {
    const { attributes, children, leaf } = props;

    return (
            leaf.code ? (
                //<pre >
                    <code {...attributes}>{children}</code>
                ) : (
                <span
                    {...attributes}
                    style={{ 
                        fontWeight: leaf.bold ? 'bold' : 'normal',
                        fontStyle: leaf.italic ? 'italic' : 'normal',
                        textDecoration: leaf.underline ? 'underline': (leaf.linethrough ? 'line-through': null),
                    }}
                >
                    {children}
                </span>
            )
    )
}

