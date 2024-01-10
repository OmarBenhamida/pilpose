export class Utils { 
    public static isNullOrEmpty(src: String): Boolean { 
        return src === undefined || src === null || src.length === 0 || src.trim().length === 0; 
    } 
    public static isNullOrUndefined(obj: any) { 
        return obj === undefined || obj === null; 
    } 

    public static  contentToBlob(content: any, contentType:string): Blob {
        const binary = atob(content.replace(/\s/g, ''));
        const len = binary.length;
        const buffer = new ArrayBuffer(len);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([view], { type: contentType });
        return blob;
      }
    
}
