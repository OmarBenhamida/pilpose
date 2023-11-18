export class Utils { 
    public static isNullOrEmpty(src: String): Boolean { 
        return src === undefined || src === null || src.length === 0 || src.trim().length === 0; 
    } 
    public static isNullOrUndefined(obj: any) { 
        return obj === undefined || obj === null; 
    } 
    
}
