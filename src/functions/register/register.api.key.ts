import { IAPIGatewayEvent } from '../../models/functions';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGateway } from 'aws-sdk';
import ValidatorRegisterApiKey from 'src/validators/register/register.api.key';
import { usagePlans } from 'src/utils/usagePlans';

const createApiKey = async (event:IAPIGatewayEvent) => {

  try {
    const {email="", usage_plan_id:usagePlanId=""} = event.body;

    const isValid = ValidatorRegisterApiKey({email, usagePlanId});
    if(!isValid.success) return formatJSONResponse({message:`Confira o campo ${isValid.field}.`, success:false})

    const usagePlan = usagePlans.find(_usagePlan=>_usagePlan.id===usagePlanId);
    const apiGateway = new APIGateway()

    const {id:keyId} = await apiGateway.createApiKey({
        name:email,
        description:`Made in Mars.`,
        enabled:true
    })
    .promise()

    if(!keyId) return formatJSONResponse({message: `Failed to create your api key.`,success:false });

    const responseUsagePlanKey = await apiGateway.createUsagePlanKey({
        usagePlanId:usagePlan.id,
        keyId:keyId,
        keyType:"API_KEY"
    })
    .promise()

    if(!responseUsagePlanKey) return formatJSONResponse({message: `Failed to create your usage plan api key.`,success:false });

    return formatJSONResponse({message: `Success to delivery your content.`,success:true });
      
  } catch (error) {
    console.error(error)
    return formatJSONResponse({message: `Failed to create your api_key.`,success:false,error});
  }

};

export const registerApiKey = middyfy(createApiKey);
