const database = require("../database/database");

const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const { v4: uuid4 } = require("uuid");

// ----------------------------- GET documents -----------------------------
// 필요서류 조회

// 각 클레임 건에 대해 제출한 서류 조회 -> /documents?claim=id
exports.getDocsByClaim = async (claim_id) => {
  const query = "SELECT * FROM document_statuses WHERE claim_id = $1";
  const result = await database.query(query, [claim_id]);
  return result.rows;
};

// 승인대기 중인 서류 조회 (상담사 검토가 완료된 서류) /documents?process=3
exports.getPendingDocs = async (process_id) => {
  const query =
    "SELECT CL.*, DS.document_status_id, DS.required_document_idx, DS.insurer_idx, DS.submitted, DS.submitted_at, DS.reviewed, DS.reviewed_at, DS.document_path, DS.document_manager_comment, DS.document_insurer_comment FROM claims AS CL JOIN document_statuses AS DS ON CL.claim_id = DS.claim_id WHERE CL.last_assigned = $1;";
  const result = await database.query(query, [process_id]);
  return result.rows;
};

// 모든 서류 조회
exports.getAllDocs = async () => {
  const query = "SELECT * FROM document_statuses";
  const result = await database.query(query);
  return result.rows;
};

// ---------------------------- POST documents ----------------------------
// 특정 클레임 건에 대한 서류 등록 -> /documents/:claim_id
const upload = multer({ storage: multer.memoryStorage() }); // Multer 설정

// 파일 업로드 및 데이터베이스에 저장하는 함수 -> /documents/:claim-id
exports.postDocs = async (req, res) => {
  const { claim_id } = req.params;

  const files = req.files; // 업로드된 파일 배열
  let required_idx = []; // 요구서류 idx (1=등본, 2=보상신청서, 3=개인정보동의서, 4=통장사본, 5=수리내역서, 6=분실신고서)

  // 상황에 따른 required_idx 설정
  if (files.length === 4) {
    // 분실건은 필요서류 4개
    required_idx = [1, 2, 3, 6];
  } else if (files.length === 5) {
    // 부분파손건은 필요서류 5개
    required_idx = [1, 2, 3, 4, 5];
  } else {
    return res.status(400).json({ error: "Invalid number of files uploaded." });
  }

  try {
    const queries = files.map((file, index) => {
      const query = `INSERT INTO document_statuses 
        (claim_id, required_document_idx, insurer_idx, submitted, reviewed, file_buffer)
        VALUES ($1, $2, $3, $4, $5, $6)`;

      const values = [
        claim_id,
        required_idx[index], // 상황에 맞는 require_document_idx
        1, // 보험사 idx
        true, // 제출 상태
        false, // 검토 상태
        file.buffer, // 파일의 버퍼
      ];

      return database.query(query, values);
    });

    await Promise.all(queries);
    return res.status(200).json({ message: "Docs Uploaded Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
exports.upload = upload.array("docs", 5); // 최대 파일 5개를 한 번에 업로드 가능

// --------------------------- DELETE documents ---------------------------
// 특정 클레임 건에 대한 서류 삭제 -> /documents/:claim_id
exports.deleteDocs = async (req, res) => {
  const { claim_id } = req.params;
  const query = "";
  try {
    const result = await database.query(query, []);
  } catch (error) {}
};

// ---------------------------- PATCH documents ----------------------------
// 특정 클레임 건에 대한 서류 수정
exports.patchDocs = async (req, res) => {
  const { claim_id } = req.params;
  const query = "";
  try {
    const result = await database.query(query, []);
  } catch (error) {}
};

// 서류에 대한 상담사 코멘트 수정

// 보험사 서류 승인 여부
