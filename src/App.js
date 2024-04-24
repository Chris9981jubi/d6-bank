import React, { Component } from 'react';
import Chart from 'chart.js/auto';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeValue: 500000,
      downPayment: 100000,
      loanAmount: 400000,
      interestRate: 4.5,
    };
  }

  componentDidMount() {
    this.initializePieChart();
  }

  componentDidUpdate() {
    this.updateChartData();
  }

  initializePieChart() {
    const ctx = document.getElementById('pieChart');
    // Check if a chart instance already exists
    if (this.pieChart) {
      // If it does, destroy the existing chart instance
      this.pieChart.destroy();
    }
    // Create a new chart instance
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Home Value', 'Loan Amount'],
        datasets: [{
          label: 'Financial Breakdown',
          data: [this.state.homeValue, this.state.loanAmount],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  

  updateChartData() {
    if (this.pieChart) {
      this.pieChart.data.datasets[0].data = [this.state.homeValue, this.state.loanAmount];
      this.pieChart.update();
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: parseFloat(value) || 0 });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bank Dashboard</h1>
        </header>
        <main className="App-main">
          <section className="financial-data">
            <h2>Financial Data</h2>
            <div className="slider-container">
              <label>Home Value:</label>
              <input
                type="range"
                name="homeValue"
                value={this.state.homeValue}
                min="0"
                max="1000000"
                step="10000"
                onChange={this.handleInputChange}
              />
              <span>${this.state.homeValue}</span>
            </div>
            <div className="slider-container">
              <label>Down Payment:</label>
              <input
                type="range"
                name="downPayment"
                value={this.state.downPayment}
                min="0"
                max={this.state.homeValue}
                step="10000"
                onChange={this.handleInputChange}
              />
              <span>${this.state.downPayment}</span>
            </div>
            <div className="slider-container">
              <label>Loan Amount:</label>
              <input
                type="range"
                name="loanAmount"
                value={this.state.loanAmount}
                min="0"
                max={this.state.homeValue - this.state.downPayment}
                step="10000"
                onChange={this.handleInputChange}
              />
              <span>${this.state.loanAmount}</span>
            </div>
            <div className="slider-container">
              <label>Interest Rate (%):</label>
              <input
                type="range"
                name="interestRate"
                value={this.state.interestRate}
                min="0"
                max="20"
                step="0.1"
                onChange={this.handleInputChange}
              />
              <span>{this.state.interestRate}%</span>
            </div>
          </section>
          <section className="pie-chart">
            <h2>Pie Chart</h2>
            <canvas id="pieChart" width="400" height="400"></canvas>
          </section>
        </main>
        <footer className="App-footer">
          {/* Footer content */}
        </footer>
      </div>
    );
  }
}

export default App;
