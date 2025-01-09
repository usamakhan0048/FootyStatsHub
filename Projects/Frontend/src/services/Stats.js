import axios from 'axios'

const BACKEND_URL = "http://localhost:3000";

export const getAllLeagues = async () => {
    try
    {
        const response = await axios.get(`${BACKEND_URL}/leagues`);
        // console.log(response.data);
        return response.data;
    }
    catch(e)
    {
        throw new Error(e.response?.data || 'Error getting leagues');
    }
}

export const getTopGoalScorersForALeague = async (leagueId) => {
    try
    {
        const response = await axios.get(`${BACKEND_URL}/players/top-scorers/${leagueId}`);
        console.log(response.data);
        return response.data;
    }
    catch(e)
    {
        throw new Error(e.response?.data || 'Error getting leagues');
    }
}

export const getTopAssistorsForLeagueId = async (leagueId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/players/top-assistors/${leagueId}`);
      return response.data;
    } catch (e) {
      throw new Error(e.response?.data || 'Error getting top assistors');
    }
  };
  
  export const getTopYellowCardHoldersForLeagueId = async (leagueId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/players/top-yellow-cards/${leagueId}`);
      return response.data;
    } catch (e) {
      throw new Error(e.response?.data || 'Error getting top yellow card holders');
    }
  };
  
  export const getTopRedCardHoldersForLeagueId = async (leagueId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/players/top-red-cards/${leagueId}`);
      return response.data;
    } catch (e) {
      throw new Error(e.response?.data || 'Error getting top red card holders');
    }
  };
  