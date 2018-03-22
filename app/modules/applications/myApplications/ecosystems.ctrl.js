angular.module('applications')
.controller('ecosystemsCtrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http) {
    const ecosystems = this
    const userId = User.user.id
    const loaderName = 'ecosystems.'
<<<<<<< HEAD
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
            console.log("kanni"+ecosystems.groupTemplateDetails2[0].name[0].text);
            console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[0].attributeType.name);
            console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[0].value);
            console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[1].attributeType.name);
            console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[1].value);
            console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[2].attributeType.name);
            console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[2].value);
            API.cui.getGroupMemberships({groupId:'6638076f-c0f3-4acb-9cdf-3474df0db702'})
            .then(res=>{
                    ecosystems.groupMembers = res;
            console.log("kanni member id is"+ecosystems.groupMembers[0].member.id);
            
            API.cui.getGroupMemberships({groupId:'16709023-3d26-4b83-81a7-15b01af46c77'})
            .then(res=>{
                    ecosystems.groupMembers2 = res;
            console.log("kanni member id is"+ecosystems.groupMembers2[0].member.id);
            console.log("kanni member id is"+ecosystems.groupMembers2[1].member.id);
            
            API.cui.getGroupMemberships({groupId:'bb9e27f3-8026-4efa-8584-477f12cd9a07'})
            .then(res=>{
                    ecosystems.groupMembers3 = res;
            console.log("kanni member id is"+ecosystems.groupMembers3[0].group.name[0].text);
                }).fail(err=>{
                        console.log(err);

            })            
                }).fail(err=>{
                        console.log(err);

            }) 
                }).fail(err=>{
                        console.log(err);

                }) 
                                       API.cui.getGroupMemberships({groupId:'6638076f-c0f3-4acb-9cdf-3474df0db702'})
            .then(res=>{
                    ecosystems.groupMembers4 = res;
            console.log("kanni member id is"+ecosystems.groupMembers4[0].member.id);
            
            API.cui.getGroupMemberships({groupId:'f381ee6f-df2f-48fa-8bdc-5d233256455b'})
            .then(res=>{
                    ecosystems.groupMembers5 = res;
            console.log("kanni member id is"+ecosystems.groupMembers5[0].member.id);
            console.log("kanni member id is"+ecosystems.groupMembers5[1].member.id);
            
            API.cui.getGroupMemberships({groupId:'3002d166-ee74-479e-87b7-3847c66e2b6b'})
            .then(res=>{
                    ecosystems.groupMembers6 = res;
            console.log("kanni member id is"+ecosystems.groupMembers6[0].group.name[0].text);
                }).fail(err=>{
                        console.log(err);

            })            
                }).fail(err=>{
                        console.log(err);

            }) 
                }).fail(err=>{
                        console.log(err);

                }) 
        }).fail(err=>{
                console.log(err);
               
        }) 
        
        
})
=======
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

		console.log('res.length='+res.length+'\nres[0].name[0].text: '+res[0].name[0].text);
		
		// $scope.$apply();
	}).fail(err=>{
		console.log(err);
	}) 
})
>>>>>>> ac46092714510b3b913b9eb3f418deb2a9bf5f21
