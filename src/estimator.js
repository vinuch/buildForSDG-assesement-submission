const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input,
    impact: {
      currentlyInfected: this.data.reportedCases * 10,
      infectionsByRequestedTime: this.impact.currentlyInfected * (2 ** 10),
      severeCasesByRequestedTime: 0.15 * this.impact.infectionsByRequestedTime,
      hospitalBedsByRequestedTime: 0.35 * this.data.totalHospitalBeds,
      casesForICUByRequestedTime: 0.5 * this.impact.infectionsByRequestedTime,
      casesForVentilatorsByRequestedTime: 0.2 * this.severeImpact.infectionsByRequestedTime,
      dollarsInFlight:
        this.impact.infectionsByRequestedTime * this.data.region.avgDailyIncomePopulation
        * this.data.region.avgDailyIncomeInUSD * this.data.timeToElapse
    },
    severeImpact: {
      currentlyInfected: this.data.reportedCases * 50,
      infectionsByRequestedTime: this.impact.currentlyInfected * (2 ** 10),
      severeCasesByRequestedTime: 0.15 * this.severeImpact.infectionsByRequestedTime,
      hospitalBedsByRequestedTime: 0.35 * this.data.totalHospitalBeds,
      casesForICUByRequestedTime: 0.5 * this.severeImpact.infectionsByRequestedTime,
      casesForVentilatorsByRequestedTime: 0.2 * this.severeImpact.infectionsByRequestedTime,
      dollarsInFlight:
        this.severeImpact.infectionsByRequestedTime * this.data.region.avgDailyIncomePopulation
        * this.data.region.avgDailyIncomeInUSD * this.data.timeToElapse
    }
  };
};

export default covid19ImpactEstimator;
