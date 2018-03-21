angular.module('applications')
.controller('patientDataCtrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http) {
	const myApplications = this
    const userId = User.user.id
    const loaderName = 'myApplications.'
    let checkedLocalStorage = false
    console.log('onload');

    API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','ef6928b8-cd4e-43c8-8862-71f5dbae1137']]})
    .then(res=>{
        myApplications.heartRate = res;
        console.log("patientData: "+myApplications.heartRate[0].datapoints[0].value+'\ndata1: '+myApplications.heartRate[0].datapoints[1].value);
        $scope.$apply();
    }).fail(err=>{
        console.log(err);  
    })

    API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','442687ae-06e7-458e-90ea-c3e88782c581'],['pageSize','1']]})
        .then(res=>{
            myApplications.activitySony = res;
            console.log("restingHeartRate value is"+myApplications.activitySony[0].datapoints[0].value);

            $scope.lightlyActiveMins = myApplications.activitySony[0].datapoints[1].value;
            console.log("lightlyActiveMinutes value is"+myApplications.activitySony[0].datapoints[1].value);
            console.log("marginalCalories value is"+myApplications.activitySony[0].datapoints[2].value);

            $scope.stepsSony = activitySony[0].datapoints[3].value;
            console.log("steps value is"+myApplications.activitySony[0].datapoints[3].value);

            console.log("veryActiveMinutes value is"+myApplications.activitySony[0].datapoints[4].value);
            console.log("sedentaryMinutes value is"+myApplications.activitySony[0].datapoints[5].value);
        }).fail(err=>{
            console.log(err);
    })

})
