utils = require('./utils')


const cmdList = utils.readLinesAsStringArray('finput')
const fileSystem = { '/': {} }
let currPointer = fileSystem;
cmdList.forEach((cmd, i) => {
    switch (cmd.substring(0, 4)) {
        case '$ cd':
            const folder = cmd.split(' ')[2]
            if (folder === "..") {
                currPointer = currPointer.parent
            } else if (folder === '/') {
                currPointer = fileSystem['/']
            } else {
                if (!currPointer[folder]) {
                    currPointer[folder] = {}
                }
                const parent = currPointer;
                currPointer = currPointer[folder];
                currPointer.parent = parent;
            }
            break;
        case '$ ls':
            let nextCmdIndex = cmdList.slice(i + 1).findIndex(e => e.startsWith('$'))
            if (nextCmdIndex === -1) {
                nextCmdIndex = cmdList.length;
            }
            const lsOutput = cmdList.slice(i + 1, nextCmdIndex + i + 1);
            const files = lsOutput.filter(out => !out.startsWith('dir'))
            files.forEach(file => {
                currPointer['file ' + file.split(' ')[1]] = file.split(' ')[0];
            })
            break;
        default:
            break;

    }
})

const fileSystemIter = (pointer, lessThan) => {
    const subFolders = Object.keys(pointer).filter(element => !element.startsWith('file') && element !== 'parent' && element !== 'totSize')
    const subContains = subFolders.reduce((tot, folder) =>
        tot + fileSystemIter(pointer[folder], lessThan)
        , 0)
    const files = Object.keys(pointer).filter(out => out.startsWith('file'))
    const size = files.reduce((tot, file) => {
        return tot + +pointer[file]
    }, 0)
    lessThan.push(size + subContains)
    return subContains + size
}
const allFolderSizes = []
fileSystemIter(fileSystem['/'], allFolderSizes)
//p1
console.log(allFolderSizes.reduce((p, n) => p + (n <= 100000 ? n : 0), 0))
//p2
const minSize = 30000000 - (70000000 - allFolderSizes[allFolderSizes.length - 1])
console.log(allFolderSizes.reduce((p, n) => (n < p && n >= minSize ? n : p), 700000000))