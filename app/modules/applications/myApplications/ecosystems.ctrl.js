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
            console.log("kanni"+ecosystems.groupTemplateDetails2[0].name[0].text);
            console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[0].attributeType.name);
            console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[0].value);
            console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[1].attributeType.name);
            console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[1].value);
            console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[2].attributeType.name);
            console.log("kanni"+ecosystems.groupTemplateDetails2[0].attributes[2].value);
            API.cui.getGroupMemberships({groupId:ecosystems.groupTemplateDetails2[0].id})
            .then(res=>{
                    ecosystems.groupMembers = res;
            console.log("kanni member id is"+ecosystems.groupMembers[0].member.id);
            
            API.cui.getGroupMemberships({groupId:ecosystems.groupMembers[0].member.id})
            .then(res=>{
                    ecosystems.groupMembers2 = res;
            console.log("kanni member id is"+ecosystems.groupMembers2[0].member.id);
            console.log("kanni member id is"+ecosystems.groupMembers2[1].member.id);
            
            API.cui.getGroupMemberships({groupId:ecosystems.groupMembers2[1].member.id})
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
        }).fail(err=>{
                console.log(err);
               
        }) 
        
        
})
