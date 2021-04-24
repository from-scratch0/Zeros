
const blocks = [
    {
        _id: "01",
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
    {
        _id: "02",
        type: 'paragraph',
        children: [{ text: '有一句话在该段落。' }],
    },
];

export function getBlocks() {
    return blocks;
}

export function getBlock(blockId) {
    return blocks.find((m) => m._id === blockId);
  }