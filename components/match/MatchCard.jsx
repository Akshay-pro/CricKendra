// components/MatchCard.jsx
"use client";
import React from 'react';

const MatchCard = ({ match }) => {
  const {
    team1_name,
    team2_name,
    ground_name,
    main_series_name,
    start_date,
    match_winner_team_id,
    win_margin,
    is_won_by_runs,
    is_won_by_innings,
    innings_scores = [],
  } = match;

  const team1Score = innings_scores.find(i => i.batting_team_name === team1_name);
  const team2Score = innings_scores.find(i => i.batting_team_name === team2_name);

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 border !w-[400px] border-gray-200">
      <div className="text-sm mb-1">{main_series_name} {ground_name && <span className="text-xs text-gray-500 mb-2">at {ground_name}</span>}</div>

      {/* <div className="font-semibold text-gray-800 mb-1">{team1_name} vs {team2_name}</div> */}

      

      <div className="text-sm text-gray-700">
        {team1Score && (
          <div className="font-semibold text-gray-800 mb-1 flex justify-between"><span>{team1Score.batting_team_name}:</span> <span>{team1Score.total_runs}/{team1Score.total_wickets} ({Math.floor(team1Score.total_overs / 6)}.{team1Score.total_overs % 6} ov)</span></div>
        )}
        {team2Score && (
          <div className="font-semibold text-gray-800 mb-1 flex justify-between"><span>{team2Score.batting_team_name}:</span> <span>{team2Score.total_runs}/{team2Score.total_wickets} ({Math.floor(team2Score.total_overs / 6)}.{team2Score.total_overs % 6} ov)</span></div>
        )}
      </div>

      {match_winner_team_id && (
        <div className="text-green-700 text-sm font-medium mt-2">
          {match_winner_team_id === match.team1_id ? team1_name : team2_name}
          {win_margin && (
            <span> won by {win_margin} {is_won_by_runs ? 'runs' : is_won_by_innings ? 'innings' : 'wickets'}</span>
          )}
        </div>
      )}

      {start_date && (
        <div className="text-xs text-gray-500 mt-2">Date: {new Date(start_date).toDateString()}</div>
      )}
    </div>
  );
};

export default MatchCard;
