import { ISendMail } from "src/models/services";
import * as nodemailer from "nodemailer"
import test from "src/templates/test";

export default class MailService{
    private transporter:nodemailer.Transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host:process.env.AWS_PINPOINT_HOST,
            port:465,
            secure:true,
            auth:{
                user:process.env.AWS_PINPOINT_USER,
                pass:process.env.AWS_PINPOINT_PASS
            },
            tls:{
                rejectUnauthorized:true
            }
        })
    }

    async send(content:ISendMail){
        return this.transporter.sendMail({
            from:content.from,
            to:content.to,
            subject:content.subject,
            html:test()
        })
        .then(result=>({success:true, error:false, result}))
        .catch(error=>({success:false, error:error}))
     }

}