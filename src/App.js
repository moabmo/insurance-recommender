import React, { useState } from 'react';
import './App.css';

const insuranceProducts = [
  {
    name: 'Term Life Insurance',
    coverage: 'Provides coverage for a specific term.',
    benefits: [
      'Affordable premiums',
      'Fixed coverage period',
      'No cash value accumulation',
    ],
    criteria: [
      { key: 'age', min: 18, max: 29 },
      { key: 'income', min: 50000 },
    ],
    currency: 'Kes',
    monthlyPremium: 100,
    sumAssured: 100000,
    term: 10,
  },
  {
    name: 'Whole Life Insurance',
    coverage: 'Covers the entire lifetime of the insured.',
    benefits: [
      'Lifetime coverage',
      'Cash value accumulation',
      'Premiums typically higher',
    ],
    criteria: [
      { key: 'age', min: 30, max: 49 },
      { key: 'income', min: 80000 },
    ],
    currency: 'Kes',
    monthlyPremium: 500,
    sumAssured: 500000,
    term: 'Lifetime',
  },
  {
    name: 'Universal Life Insurance',
    coverage: 'Flexible policy with adjustable premiums.',
    benefits: [
      'Flexible premiums and death benefits',
      'Cash value accumulation',
      'Investment component',
    ],
    criteria: [
      { key: 'age', min: 50 },
      { key: 'income', min: 100000 },
    ],
    currency: 'Kes',
    monthlyPremium: 300,
    sumAssured: 300000,
    term: 'Flexible',
  },
];

const App = () => {
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleRecommendation = () => {
    if (age && income) {
      const recommendedProduct = insuranceProducts.find(product => {
        return product.criteria.every(criteria => {
          const { key, min, max } = criteria;
          const value = key === 'age' ? parseInt(age) : parseInt(income);

          const minCriteria = !min || value >= min;
          const maxCriteria = !max || value <= max;

          return minCriteria && maxCriteria;
        });
      });

      if (recommendedProduct) {
        setSelectedProduct(recommendedProduct);
      } else {
        // Default product definition.. also displays when no product is selected
        setSelectedProduct(insuranceProducts[0]);
      }
    }
  };

  return (
    <div className="App">
      <h1>Life Insurance Recommender</h1>
      <div className="input-container">
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="18" // Set the minimum value to 18
          />
        </div>
        <div>
          <label htmlFor="income">Annual Income (Kes):</label>
          <input
            type="number"
            id="income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleRecommendation}>Get Recommendation</button> <br/><br/>

      {selectedProduct && (
        <div className="recommendation">
          <h2>Recommended Life Insurance Product:</h2>
          <h3><b>{selectedProduct.name}</b></h3>
          <p>{selectedProduct.coverage}</p>
          <h3>Benefits:</h3>
          <ul>
            {selectedProduct.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <h3>Quote:</h3>
          <p>
            <b>Monthly Premium:</b> {selectedProduct.currency} {selectedProduct.monthlyPremium.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <p>
          <b>Sum Assured:</b> {selectedProduct.currency} {selectedProduct.sumAssured.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <p><b>Term:</b> {selectedProduct.term === 'Lifetime' ? 'Lifetime' : `${selectedProduct.term} years`}</p>
        </div>
      )}
    </div>
  );
};

export default App;
