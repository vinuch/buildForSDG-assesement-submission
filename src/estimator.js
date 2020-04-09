function getFactor(periodType, time) {
  let factor;
  if (periodType === 'days') {
    factor = Math.floor(time / 3);
  } else if (periodType === 'weeks') {
    factor = Math.floor(time / 3);
  } else if (periodType === 'months') {
    factor = Math.floor(time / 3);
  } else {
    return 'Invalid data type';
  }

  return factor;
}
const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      get infectionsByRequestedTime() {
        return this.currentlyInfected * getFactor(input.periodType, input.timeToElapse);
      },
      get severeCasesByRequestedTime() { return 0.15 * this.infectionsByRequestedTime; },
      hospitalBedsByRequestedTime: 0.35 * input.totalHospitalBeds,
      get casesForICUByRequestedTime() { return 0.5 * this.infectionsByRequestedTime; },
      get casesForVentilatorsByRequestedTime() { return 0.2 * this.infectionsByRequestedTime; },
      get dollarsInFlight() {
        return this.infectionsByRequestedTime * input.region.avgDailyIncomePopulation
        * input.region.avgDailyIncomeInUSD * input.timeToElapse;
      }
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      get infectionsByRequestedTime() { return this.currentlyInfected * (2 ** 10); },
      get severeCasesByRequestedTime() { return 0.15 * this.infectionsByRequestedTime; },
      hospitalBedsByRequestedTime: 0.35 * input.totalHospitalBeds,
      get casesForICUByRequestedTime() { return 0.5 * this.infectionsByRequestedTime; },
      get casesForVentilatorsByRequestedTime() { return 0.2 * this.infectionsByRequestedTime; },
      get dollarsInFlight() {
        return this.infectionsByRequestedTime * input.region.avgDailyIncomePopulation
        * input.region.avgDailyIncomeInUSD * input.timeToElapse;
      }
    }
  };
};

export default covid19ImpactEstimator;
