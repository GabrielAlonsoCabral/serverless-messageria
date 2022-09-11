import { IAPIGatewayEvent } from '../../models/functions';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import MailService from 'src/services/MailService';
import ValidatorSendMail from 'src/validators/email/send';

const sendMail = async (event:IAPIGatewayEvent) => {

  try {
    const {from="",to="", subject="", body="", vars=null, options=null} = event.body;
    
    const result  = ValidatorSendMail(event.body);
    if(!result.success) return formatJSONResponse({message: `Invalid field ${result.field}`,success:false});

    const mailService = new MailService();
    const responseMail = await mailService.send({
      from,
      to,
      subject,
      body,
      vars,
      options
    });
    
    if(!responseMail.success) return formatJSONResponse({
      message: `Failed to delivery your content.`,
      success:false,
    });
    
    return formatJSONResponse({
      message: `Success to delivery your content.`,
      success:true,
    });
      
  } catch (error) {
    
    return formatJSONResponse({
      message: `Failed to delivery your content.`,
      success:false,
      error
    });

  }

};

export const sendEmail = middyfy(sendMail);
