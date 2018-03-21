angular.module('applications')
.controller('ecosystemsCtrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http) {
    const ecosystems = this
    const userId = User.user.id
    const loaderName = 'ecosystems.'
	let checkedLocalStorage = false
	
	API.cui.getGroupTemplates({'qs':[['id','1493d12f-d8cc-4b73-845b-7088a5b833bb']]})
	.then(res=>{
		ecosystems.groupTemplateDetails = res;
		console.log("kanni"+ecosystems.groupTemplateDetails[0].name[0].text);
	}).fail(err=>{
		console.log(err);
	})
	
	API.cui.getGroupTemplates2({'qs':[['parentGroupTemplateId','1493d12f-d8cc-4b73-845b-7088a5b833bb']]})
	.then(res=>{
		ecosystems.groupTemplateDetails2 = res;
		console.log("kanni"+ecosystems.groupTemplateDetails2[0].name[0].text);
		console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[0].attributeType.name);
		console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[0].value);
		console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[1].attributeType.name);
		console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[1].value);
		console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[2].attributeType.name);
		console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[2].value);
		$scope.$apply();
	}).fail(err=>{
		console.log(err);
	}) 
})