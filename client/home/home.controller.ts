
export class HomeComponent {
  
  slides:Array<any>;
  myInterval = 5000;
  noWrapSlides = false;

   constructor() {
     this.slides = [
      {
        image: '/images/1.png', text: '', id: 0
      },
      {
        image: '/images/2.png', text: '', id: 1
      },
      {
        image: '/images/3.png', text: '', id: 2
      },
      {
        image: '/images/4.png', text: '', id: 3
      },
      {
        image: '/images/5.png', text: '', id: 4
      },
      {
        image: '/images/6.png', text: '', id: 5
      }      
     ];
   }
}

angular.module('spartinHouseHomeApp', ['ui.bootstrap', 'ngAnimate']).controller('homeController', function() {
  
}).component('home', {
    controller: HomeComponent,
    template: `
      <uib-carousel active="active" interval="$ctrl.myInterval" no-wrap="$ctrl.noWrapSlides">
        <uib-slide ng-repeat="slide in $ctrl.slides track by slide.id" index="slide.id">
          <img ng-src="{{slide.image}}" style="margin:auto;">
        </uib-slide>
      </uib-carousel>`
});