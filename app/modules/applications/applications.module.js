angular.module('applications',[])
.config(['$stateProvider', ($stateProvider) => {

    const templateBase = 'app/modules/applications/';

    const returnCtrlAs = (name, asPrefix) => `${name}Ctrl as ${ asPrefix || ''}${(asPrefix? name[0].toUpperCase() + name.slice(1, name.length) : name)}`;

    const loginRequired = true;

    $stateProvider
        .state('applications', {
            url: '/applications',
            template: '<div ui-view class="cui-applications iqvia-container"></div>',
            access: loginRequired,
            abstract: true
        })
        .state('applications.allTrials', {
            url: '?page&pageSize&service.category',
            templateUrl: templateBase + 'myApplications/allTrials.html',
            controller: returnCtrlAs('allTrials'),
            access:loginRequired
        })
        .state('applications.blindFitbit', {
            url: '?page&pageSize&service.category',
            templateUrl: templateBase + 'myApplications/blindFitbit.html',
            controller: returnCtrlAs('blindFitbit'),
            access:loginRequired
        })
        .state('applications.trialOverview', {
            url: '?page&pageSize&service.category',
            templateUrl: templateBase + 'myApplications/trialOverview.html',
            controller: returnCtrlAs('trialOverview'),
            access:loginRequired
        })
        .state('applications.fitbitData1', {
            url: '?page&pageSize&service.category',
            templateUrl: templateBase + 'myApplications/fitbitData1.html',
            controller: returnCtrlAs('fitbitData1'),
            access:loginRequired
        })
        .state('applications.patientData', {
            url: '?page&pageSize&service.category',
            templateUrl: templateBase + 'myApplications/patientData.html',
            controller: returnCtrlAs('patientData'),
            access:loginRequired
        })
        .state('applications.myApplications', {
            url: '?page&pageSize&service.category',
            templateUrl: templateBase + 'myApplications/myApplications.html',
            controller: returnCtrlAs('myApplications'),
            access:loginRequired
        })
        .state('applications.ecosystems', {
            url: '?page&pageSize&service.category',
            templateUrl: templateBase + 'myApplications/ecosystems.html',
            controller: returnCtrlAs('ecosystems'),
            access:loginRequired
        })
        .state('applications.myApplicationDetails', {
            url: '/details/:appId',
            templateUrl: templateBase + 'myApplications/fitbitData1.html',
            controller: returnCtrlAs('myApplicationDetails'),
            access:loginRequired
        })
        .state('applications.newRequest', {
            url: '/request',
            templateUrl: templateBase + 'newRequestReview/newRequest.html',
            controller: returnCtrlAs('newAppRequest'),
            access:loginRequired
        })
        .state('applications.search', {
            url: '/search?name&category&page&pageSize',
            templateUrl: templateBase + 'search/applicationSearch.html',
            controller: returnCtrlAs('applicationSearch'),
            access:loginRequired
        })
        .state('applications.reviewRequest', {
            url: '/review',
            templateUrl: templateBase + 'newRequestReview/applicationReview.html',
            controller: returnCtrlAs('applicationReview'),
            access:loginRequired
        })
        .state('applications.manageApplications', {
            url: '/manage?name&page&pageSize&service.category&sortBy&grant.status&service.name',
            templateUrl: templateBase + 'myApplications/myApplications-manage.html',
            controller: returnCtrlAs('manageApplications'),
            access:loginRequired
        })
        // seperating out as it is a seperate icon on in menu
        .state('pendingAppRequests', {
            url: '/pendingAppRequests?page&pageSize&sortBy&name',
            templateUrl: templateBase + 'pendingRequests/pendingRequests.html',
            controller: returnCtrlAs('pendingAppRequests'),
            access:loginRequired
        })
        /*Organization Applications*/
        .state('applications.orgApplications', {
            url: '/organization',
            template: '<div ui-view></div>',
            abstract: true,
            access: loginRequired
        })
/*        .state('applications.orgApplications.applicationList', {
            url: '?name&page&pageSize&service.category&sortBy&grant.status',
            templateUrl: templateBase + 'orgApplications/applicationList/orgApplications-applicationList.html',
            controller: returnCtrlAs('orgApplications'),
            access: loginRequired
        })
        .state('applications.orgApplications.applicationDetails', {
            url: '/application/:appId/details',
            templateUrl: templateBase + 'orgApplications/applicationDetails/orgApplications-applicationDetails.html',
            controller: returnCtrlAs('orgApplicationDetails'),
            access: loginRequired
        })*/
        .state('applications.orgApplications.newGrant', {
            url: '/application/:appId/new-grant',
            templateUrl: templateBase + 'orgApplications/newGrant/orgApplications-newGrant.html',
            controller: returnCtrlAs('orgAppNewGrant'),
            access: loginRequired            
        });
/*        .state('applications.orgApplications.newRequest', {
            url: '/request',
            templateUrl: templateBase + 'orgApplications/appRequest/newRequest/appRequest-newRequest.html',
            controller: returnCtrlAs('orgAppRequest'),
            access: loginRequired
        })
        .state('applications.orgApplications.newRequestReview', {
            url: '/request/review',
            templateUrl: templateBase + 'orgApplications/appRequest/newRequestReview/appRequest-newRequestReview.html',
            controller: returnCtrlAs('orgAppRequestReview'),
            access: loginRequired
        })
        .state('applications.orgApplications.search', {
            url: '/search?name&category&page&pageSize',
            templateUrl: templateBase + 'orgApplications/search/orgApplications-search.html',
            controller: returnCtrlAs('orgAppSearch'),
            access: loginRequired
        });*/
}]);
