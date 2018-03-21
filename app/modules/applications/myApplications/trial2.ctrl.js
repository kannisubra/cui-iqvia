angular.module('applications')
.controller('trial2Ctrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http) {
	const myApplications = this
    const userId = User.user.id
    const loaderName = 'myApplications.'
    let checkedLocalStorage = false
    API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','ef6928b8-cd4e-43c8-8862-71f5dbae1137']]})
        .then(res=>{
            myApplications.heartRate = res;
            console.log("trial2Ctrl"+myApplications.heartRate[0].datapoints[0].value);
        }).fail(err=>{
            console.log(err);  
        }) 

})
