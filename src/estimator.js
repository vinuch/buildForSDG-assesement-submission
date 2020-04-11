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

function convertToDays(periodType, time) {
  let numOfDays;
  if (periodType === 'days') {
    numOfDays = time;
  } else if (periodType === 'weeks') {
    numOfDays = time * 7;
  } else if (periodType === 'months') {
    numOfDays = time * 30;
  } else {
    return 'Invalid data type';
  }

  return numOfDays;
}
const covid19ImpactEstimator = (data) => {
  const input = data;
  input.timeToElapse = convertToDays(input.periodType, input.timeToElapse);
  return {
    data: input,
    impact: {
      currentlyInfected: input.reportedCases * 10,
      get infectionsByRequestedTime() {
        return this.currentlyInfected * (2 ** getFactor(input.periodType, input.timeToElapse));
      },
      get severeCasesByRequestedTime() {
        return Math.floor((15 * this.infectionsByRequestedTime) / 100);
      },
      get hospitalBedsByRequestedTime() {
        return Math.trunc((35 * input.totalHospitalBeds) / 100
         - this.severeCasesByRequestedTime);
      },
      get casesForICUByRequestedTime() {
        return Math.floor((5 * this.infectionsByRequestedTime) / 100);
      },
      get casesForVentilatorsByRequestedTime() {
        return Math.floor((2 * this.infectionsByRequestedTime) / 100);
      },
      get dollarsInFlight() {
        return Math.trunc((this.infectionsByRequestedTime * input.region.avgDailyIncomePopulation
        * input.region.avgDailyIncomeInUSD) / input.timeToElapse);
      }
    },
    severeImpact: {
      currentlyInfected: input.reportedCases * 50,
      get infectionsByRequestedTime() {
        return this.currentlyInfected * (2 ** getFactor(input.periodType, input.timeToElapse));
      },
      get severeCasesByRequestedTime() {
        return Math.floor((15 * this.infectionsByRequestedTime) / 100);
      },
      get hospitalBedsByRequestedTime() {
        return Math.trunc(((35 * input.totalHospitalBeds) / 100)
         - this.severeCasesByRequestedTime);
      },
      get casesForICUByRequestedTime() {
        return Math.floor((5 * this.infectionsByRequestedTime) / 100);
      },
      get casesForVentilatorsByRequestedTime() {
        return Math.floor((2 * this.infectionsByRequestedTime) / 100);
      },
      get dollarsInFlight() {
        return Math.trunc((this.infectionsByRequestedTime * input.region.avgDailyIncomePopulation
        * input.region.avgDailyIncomeInUSD) / input.timeToElapse);
      }
    }
  };
};

export default covid19ImpactEstimator;
