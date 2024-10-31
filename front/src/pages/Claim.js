import React, { useState, useEffect } from 'react';

const Claim = () => {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [callHistories, setCallHistories] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const response = await fetch('http://localhost:8080/claims');
      const data = await response.json();
      setClaims(data);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const fetchCallHistories = async (claim_id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/histories?claim${claim_id}`
      );
      const data = await response.json();
      setCallHistories(data);
      setShowDetails(true);
    } catch (error) {
      console.error('Error fetching call histories:', error);
    }
  };

  const handleViewDetails = (claim) => {
    setSelectedClaim(claim);
    fetchCallHistories(claim.claim_id);
  };

  return (
    <div>
      <h2>클레임 조회/등록</h2>
      <table>
        <thead>
          <tr>
            <th>Claim ID</th>
            <th>Claim Type</th>
            <th>User ID</th>
            <th>Last Manager</th>
            <th>Last Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.claim_id}>
              <td>{claim.claim_id}</td>
              <td>{claim.claim_type_idx}</td>
              <td>{claim.user_id}</td>
              <td>{claim.last_manager}</td>
              <td>{claim.last_comment}</td>
              <td>
                <button onClick={() => handleViewDetails(claim)}>
                  상세조회
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDetails && selectedClaim && (
        <div>
          <h3>상세조회 - 클레임 ID: {selectedClaim.claim_id}</h3>
          <p>사고유형: {selectedClaim.claim_type_idx}</p>
          <p>최종진행상태: {selectedClaim.last_assigned}</p>
          <p>최근 코멘트: {selectedClaim.last_comment}</p>

          <h4>상담내역</h4>
          <table>
            <thead>
              <tr>
                <th>상담내역 ID</th>
                <th>담당 상담사</th>
                <th>진행상황</th>
                <th>상담사 코멘트</th>
                <th>상담일자</th>
              </tr>
            </thead>
            <tbody>
              {callHistories.map((history) => (
                <tr key={history.history_id}>
                  <td>{history.history_id}</td>
                  <td>{history.manager_idx}</td>
                  <td>{history.progress_idx}</td>
                  <td>{history.manager_comment}</td>
                  <td>
                    {new Date(history.history_created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setShowDetails(false)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default Claim;
