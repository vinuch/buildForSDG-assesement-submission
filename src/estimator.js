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
        return Math.round((35 * input.totalHospitalBeds) / 100
         - this.severeCasesByRequestedTime);
      },
      get casesForICUByRequestedTime() {
        return Math.floor((5 * this.infectionsByRequestedTime) / 100);
      },
      get casesForVentilatorsByRequestedTime() {
        return Math.floor((2 * this.infectionsByRequestedTime) / 100);
      },
      get dollarsInFlight() {
        return Math.floor(this.infectionsByRequestedTime * input.region.avgDailyIncomePopulation
        * input.region.avgDailyIncomeInUSD * input.timeToElapse);
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
        return Math.round(((35 * input.totalHospitalBeds) / 100)
         - this.severeCasesByRequestedTime);
      },
      get casesForICUByRequestedTime() {
        return Math.floor((5 * this.infectionsByRequestedTime) / 100);
      },
      get casesForVentilatorsByRequestedTime() {
        return Math.floor((2 * this.infectionsByRequestedTime) / 100);
      },
      get dollarsInFlight() {
        return Math.floor(this.infectionsByRequestedTime * input.region.avgDailyIncomePopulation
        * input.region.avgDailyIncomeInUSD * input.timeToElapse);
      }
    }
  };
};

const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 4,
    avgDailyIncomePopulation: 0.73
  },
  periodType: 'days',
  timeToElapse: 38,
  reportedCases: 2747,
  population: 92931687,
  totalHospitalBeds: 678874
};

console.log(Object.values(covid19ImpactEstimator(data).severeImpact));

// export default covid19ImpactEstimator;
