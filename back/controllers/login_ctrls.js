const database = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 고객 로그인
exports.UserLogin = async (req, res) => {
  const { username, user_pn } = req.body;

  const query = `
    SELECT user_id, username FROM users 
    WHERE username = $1 AND user_pn = $2
  `;

  try {
    const result = await database.query(query, [username, user_pn]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: result.rows[0].user_id, role: 'user' },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h', // 토큰 만료 시간
      }
    ); // 비밀 키는 환경 변수로 관리하는 것이 좋습니다.
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 상담사 로그인
exports.ManagerLogin = async (req, res) => {
  const { manager_userid, manager_password } = req.body;

  const query = `
    SELECT manager_idx FROM managers 
    WHERE manager_userid = $1 AND manager_password = $2
  `;

  try {
    const result = await database.query(query, [
      manager_userid,
      manager_password,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: result.rows[0].manager_idx, role: 'manager' },
      process.env.JWT_SECRET,
      {
        expiresIn: '12h', // 토큰 만료 시간
      }
    );
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 보험사 직원 로그인
exports.InsurerLogin = async (req, res) => {
  const { insurer_userid, insurer_password } = req.body;

  const query = `
    SELECT insurer_id FROM insurers 
    WHERE insurer_userid = $1 AND insurer_password = $2
  `;

  try {
    const result = await database.query(query, [
      insurer_userid,
      insurer_password,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: result.rows[0].insurer_id, role: 'insurer' },
      process.env.JWT_SECRET,
      {
        expiresIn: '12h', // 토큰 만료 시간
      }
    );
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 상담사 비밀번호 변경
exports.ChangeManagerPassword = async (req, res) => {
  const { manager_username, manager_userid, manager_pn, new_password } =
    req.body;

  const findQuery = `
    SELECT manager_idx FROM managers 
    WHERE manager_username = $1 AND manager_userid = $2 AND manager_pn = $3
  `;

  try {
    // 1. 상담사 정보 확인
    const result = await database.query(findQuery, [
      manager_username,
      manager_userid,
      manager_pn,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    // 2. 새로운 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // 3. 비밀번호 업데이트
    const updateQuery = `
      UPDATE managers 
      SET manager_password = $1 
      WHERE manager_idx = $2
    `;
    await database.query(updateQuery, [
      hashedPassword,
      result.rows[0].manager_idx,
    ]);

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
