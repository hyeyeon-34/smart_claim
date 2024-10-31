const router = require("express").Router();

const {
  getDocsByClaim,
  getPendingDocs,
  getAllDocs,
  upload,
  postDocs,
} = require("../controllers/documents_ctrls");

// ----------------------------- GET documents -----------------------------
// 필요서류 조회

// 조건에 따른 서류 조회(프로세스, 클레임 별)
router.get("/documents", async (req, res) => {
  const { claim, process } = req.query;

  try {
    if (claim) {
      // 각 클레임 건에 대해 제출한 서류 조회 -> /documents?claim={id}
      const result = await getDocsByClaim(claim);
      res.status(200).json(result);
    } else if (process) {
      // 승인대기 중인 서류 조회 (상담사 검토가 완료된 서류) -> /documents?process=3
      const result = await getPendingDocs(process);
      res.status(200).json(result);
    } else {
      // 모든 서류 조회
      const result = await getAllDocs();
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------------------- POST documents ----------------------------
// 서류 등록
router.post("/documents/:claim_id", upload, postDocs);

// --------------------------- DELETE documents ---------------------------
// 서류 삭제

// ---------------------------- PATCH documents ----------------------------
// 서류 수정

// 서류에 대한 상담사 코멘트 수정

// 보험사 서류 승인 여부

module.exports = router;
