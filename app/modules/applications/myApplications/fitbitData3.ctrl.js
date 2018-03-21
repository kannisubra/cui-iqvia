angular.module('applications')
.controller('fitbitData3Ctrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http) {
	const myApplications = this
    const userId = User.user.id
    const loaderName = 'myApplications.'
    let checkedLocalStorage = false
    console.log('fitbitData3: onload');

    //pulse kanni
    // API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','ef6928b8-cd4e-43c8-8862-71f5dbae1137']]})
    //     .then(res=>{
    //         myApplications.heartRate = res;
    //         console.log("kanni"+myApplications.heartRate[0].datapoints[0].value);
    //     }).fail(err=>{
    //         console.log(err);
    // }) 
    //out of range kanni     
    // API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7'],['pageSize','1']]})
    //     .then(res=>{
    //         myApplications.outofrange = res;
    //         console.log("min value is"+myApplications.outofrange[0].datapoints[0].value);
    //         console.log("max value is"+myApplications.outofrange[0].datapoints[1].value);
    //         console.log("minutes value is"+myApplications.outofrange[0].datapoints[2].value);
    //         console.log("caloriesout value is"+myApplications.outofrange[0].datapoints[3].value);
    //     }).fail(err=>{
    //         console.log(err);
    // })

    //fatburn kanni     
    // API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','49556f1f-bc41-4a91-b048-7832f62dcb5c'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7'],['pageSize','1']]})
    //     .then(res=>{
    //         myApplications.fatburnKanni = res;
    //         console.log("min value is"+myApplications.fatburnKanni[0].datapoints[0].value);
    //         console.log("max value is"+myApplications.fatburnKanni[0].datapoints[1].value);
    //         console.log("minutes value is"+myApplications.fatburnKanni[0].datapoints[2].value);
    //         console.log("caloriesout value is"+myApplications.fatburnKanni[0].datapoints[3].value);
    //     }).fail(err=>{
    //         console.log(err); 
    // })

    //cardio kanni     
    // API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','3cf284cf-9699-4945-a5a8-f7fe6a939bc2'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7'],['pageSize','1']]})
    //     .then(res=>{
    //         myApplications.cardioKanni = res;
    //         console.log("min value is"+myApplications.cardioKanni[0].datapoints[0].value);
    //         console.log("max value is"+myApplications.cardioKanni[0].datapoints[1].value);
    //         console.log("minutes value is"+myApplications.cardioKanni[0].datapoints[2].value);
    //         console.log("caloriesout value is"+myApplications.cardioKanni[0].datapoints[3].value);
    //     }).fail(err=>{
    //         console.log(err);
    // })

    //peak kanni     
    // API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','3b41bfb4-42ea-4858-9e53-c3bcca60a337'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7'],['pageSize','1']]})
    //     .then(res=>{
    //         myApplications.peakKanni = res;
    //         console.log("min value is"+myApplications.peakKanni[0].datapoints[0].value);
    //         console.log("max value is"+myApplications.peakKanni[0].datapoints[1].value);
    //         console.log("minutes value is"+myApplications.peakKanni[0].datapoints[2].value);
    //         console.log("caloriesout value is"+myApplications.peakKanni[0].datapoints[3].value);
    //     }).fail(err=>{
    //         console.log(err);
    // })

    //Steps and Activity   
    API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7'],['pageSize','1']]})
        .then(res=>{
            myApplications.activity = res;
            console.log("restingHeartRate value is"+myApplications.activity[0].datapoints[0].value);

            $scope.lightlyActiveMins = myApplications.activity[0].datapoints[1].value;
            console.log("lightlyActiveMinutes value is"+myApplications.activity[0].datapoints[1].value);

            console.log("marginalCalories value is"+myApplications.activity[0].datapoints[2].value);

            $scope.userSteps = myApplications.activity[0].datapoints[3].value;
            console.log("steps value is"+myApplications.activity[0].datapoints[3].value);

            console.log("veryActiveMinutes value is"+myApplications.activity[0].datapoints[4].value);
            console.log("sedentaryMinutes value is"+myApplications.activity[0].datapoints[5].value);
            $scope.$apply();
        }).fail(err=>{
            console.log(err); 
    })  

    //Steps and Activity for Sony  
    // API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','442687ae-06e7-458e-90ea-c3e88782c581'],['pageSize','1']]})
    //     .then(res=>{
    //         myApplications.activitySony = res;
    //         console.log("restingHeartRate value is"+myApplications.activitySony[0].datapoints[0].value);
    //         console.log("lightlyActiveMinutes value is"+myApplications.activitySony[0].datapoints[1].value);
    //         console.log("marginalCalories value is"+myApplications.activitySony[0].datapoints[2].value);
    //         console.log("steps value is"+myApplications.activitySony[0].datapoints[3].value);
    //         console.log("veryActiveMinutes value is"+myApplications.activitySony[0].datapoints[4].value);
    //         console.log("sedentaryMinutes value is"+myApplications.activitySony[0].datapoints[5].value);
    //     }).fail(err=>{
    //         console.log(err);
    // })

    // API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','ef6928b8-cd4e-43c8-8862-71f5dbae1137']]})
    //     .then(res=>{
    //         myApplications.heartRate = res;
    //         console.log("data0: "+myApplications.heartRate[0].datapoints[0].value+'\ndata1: '+myApplications.heartRate[0].datapoints[1].value);
    //         $scope.$apply();
    //     }).fail(err=>{
    //         console.log(err);  
    // })

})
