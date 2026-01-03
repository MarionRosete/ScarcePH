export function getsize(){
    let start = 4
    let end = 15

    let sizes: number[] = []

    while (!sizes.includes(end)) {
        let size = start+=0.5
        console.log('start', start)
        console.log('size', size)
        sizes.push(size)
    }

    return sizes
}

export const condition = [
    'new in box',
    'new no box',
    'as new in box',
    'as new no box',
    'used in box',
    'used no box'
]