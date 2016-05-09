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

  async load() {
    this.contest = (await this.Contest.get(this.$stateParams.id)).data;
    this.availableChallenges = (await this.Contest.getAvailableChallenges(this.$stateParams.id)).data;
    this.$rootScope.$apply();
  }

  async doAddContest() {
    await this.Contest.addChallenge(this.$stateParams.id, this.contestChallenge);
    this.toastr.success(this.$translate.instant('ui.page.manage.contest.challenge.add.successMsg'));
    this.$state.go('manage_contest_info', {id: this.$stateParams.id});
  }
}

Controller.$inject = ['toastr', '$translate', '$state', '$stateParams', '$rootScope', 'Contest'];

angular
  .module('dummyctf.dashboard')
  .controller('manageContestChallengeAddController', Controller);
