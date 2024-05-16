import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://courses9.p.rapidapi.com/api/v6/website/labels',
    headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '1462331492msh4263adfe366c539p137e91jsn3ce32463ad72',
        'X-RapidAPI-Host': 'courses9.p.rapidapi.com'
    }
    };
export const fetchData = async () => {
    try {
      const response = await axios.request(options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };