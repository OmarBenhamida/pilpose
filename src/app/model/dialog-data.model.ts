
export class DialogData {

  constructor(
    public title: string,
    public action: string,
    public userMessage: string,
    public userMessageInMultiLine: string,
    public isMultiModeEnabled: boolean,
    public successUrl: string,
    public isConfirm: boolean,
    public model: any){
    
    }
  }