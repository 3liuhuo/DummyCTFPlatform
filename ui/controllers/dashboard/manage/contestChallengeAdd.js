import angular from 'angular';
import ServiceInjector from 'utils/ServiceInjector';

export default class Controller extends ServiceInjector {
  constructor(...args) {
    super(...args);
    this.contestChallenge = {
      score: 100,
      scoreDecrease: 0,
      minScore: 100,
    };
    this.load();
  }

  load() {
    this.Contest
      .get(this.$stateParams.id)
      .then(resp => {
        this.contest = resp.data;
      });
    this.Contest
      .getAvailableChallenges(this.$stateParams.id)
      .then(resp => {
        this.availableChallenges = resp.data;
      });
  }
}

Controller.$inject = ['dialogs', 'toastr', '$translate', '$state', '$stateParams', 'Contest'];

angular
  .module('dummyctf.dashboard')
  .controller('manageContestChallengeAddController', Controller);
