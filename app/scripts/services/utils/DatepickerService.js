'use strict';

/**
 * @ngdoc function
 * @name GameSwap.serive:LoginService
 * @description
 * # ExampleService
 */
angular.module('GameSwap')
  // use factory for services
  .factory('DatepickerService', function() {
    this.getDateConfigurationObject = function() {
        return {
          titleLabel: 'Choisissez une date',  //Optional
          todayLabel: 'Aujourd\'hui',  //Optional
          closeLabel: 'Fermer',  //Optional
          setLabel: 'Choisir',  //Optional
          setButtonType : 'button-assertive',  //Optional
          todayButtonType : 'button-assertive',  //Optional
          closeButtonType : 'button-assertive',  //Optional
          inputDate: new Date(),    //Optional
          mondayFirst: true,    //Optional
          weekDaysList: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],   //Optional
          monthList: ["Jan", "Fev", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Sept", "Oct", "Nov", "Dec"], //Optional
          showTodayButton: 'true', //Optional
          modalHeaderColor: 'bar-positive', //Optional
          modalFooterColor: 'bar-positive', //Optional
          from: new Date(),   //Optional
        }
    };

    return this;
  });

