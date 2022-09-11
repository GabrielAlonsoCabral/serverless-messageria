const AWS = require("aws-sdk");

const getUsersFreePlan = async () =>{

    const apiGateway = new AWS.APIGateway({
        region:"us-east-1"
    });
    
    const {items} = await apiGateway.getUsagePlanKeys({
        usagePlanId:"ji9rg6"
    }).promise();


    return items.map(item=>item.name)
}

const getUsersPaidPlan = async () =>{

    const apiGateway = new AWS.APIGateway({
        region:"us-east-1"
    });
    
    const {items} = await apiGateway.getUsagePlanKeys({
        usagePlanId:"jmz2ba"
    }).promise();

    return items.map(item=>item.name)
}

module.exports = {
    getUsersFreePlan,
    getUsersPaidPlan
}