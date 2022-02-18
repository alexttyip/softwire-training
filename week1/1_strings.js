const {DateTime} = require('luxon');

const input = 'Publication Date,Title,Authors\n' +
    '29/07/1954,Lord of the Rings,John Ronald Reuel Tolkien\n' +
    '01/08/1996,A Game of Thrones,George Raymond Martin\n' +
    '21/06/2003,Harry Potter and the Order of the Phoenix,Joanne Rowling\n';

const header = `| ${'Pub date'.padEnd(11)} | ${'Title'.padStart(25)} | ${'Authors'.padEnd(20)} |`

console.log(header)

console.log(`|${''.padEnd(header.length - 2, '=')}|`)

input.split('\n')
    .filter((row, idx) => idx !== 0 && Boolean(row))
    .map((row) => {
        const cells = row.split(',').map((s) => s.trim());

        return ({
            pub: cells[0],
            title: cells[1],
            author: cells[2],
        })
    }).forEach(({pub, title, author}) => {
    const pubDate = DateTime.fromFormat(pub, 'dd/MM/yyyy');

    let output = `| ${pubDate.toFormat('dd MMM yyyy')} | `;

    if (title.length > 25) {
        output += `${title.substring(0, 22)}... | `
    } else {
        output += `${title.padStart(25)} | `
    }

    if (author.length > 20) {
        output += `${author.substring(0, 17)}... |`
    } else {
        output += `${author.padStart(20)} |`
    }

    console.log(output)
})
