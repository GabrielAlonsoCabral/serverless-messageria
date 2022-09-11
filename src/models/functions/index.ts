import { APIGatewayEvent } from 'aws-lambda';

export interface IAPIGatewayEvent extends Omit<APIGatewayEvent, "body">{
    body:any
  }