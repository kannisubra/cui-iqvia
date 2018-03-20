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

})
