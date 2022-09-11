export interface ISendMail {
    from:string;
    to:string|string[];
    subject:string;
    body:string;
    vars?:{};
    options?:any
}
