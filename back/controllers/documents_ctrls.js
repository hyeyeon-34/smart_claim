const database = require("../database/database");

// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const { v4: uuid4 } = require("uuid");

// ------------------------------ GET documents ------------------------------
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

// ------------------------------ POST documents ------------------------------
// 특정 클레임 건에 대한 서류 등록 -> /documents/:claim_id
// // 서류 저장 경로 설정
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = "uploads/"; // 파일을 저장할 디렉토리
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, `${uuid4()}${ext}`); // 파일 이름을 유니크하게 설정
//   },
// });

// const upload = multer({ storage: storage }).single("file");

// exports.uploadDocs = (req, res) => {
//   console.log("req", req);
//   upload(req, res, (err) => {
//     if (err) {
//       console.error("Error uploading image:", err);
//       return res.status(500).json({ error: "Failed to upload image" });
//     }

//     const file = req.file;
//     const imageUrl = `${req.protocol}://${req.get("host")}/${file.path}`; // 이미지의 URL 생성

//     res.status(201).json({ url: imageUrl });
//   });
// };

exports.postDocs = async (req, res) => {
  const { claim_id } = req.params;
  const query = "";
  try {
    const result = await database.query(query, []);
  } catch (error) {}
};

// ----------------------------- DELETE documents -----------------------------
// 특정 클레임 건에 대한 서류 삭제 -> /documents/:claim_id
exports.deleteDocs = async (req, res) => {
  const { claim_id } = req.params;
  const query = "";
  try {
    const result = await database.query(query, []);
  } catch (error) {}
};

// ----------------------------- PATCH documents -----------------------------
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
