import React, { useState } from "react";
import axios from "axios";

const DLSForm = () => {
  const [formData, setFormData] = useState({
    oversLeft: "",
    wicketsLost: "",
    targetScore: "",
    currentScore: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3310/dls/calculate", null, {
        params: {
          oversLeft: formData.oversLeft,
          wicketsLost: formData.wicketsLost,
          targetScore: formData.targetScore,
          currentScore: formData.currentScore,
        },
      });
  
      console.log(response.data); // Add this line to log the response
      setResult(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  

  return (
    <div>
      <h2>DLS Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Overs Left:</label>
          <input
            type="number"
            name="oversLeft"
            value={formData.oversLeft}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Wickets Lost:</label>
          <input
            type="number"
            name="wicketsLost"
            value={formData.wicketsLost}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Target Score:</label>
          <input
            type="number"
            name="targetScore"
            value={formData.targetScore}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Current Score:</label>
          <input
            type="number"
            name="currentScore"
            value={formData.currentScore}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Calculate</button>
      </form>

      {result && (
        <div>
          <h3>Result: {result >= 1 ? "Team Wins" : `Par Score: ${result.toFixed(2)}`}</h3>
        </div>
      )}
    </div>
  );
};

export default DLSForm;
