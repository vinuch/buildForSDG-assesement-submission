function convertToDays(periodType, time) {
  let result;
  if (periodType === 'weeks') {
    result = time * 7;
  } else if (periodType === 'months') {
    result = time * 30;
  } else if (periodType === 'days') {
    result = time;
  }
  return result;
}

const covid19ImpactEstimator = (data) => {
  const input = data;
  input.timeToElapse = convertToDays(input.periodType, input.timeToElapse);
  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      get infectionsByRequestedTime() { return this.currentlyInfected * (2 ** 10); },
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
