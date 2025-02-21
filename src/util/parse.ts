export function removeHTML(raw: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(raw, 'text/html');
    const result = doc.firstElementChild as HTMLElement;

    return result.innerText;
}