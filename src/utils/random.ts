export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomItem(items: any[]): any {
    const random = getRandomInt(0, (items.length - 1));
    return items[random];
}