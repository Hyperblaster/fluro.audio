'use strict';



angular.module('fluro.audio')


.directive('fluroAudio', function($compile, Fluro) {

    return {
        restrict: 'E',
        replace: true,
        template: '<div class="fluro-audio audio-{{model.assetType}}"></div>',
        controller: 'FluroAudioController',
        scope: {
            model: '=ngModel',
            ngParams: '&',
        },
        link: function($scope, $element, $attrs) {

/**/
            $scope.$watch('model', function() {
                $scope.params = $scope.ngParams();

                if (!$scope.params) {
                    $scope.params = {
                        controls: 0,
                        autoplay: 0,
                        modestbranding: 1,
                        playsinline: 1,
                        showinfo: 0,
                        theme: 'light',
                        byline: 0,
                        portrait: 0,
                        title: 0
                    }
                }


                /**/
                ///////////////////////////

                var template;

                //Clear element
                $element.empty();

                switch ($scope.model.assetType) {
                    case 'soundcloud':
                        template = '<div class="audio-embed"><soundcloud-audio track-url="model.external.soundcloud" player-vars="params"/></div>';
                        break;
                    case 'upload':
                        $scope.playUrl = Fluro.apiURL + '/get/' + $scope.model._id;
                        template = '<div class="audio-embed"><audio controls><source ng-src="{{playUrl | trustfluro}}" type="{{model.mimetype}}"></audio></div>';
                        break;
                }

                //Create the template
                if (template) {
                    var cTemplate = $compile(template)($scope);
                    $element.append(cTemplate);
                }

            })
/**/
        },


    };
})

/////////////////////////////////////////////////////

.filter('trustfluro', ['$sce',
    function($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
    }
])

/////////////////////////////////////////////////////

.controller('FluroAudioController', function($scope) {



    //console.log('Inline video', $scope.model)
    // var urlString = $fluro_url + '/get/' + $scope.id;

    //$scope.url = urlString;
})

/////////////////////////////////////////////////////

.service('AudioTools', function($http) {

    var controller = {}

    /////////////////////////////////////////////////////
/*
    controller.getSoundcloudID = function(url) {
        //Vimeo RegExp
        var reg = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
        var match = url.match(reg);
        if (match) {
            return match[3];
        }
    }
    /**/

    /////////////////////////////////////////////////////

    return controller;
});