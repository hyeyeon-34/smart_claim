const database = require('../database/database');

 
// 보험고객 1명 정보 가져오기 
exports.getUser = async (req, res) => {
    const {user_id} = req.params
   
   
    try {
      const result = await database.query(
        "select * from Users where user_id = $1",
        [user_id]
      );
      return res.status(200).json(result.rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
   };
   
   // 보험고객 정보 전부 다 가져오기 
   exports.getUsers = async (req, res) => {
    try {
      const result = await database.query("select * from Users");
      return res.status(200).json(result.rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
   };

   // 고객정보 1명의 정보 변경 
   exports.patchUser = async(req, res) => {
    const {user_id} = req.params
    const {gender} = req.body
    try{
        const userResult = await database.query(
            "select * from Users where user_id = $1",
            [user_id]
          );
          if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
          }
        const updateResult = await database.query(
            'UPDATE Users SET gender = $1 WHERE user_id = $2',
            [gender, user_id]
          );
          res.json({ message: 'Gender updated successfully' })
    }
    catch(error){
        console.log('Error updating quantity:', error);
    }
   }

   //user_id에 해당하는 클레임 정보 다 가져오기 
   exports.getUserClaims = async(req, res) => {
    const {user_id} = req.params

    try {
        const result = await database.query("select * from Claim where user_id = $1", [user_id])
        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
   }

   // claim_id에 해당하는 클레임 정보 가져오기
   exports.getClaims = async(req, res)=>{
    const {claim_id} = req.params;

    try {
        const result = await database.query("select * from Claim where claim_id = $1", [claim_id])
        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }

   }

   //history_id에 해당하는 상담이력 정보 가져오기 
   exports.getHistory = async(req, res)=>{
    const {history_id} = req.params;

    try {
        const result = await database.query("select * from Call_History where history_id = $1", [history_id])
        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }

   }

   //claims에 있는 모든 정보 가져오기 
   exports.getAllClaims = async(req,res) =>{
    try {
        const result = await database.query("select * from Claim")
        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
   }

   //특정 claim_id 기준 모든 상담이력 불러오기
   exports.getHistoryOfClaim = async(req, res)=>{
    const {claim} = req.query
    try {
        const result = await database.query("select * from Call_History where Claim_id = $1", [claim])
        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
   }

   // 첫 문의전화 ( 새로운 클레임번호와 히스토리 생성) -> Claim_id을 serial number가 아닌 uuid로 대체하는 방법도 있음
   exports.newHistory = async(req, res)=>{
    const client = await database.connect(); // 데이터베이스 클라이언트 연결
    const {claim_type_idx, user_id, manager_idx, progress_idx, comment} = req.body
    try {
        await client.query("BEGIN"); // 트랜잭션 시작
        // 첫번째 쿼리
        const result = await client.query(
            "Insert Into Claim (claim_type_idx, user_id, last_comment, last_manager,last_assigned, document, compensation) values($1, $2, $3, $4, $5, $6, $7)RETURNING claim_id", [claim_type_idx, user_id, comment, manager_idx,progress_idx, false, false]
        );
        const claim_id = String(result.rows[0].claim_id);
  
        // 두번째 쿼리
        const now = new Date();
        console.log(claim_id, now);
        await client.query(
            "Insert Into Call_History (claim_id, manager_idx, progress_idx, comment, history_created_at) values($1, $2, $3, $4, $5)",[claim_id, manager_idx, progress_idx, comment, now]
        )
        console.log("오류2");
        await client.query("COMMIT"); // 트랜잭션 커밋
        res.status(201).send("History and claim created successfully");
        console.log("오류3");
    } catch (error) {
        await client.query("ROLLBACK"); // 트랜잭션 롤백
        res.status(500).json({ error: error.message});
        
    } finally {
        client.release(); // 데이터베이스 연결 해제
    }
};

   // 기존 클레임과 새로운 히스토리 연결
   exports.appendHistory = async(req, res) => {
    const client = await database.connect(); // 데이터베이스 클라이언트 연결
    const now = new Date();
    const {claim_id, manager_idx, progress_idx, comment} = req.body
    try {
        await client.query("BEGIN"); // 트랜잭션 시작
        // 첫번째 쿼리
        await client.query(
            "Insert Into Call_History (claim_id, manager_idx, progress_idx, comment, history_created_at) values($1, $2, $3, $4, $5)",[claim_id, manager_idx, progress_idx, comment, now]
        );
  
        // 두번째 쿼리
        await client.query(
            "Update Claim Set last_comment = $1, last_manager = $2, last_assigned = $3 where claim_id = $4", [
                comment, manager_idx, progress_idx, claim_id
            ]
        );
        console.log("오류2");
        await client.query("COMMIT"); // 트랜잭션 커밋
        res.status(201).send("History and claim created successfully");
        console.log("오류3");
    } catch (error) {
        await client.query("ROLLBACK"); // 트랜잭션 롤백
        res.status(500).json({ error: error.message});
        
    } finally {
        client.release(); // 데이터베이스 연결 해제
    }
}
// 특정 진행상황인 클레임들 가져오기 
exports.getProgressClaim = async (req, res)=>{
    const {last_assigned} = req.query;
    try {
        const result = await database.query("select * from claim where last_assigned = $1",[last_assigned])
        res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

// user_id와 진행상황 기반으로 클레임 정보 가져오기 
exports.getUserProgressClaim = async (req, res) =>{
    const {last_assigned, user_id} = req.query;
    console.log(user_id, last_assigned);
    try {
        const result = await database.query("select * from claim where last_assigned = $1 and user_id = $2", [last_assigned, user_id])
        res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

// /claims?process={process_name}
///claims?process={process_name}&user={id}
