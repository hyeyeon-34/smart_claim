const database = require("../database/database");
// 모든 manager 정보 가져오기 
exports.getAllManagers = async(req, res) =>{
    const query = "SELECT * FROM managers"
    try {
        const result= await database.query(query)
        console.log(result);
        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// 특정 상담사 정보 가져오기 
exports.getManager = async(req,res) =>{
    const {manager} = req.params
    
    try {
        const result = await database.query("SELECT * FROM managers WHERE manager_idx = $1", [manager])
        return res.status(200).json(result.rows)
      
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// 특정 상담사 정보 수정
exports.updateManager = async(req, res) =>{
    const client = await database.connect();
    const { manager } = req.params; // URL 파라미터에서 manager_idx 가져오기 
    const updateFields = req.body; // 요청의 바디에 포함된 필드만 업데이트

    // 업데이트할 필드가 없는 경우 오류 응답
    if(!Object.keys(updateFields).length){
        return res.status(400).json({ error: "No fields provided for update"})
    }
    try {
        await client.query("BEGIN") // 트랜잭션 시작

        // 쿼리 생성
        const setClause = Object.keys(updateFields).map((field, index) => `${field} = $${index + 1}`).join(", ")
        const values = [...Object.values(updateFields), manager]
        const query =  `UPDATE managers SET ${setClause} WHERE manager_idx = $${values.length}`

        await client.query(query, values) // 필드들 업데이트
        await client.query("COMMIT")
        res.status(200).send("Claim updated successfully")
    } catch (error) {
        await client.query("ROLLBACK");
        res.status(500).json({error: error.message})
    } finally{
        client.release(); // 데이터베이스 연결 해제
    }
}