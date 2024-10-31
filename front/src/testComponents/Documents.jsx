import React, { useState } from "react";
import { GlobalWorkerOptions } from "pdfjs-dist/webpack";

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js`;

const Documents = () => {
  const [situation, setSituation] = useState("부분파손건");
  const [files, setFiles] = useState([]);

  const labelsBySituation = {
    분실or전체파손건: [
      "주민등록등본",
      "보상신청서",
      "개인정보 동의서",
      "분실신고서",
    ],
    부분파손건: [
      "주민등록등본",
      "보상신청서",
      "개인정보 동의서",
      "통장사본",
      "수리내역서",
    ],
  };

  const labels = labelsBySituation[situation];

  const handleFileChange = (index) => (event) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files[0];
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    if (files.some((file) => file === null)) {
      alert("Please select all files first!");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("docs", file); // 모든 파일을 "docs" 필드 이름으로 추가
      console.log(formData);
    });

    const claim_id = 6; // claim_id는 임시로 작성 (추후 수정 필요)
    try {
      const response = await fetch(
        `http://localhost:8080/documents/${claim_id}`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        alert("Files uploaded successfully!");
      } else {
        alert("Failed to upload files.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <div>
        <label>상황 선택: </label>
        <select
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
        >
          <option value="부분파손건">부분파손</option>
          <option value="분실or전체파손건">분실/전체파손</option>
        </select>
      </div>
      {labels.map((label, index) => (
        <div key={index}>
          <label>{label}</label>
          <input type="file" onChange={handleFileChange(index)} />
          {files[index] && <p>Selected file: {files[index].name}</p>}
        </div>
      ))}
      <button
        onClick={handleUpload}
        disabled={files.some((file) => file === null)}
      >
        Upload
      </button>
    </div>
  );
};

export default Documents;
