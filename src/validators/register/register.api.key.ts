import {usagePlans} from "../../utils/usagePlans";
import validator from "validator";

export default function ValidatorRegisterApiKey(body:any){
    try {
        if(!usagePlans.some(plan=> plan.id===body.usagePlanId)) return {success:false, field:"usage_plan"};
        if(!validator.isEmail(body.email)) return {success:false, field:"email"};
        
        return ({success:true})
    } catch (error) {
        return ({success:false, error})
    }
}