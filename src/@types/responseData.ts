interface ResponseProps {
    get: string;
    voiceResponse: string;
    calendar: {
        date : Date | null
        subject : string
    }
}
  
export type Response = Partial<ResponseProps>;

export const responseData : Response  = {
    get : '',
    voiceResponse: '',
    calendar: {
        date : null,
        subject: '',
    }
}