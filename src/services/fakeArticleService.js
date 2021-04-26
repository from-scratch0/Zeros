
const blocks = [
    {
        _id: "01",
        type: 'paragraph',
        children: [{ text: 'Hello World!' }],
    },
    {
        _id: "02",
        type: 'paragraph',
        children: [{ text: 'Welcome to ZEROS!' }],
    },
    {
        _id: "03",
        type: 'paragraph',
        children: [{ text: '请点击任何地方开始你的书写。' }],
    },
    {
        _id: "04",
        type: 'paragraph',
        children: [{ text: '选取你需要' }, { text: '特殊处理', bold: true }, { text: '的' }, { text: '文本 ', italic: true }, { text: '进行' }, { text: '各种', underline: true }, { text: '你想要的处理' }],
    },
];

export function getBlocks() {
    return blocks;
}

export function getBlock(blockId) {
    return blocks.find((m) => m._id === blockId);
}

export function editBlock(blockId, content) {
    let blockInDb = blocks.find((m) => m._id === blockId) || {};
    blockInDb.children = content;
  
    if (!blockInDb._id) {
        blockInDb._id = Date.now().toString();
        blocks.push(blockInDb);
    }
  
    return blockInDb;
}