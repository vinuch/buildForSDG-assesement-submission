<template>
  <div id="app">
    <Banner />
    <div class="banner">
      <div class="banner__img">
        <img src="./assets/covid.jpg" alt="covid">
      </div>
      <div class="banner__text">
        <h1>Welcome to the COVID-19 response web app</h1>
        <p>
          The assessment empowers me to attempt helping society and leaders prepare for the real
          big problem of COVID-19, which is its impact on lives, health systems, supply chains,
          and the economy
          Get an estimate of COVID-19 related activity in your current location
        </p>
        <h4>
          Kindly fill out the form below to get estimated
          data on the corona virus for a particular region
        </h4>

    <form action="">
      <h4>Region details</h4>
      <div>
        <label for="region-name">Region Name</label><br>
        <input type="text" name="region-name" data="data-population" placeholder="Region Name"
        v-model="input.region.name"
        required>
      </div>
      <div>
        <label for="regionAvgAge">Region Average Age</label><br>
        <input type="text" name="regionAvgAge" data="data-population"
        placeholder="Region Average Age"
        v-model="input.region.avgAge"
        required>
      </div>
      <div>
        <label for="regionAvgIncome">Region Average Daily Income (USD)</label><br>
        <input type="text" name="regionAvgIncome" data="data-population"
        placeholder="Region Average Daily Income (USD)"
        v-model="input.region.avgDailyIncomeInUSD"
        required>
      </div>
      <div>
        <label for="regionAvgIncomePopulation">Region Average Income Population</label><br>
        <input type="text" name="regionAvgIncomePopulation" data="data-population"
        placeholder="Region Average Income population"
        v-model="input.region.avgDailyIncomeInPopulation"
        required>
      </div>
      <h4>Other Information</h4>
      <div>
        <label for="periodType">Period Type</label><br>
        <select name="periodType" data="data-period-type" v-model="input.periodType" required>
          <option value="Months">Months</option>
          <option value="Weeks">Weeks</option>
          <option value="Days">Days</option>
        </select>
      </div>
      <div>
        <label for="poulation">Time to ELapse</label><br>
        <input type="number" name="timeToElapse" data="data-time-to-elapse"
        placeholder="Time to elapse "
        v-model="input.timeToElapse"
        required>
      </div>
      <div>
        <label for="reportedCases">Reported Cases</label><br>
        <input type="number" name="reportedCases" data="data-reported-cases"
        placeholder="Reported Cases"
        v-model="input.reportedCases"
        required>
      </div>
      <div>
        <label for="poulation">Population</label><br>
        <input type="number" name="population" data="data-population" placeholder="Population"
        v-model="input.population"
        required>
      </div>
      <div>
        <label for="totalHospitalBeds">Total hospital beds</label><br>
        <input type="number" name="totalHospitalBeds" data="data-total-hospital-beds"
        placeholder="Total hospital beds"
        v-model="input.totalHospitalBeds"
        required>
      </div>
      <button data="data-go-estimate" class="btn-submit" @click.prevent="estimate">
        Get Estimate</button>
    </form>
    <div v-if="result">
      <p v-for="(value, index) in result" :key="index">{{ value }}</p>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from './components/Banner.vue';
import covid19ImpactEstimator from '../../src/estimator';

export default {
  name: 'App',
  components: {
    Banner,
  },
  data() {
    return {
      input: {
        region: {
          name: '',
          avgAge: 0,
          avgDailyIncomeInUSD: 0,
          avgDailyIncomeInPopulation: 0,
        },
        periodType: '',
        timeToElapse: 5,
        reportedCases: 0,
        population: 0,
        totalHospitalBeds: 0,
      },
      result: '',
    };
  },
  methods: {
    estimate() {
      this.result = covid19ImpactEstimator(this.input);
      console.log(Object.values(this.result));
    },
    convertToDays(periodType, time) {
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
    },
    getFactor(periodType, time) {
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
    },
  },
};
</script>

<style>
body {
  background: #008ed1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #fff;
  margin-top: 60px;
}
.banner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.banner__text {
  flex-basis: 100%;
}
.banner__img {
  flex-basis: 100%;
}
.banner__img img{
  width: 100%;
}
input, select {
  width: 80%;
  margin: .5rem 0;
  padding: .3rem;
}
.btn-submit {
  padding: .4rem;
  background-color: #feae6d;
  border: none;
}
.btn-submit:hover {
  transform: translateY(-2px);
}

@media screen and (min-width: 480px){
  .banner__text {
    flex-basis: 40%;
  }
  .banner__img {
    flex-basis: 40%;
  }
}
</style>
