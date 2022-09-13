export class MlVndError extends Error {
    public status: number
  
    constructor(public message: string, status:number = 400) {
        super()
        this.status = status
        this.message = message
    }
}