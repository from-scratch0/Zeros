
const blocks = [
    {
        _id: "01",
        type: 'paragraph',
        children: [{ text: 'Hello World!' }],
    },
    {
        _id: "02",
        type: 'paragraph',
        children: [{ text: '请点击任何地方开始你的书写。' }],
    },
    {
        _id: "03",
        type: 'paragraph',
        children: [{ text: '选取你需要特殊处理的文本进行加粗、删除线、高亮、斜体等一系列处理。' }],
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