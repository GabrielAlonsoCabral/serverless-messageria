export default function ValidatorSendMail(body:any){
    try {
        if(!body.from || (typeof body.from!=="string" || !body.from.length ) ) return {success:false, field:"to"};
        if(!body.to || (typeof body.to!=="string" && !Array.isArray(body.to)) ) return {success:false, field:"to"};
        if(!body.body || typeof body.body!=="string") return {success:false, field:"body"};
        if(!body.subject || typeof body.subject!=="string") return {success:false, field:"subject"};

        if(body.vars && typeof body.vars!=="object") return {success:false, field:"vars"};        
        return ({success:true})
    } catch (error) {
        return ({success:false, error})
    }
}