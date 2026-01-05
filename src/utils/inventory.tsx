export function getsize(){
    let start = 4
    let end = 15

    let sizes: number[] = []

    while (!sizes.includes(end)) {
        let size = start+=0.5
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

export const status = [
    'onhand',
    'preorder',
    'sold'
]