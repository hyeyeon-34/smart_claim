INSERT INTO positions (position_name) VALUES
('Manager'), ('Team Leader'), ('Assistant'), ('Supervisor'),
('Head of Department'), ('CEO'), ('CTO'), ('Developer'),
('Support Staff'), ('Finance Manager'), ('Analyst'), 
('Sales Representative'), ('Marketing Specialist'), 
('Customer Service'), ('Product Manager'), ('Intern'),
('Compliance Officer'), ('Legal Advisor'), ('HR Manager'), 
('Operations Manager');

INSERT INTO managers (position_idx, manager_username, birthdate, manager_userid, manager_password) VALUES
(1, 'alice', '1985-01-15', 'alice_m', 'password123'),
(2, 'bob', '1990-07-23', 'bob_t', 'securepass1'),
(3, 'charlie', '1983-02-17', 'charlie_a', 'pass@1234'),
(4, 'david', '1975-10-04', 'david_s', 'managerpass'),
(5, 'eve', '1988-05-30', 'eve_hd', 'evepass89'),
(6, 'frank', '1967-12-15', 'frank_ceo', 'ceopassword'),
(7, 'grace', '1993-03-08', 'grace_cto', 'techpass1'),
(8, 'henry', '1995-08-25', 'henry_dev', 'devpass456'),
(9, 'isaac', '1981-09-10', 'isaac_sup', 'support789'),
(10, 'julia', '1987-11-21', 'julia_fin', 'finpass111'),
(11, 'karen', '1992-04-06', 'karen_ana', 'analysis33'),
(12, 'leo', '1980-07-14', 'leo_sales', 'salegood'),
(13, 'maria', '1996-10-09', 'maria_mark', 'marketing01'),
(14, 'nancy', '1979-01-27', 'nancy_cust', 'service99'),
(15, 'oliver', '1998-06-18', 'oliver_pm', 'prodmanager1'),
(16, 'paul', '1973-02-22', 'paul_int', 'intern@2024'),
(17, 'quincy', '1984-09-30', 'quincy_com', 'comply12'),
(18, 'rachel', '1986-12-05', 'rachel_legal', 'legalpass'),
(19, 'sam', '1978-03-12', 'sam_hr', 'hradmin'),
(20, 'tom', '1991-08-19', 'tom_op', 'operations');

INSERT INTO phone_models (model_name) VALUES
('iPhone 12'), ('iPhone 13'), ('iPhone 14'), 
('Samsung Galaxy S21'), ('Samsung Galaxy S22'), 
('Google Pixel 6'), ('Google Pixel 7'), ('Xiaomi Mi 11'), 
('Huawei P40'), ('Oppo Reno 5'), ('OnePlus 9'), 
('Sony Xperia 5'), ('Nokia G20'), ('Asus ROG Phone 5'), 
('LG Velvet'), ('Motorola Edge'), ('Vivo V21'), 
('Realme GT'), ('Honor View 20'), ('Blackberry Key2');

INSERT INTO users (model_idx, username, user_pn, birthdate, gender, email, cancellation_status) VALUES
(1, 'Alice Lee', '010-1234-5678', '1990-01-01', 'Female', 'alice@example.com', FALSE),
(2, 'Bob Kim', '010-2345-6789', '1985-05-15', 'Male', 'bob@example.com', TRUE),
(3, 'Charlie Park', '010-3456-7890', '1992-10-22', 'Male', 'charlie@example.com', FALSE),
(4, 'David Choi', '010-4567-8901', '1988-02-10', 'Male', 'david@example.com', FALSE),
(5, 'Eve Jung', '010-5678-9012', '1993-07-07', 'Female', 'eve@example.com', TRUE),
(6, 'Frank Yoon', '010-6789-0123', '1981-03-18', 'Male', 'frank@example.com', FALSE),
(7, 'Grace Han', '010-7890-1234', '1995-12-25', 'Female', 'grace@example.com', TRUE),
(8, 'Henry Lim', '010-8901-2345', '1984-11-13', 'Male', 'henry@example.com', FALSE),
(9, 'Isaac Na', '010-9012-3456', '1979-08-29', 'Male', 'isaac@example.com', TRUE),
(10, 'Julia Moon', '010-0123-4567', '1991-04-17', 'Female', 'julia@example.com', FALSE),
(11, 'Karen Baek', '010-6789-1234', '1987-06-14', 'Female', 'karen@example.com', TRUE),
(12, 'Leo Hwang', '010-4567-8902', '1986-09-09', 'Male', 'leo@example.com', FALSE),
(13, 'Maria Shin', '010-3456-7891', '1994-03-03', 'Female', 'maria@example.com', TRUE),
(14, 'Nancy Jung', '010-8901-2346', '1990-11-30', 'Female', 'nancy@example.com', FALSE),
(15, 'Oliver Go', '010-9012-3457', '1998-05-05', 'Male', 'oliver@example.com', TRUE),
(16, 'Paul Seo', '010-0123-4568', '1978-10-01', 'Male', 'paul@example.com', FALSE),
(17, 'Quincy Cho', '010-2345-6784', '1983-07-20', 'Male', 'quincy@example.com', FALSE),
(18, 'Rachel Kang', '010-5678-9013', '1989-01-31', 'Female', 'rachel@example.com', TRUE),
(19, 'Sam Oh', '010-3456-7892', '1997-08-23', 'Male', 'sam@example.com', TRUE),
(20, 'Tom Woo', '010-4567-8903', '1992-12-12', 'Male', 'tom@example.com', FALSE);

INSERT INTO claim_types (claim_type) VALUES ('분실'), ('부분파손'), ('전체파손');

INSERT INTO claims (claim_type_idx, user_id, last_manager, last_assigned, delete_approval) VALUES
(1, 1, 1, 1, 0), (2, 2, 2, 2, 0), (3, 3, 3, 3, 1), (1, 4, 4, 4, 0),
(2, 5, 5, 5, 0), (1, 6, 6, 6, 0), (3, 7, 7, 7, 0), (2, 8, 8, 8, 0),
(3, 9, 9, 9, 0), (1, 10, 10, 10, 0), (3, 11, 11, 11, 1), 
(1, 12, 12, 12, 0), (1, 13, 13, 13, 0), (3, 14, 14, 14, 0),
(1, 15, 15, 15, 0), (1, 16, 16, 16, 0), (3, 17, 17, 17, 0),
(1, 18, 18, 18, 0), (1, 19, 19, 19, 1), (1, 20, 20, 20, 2);

INSERT INTO progresses (progress_status) VALUES ('심사접수'), ('서류접수'), ('보상심사'), ('보상승인'), ('반려'),('보상지급완료') ('통화처리');

INSERT INTO insurers (insurer_name, insurer_userid, insurer_password) VALUES
('ABC Insurance', 'abc_user', 'abc_pass123'),
('XYZ Assurance', 'xyz_user', 'xyz_pass456'),
('Global Insurers', 'global_user', 'global_pass789'),
('SafeLife Insurance', 'safe_user', 'safe_pass001'),
('Prime Insurance', 'prime_user', 'prime_pass002'),
('Trusted Insurers', 'trust_user', 'trust_pass003'),
('SecureWorld', 'secure_user', 'secure_pass004'),
('Lifeguard Assurance', 'lifeguard_user', 'lifeguard_pass005'),
('ProtectPlus', 'protect_user', 'protect_pass006'),
('Guardian Insurance', 'guardian_user', 'guardian_pass007'),
('Pinnacle Assurance', 'pinnacle_user', 'pinnacle_pass008'),
('Elite Insurance', 'elite_user', 'elite_pass009'),
('Shielded Insurers', 'shield_user', 'shield_pass010'),
('EverSafe', 'eversafe_user', 'eversafe_pass011'),
('BrightFuture Insurance', 'bright_user', 'bright_pass012'),
('Blue Shield', 'blueshield_user', 'blue_pass013'),
('CarePlus Insurance', 'careplus_user', 'care_pass014'),
('Optima Insurance', 'optima_user', 'optima_pass015'),
('Nova Insurers', 'nova_user', 'nova_pass016'),
('Horizon Insurance', 'horizon_user', 'horizon_pass017');

INSERT INTO call_histories (claim_id, manager_idx, progress_idx, manager_comment) VALUES
(1, 1, 1, '초기 심사 진행 중'),
(2, 2, 3, '보상 심사 중'),
(3, 3, 2, '서류 접수 완료'),
(4, 4, 4, '보상 완료'),
(5, 5, 5, '반려 됨'),
(6, 6, 1, '심사 접수'),
(7, 7, 2, '서류 접수 중'),
(8, 8, 3, '보상 심사 중'),
(9, 9, 4, '보상완료'),
(10, 10, 3, '보상 심사 중'),
(11, 11, 1, '심사 접수'),
(12, 12, 2, '서류 접수 중'),
(13, 13, 3, '보상 심사 중'),
(14, 14, 4, '보상 완료'),
(15, 15, 1, '심사 접수'),
(16, 16, 1, '심사 접수'),
(17, 17, 1, '심사 접수'),
(18, 18, 2, '서류 접수 완료'),
(19, 19, 3, '보상 심사 중'),
(20, 20, 2, '서류 접수 중');

INSERT INTO conversation_contents (history_id, pn, content_path) VALUES
(1, '010-1234-5678', '/conversations/history1.txt'),
(2, '010-2345-6789', '/conversations/history2.txt'),
(3, '010-3456-7890', '/conversations/history3.txt'),
(4, '010-4567-8901', '/conversations/history4.txt'),
(5, '010-5678-9012', '/conversations/history5.txt'),
(6, '010-6789-0123', '/conversations/history6.txt'),
(7, '010-7890-1234', '/conversations/history7.txt'),
(8, '010-8901-2345', '/conversations/history8.txt'),
(9, '010-9012-3456', '/conversations/history9.txt'),
(10, '010-0123-4567', '/conversations/history10.txt'),
(11, '010-6789-1234', '/conversations/history11.txt'),
(12, '010-4567-8902', '/conversations/history12.txt'),
(13, '010-3456-7891', '/conversations/history13.txt'),
(14, '010-8901-2346', '/conversations/history14.txt'),
(15, '010-9012-3457', '/conversations/history15.txt'),
(16, '010-0123-4568', '/conversations/history16.txt'),
(17, '010-2345-6789', '/conversations/history17.txt'),
(18, '010-5678-9013', '/conversations/history18.txt'),
(19, '010-3456-7892', '/conversations/history19.txt'),
(20, '010-4567-8903', '/conversations/history20.txt');

INSERT INTO required_documents (required_document_type) VALUES
('주민등록등본'), ('보상신청서'), ('개인정보 동의서'), ('통장사본'), ('수리내역서'), ('분실신고서');

INSERT INTO document_statuses (claim_id, required_document_idx, insurer_idx, submitted, reviewed, document_path, document_manager_comment, document_insurer_comment) VALUES
(1, 1, 1, TRUE, FALSE, '/docs/claim1_id.pdf', '확인', '검토완료'),
(1, 2, 1, TRUE, TRUE, '/docs/claim2_insurance.pdf', '확인', '검토완료'),
(1, 3, 1, TRUE, FALSE, '/docs/claim3_form.pdf', '확인', '검토완료'),
(1, 4, 1, TRUE, TRUE, '/docs/claim4_medical.pdf', '확인', '검토완료'),
(1, 5, 1, TRUE, FALSE, '/docs/claim5_police.pdf', '확인', '검토완료'),
(2, 1, 2, FALSE, FALSE, '/docs/claim6_estimate.pdf', '잘못된 서류(초본)', NULL),
(2, 2, 2, TRUE, TRUE, '/docs/claim7_invoice.pdf', '확인', NULL),
(2, 3, 2, TRUE, TRUE, '/docs/claim8_bank.pdf', '확인', NULL),
(2, 6, 2, TRUE, TRUE, '/docs/claim9_photos.pdf', '확인', NULL),
(3, 1, 1, TRUE, FALSE, '/docs/claim10_warranty.pdf', '확인', '승인'),
(3, 2, 1, TRUE, TRUE, '/docs/claim11_report.pdf', '확인', '승인'),
(3, 3, 1, TRUE, FALSE, '/docs/claim12_approval.pdf', '확인', '승인'),
(3, 4, 1, TRUE, TRUE, '/docs/claim13_payment.pdf', '확인', '승인'),
(3, 5, 1, FALSE, FALSE, '/docs/claim14_agreement.pdf', '확인', '승인'),
(4, 1, 3, TRUE, TRUE, '/docs/claim15_ack.pdf', '확인', '보류'),
(4, 2, 3, TRUE, FALSE, '/docs/claim16_evidence.pdf', '확인', '검토 완료'),
(4, 3, 3, TRUE, TRUE, '/docs/claim17_authorization.pdf', '확인', '검토 완료'),
(4, 4, 3, TRUE, TRUE, '/docs/claim18_legal.pdf', '확인', '검토 완료'),
(4, 5, 3, FALSE, FALSE, '/docs/claim19_additional.pdf', '확인', '검토 완료')

INSERT INTO compensation_types (compensation_type_name) VALUES
(1, 수리지원금),
(2, 대체기기지급),
(3, 상품권)

INSERT INTO compensation_processes (
    "compensation_id", "claim_id", "compensation_type_idx", "insurer_id",
    "progress_idx", "compensation_created_at", "compensation_updated_at", 
    "compensation_insurer_comment"
) VALUES
    (1, 1, 1, 1, 3, '2024-10-01 09:15:00', '2024-10-02 12:00:00', '보상 신청 접수 완료'),
    (2, 2, 2, 1, 3, '2024-10-02 11:45:00', '2024-10-03 14:00:00', '서류 검토 중'),
    (3, 3, 1, 2, 6, '2024-10-04 10:30:00', '2024-10-05 09:00:00', '보상 금액 지급 완료'),
    (4, 4, 3, 2, 5, '2024-10-05 14:00:00', '2024-10-06 16:30:00', '서류 미비로 반려'),
    (5, 5, 2, 3, 3, '2024-10-07 08:00:00', '2024-10-07 15:30:00', '')


INSERT INTO replacement_devices ("replacement_id", "compensation_id", "model_idx", "replacement_recipient_name", "replacement_contact_number", "recipient_state", "recipient_city", "recipient_address1", "recipient_address2", "recipient_post_number", "tracking_number", "delivery_status", "replacement_created_at", "replacement_updated_at") VALUES
    (1, 1, 1, '김철수', '010-1234-5678', '서울특별시', '강남구', '테헤란로 123', NULL, '06233', 'TRK001', '배송 중', '2024-01-01', '2024-01-02'),
    (2, 2, 2, '이영희', '010-2345-6789', '부산광역시', '해운대구', '해운대로 456', '101호', '48094', 'TRK002', '배송 완료', '2024-01-06', '2024-01-07'),
    (3, 3, 3, '박민수', '010-3456-7890', '대구광역시', '수성구', '수성로 789', '102호', '42050', 'TRK003', '배송 중', '2024-01-10', '2024-01-11'),
    (4, 4, 4, '정수영', '010-4567-8901', '인천광역시', '남동구', '남동대로 123', '203호', '21556', 'TRK004', '배송 대기', '2024-01-15', '2024-01-16'),
    (5, 5, 5, '최지훈', '010-5678-9012', '광주광역시', '북구', '북구로 456', '301호', '61025', 'TRK005', '배송 완료', '2024-01-20', '2024-01-21'),
    (6, 6, 6, '김지혜', '010-6789-0123', '대전광역시', '서구', '서구로 789', '401호', '35233', 'TRK006', '배송 중', '2024-01-25', '2024-01-26'),
    (7, 7, 7, '홍길동', '010-7890-1234', '울산광역시', '남구', '남구로 123', NULL, '44724', 'TRK007', '배송 완료', '2024-02-01', '2024-02-02'),
    (8, 8, 8, '오영식', '010-8901-2345', '경기도', '수원시', '수원로 456', '501호', '16455', 'TRK008', '배송 대기', '2024-02-05', '2024-02-06'),
    (9, 9, 9, '서미나', '010-9012-3456', '경상북도', '포항시', '포항로 789', '601호', '37758', 'TRK009', '배송 중', '2024-02-10', '2024-02-11'),
    (10, 10, 10, '이정민', '010-0123-4567', '제주특별자치도', '제주시', '제주로 123', '701호', '63212', 'TRK010', '배송 완료', '2024-02-15', '2024-02-16');


INSERT INTO repairment_cash ("repairment_cash_id", "compensation_id", "repairment_recipient_name", "repairment_contact_number", "repairment_amount", "bank_name", "bank_account", "transfer_status", "repairment_created_at", "repairment_updated_at") VALUES
    (1, 1, '김철수', '010-1234-5678', 50000, '우리은행', '1002-123-456789', '이체 완료', '2024-01-01', '2024-01-02'),
    (2, 2, '이영희', '010-2345-6789', 100000, '국민은행', '1234-567-890123', '이체 완료', '2024-01-06', '2024-01-07'),
    (3, 3, '박민수', '010-3456-7890', 75000, '농협은행', '352-1234-567890', '이체 대기', '2024-01-10', '2024-01-11'),
    (4, 4, '정수영', '010-4567-8901', 120000, '신한은행', '110-2345-678901', '이체 완료', '2024-01-15', '2024-01-16'),
    (5, 5, '최지훈', '010-5678-9012', 65000, '하나은행', '620-3456-789012', '이체 대기', '2024-01-20', '2024-01-21'),
    (6, 6, '김지혜', '010-6789-0123', 80000, '카카오뱅크', '3333-012-3456789', '이체 완료', '2024-01-25', '2024-01-26'),
    (7, 7, '홍길동', '010-7890-1234', 95000, '케이뱅크', '010-2345-678901', '이체 대기', '2024-02-01', '2024-02-02'),
    (8, 8, '오영식', '010-8901-2345', 70000, '우리은행', '1002-456-789012', '이체 완료', '2024-02-05', '2024-02-06'),
    (9, 9, '서미나', '010-9012-3456', 85000, '신한은행', '110-5678-901234', '이체 대기', '2024-02-10', '2024-02-11'),
    (10, 10, '이정민', '010-0123-4567', 55000, '국민은행', '1234-789-012345', '이체 완료', '2024-02-15', '2024-02-16');


INSERT INTO vouchers ("voucher_id", "compensation_id", "voucher_recipient_name", "voucher_contact_number", "voucher_type", "voucher_value", "voucher_sent_status", "voucher_created_at", "voucher_updated_at") VALUES
    (1, 1, '김철수', '010-1234-5678', '상품권', 30000, '발송 완료', '2024-01-01', '2024-01-02'),
    (2, 2, '이영희', '010-2345-6789', '상품권', 50000, '발송 대기', '2024-01-06', '2024-01-07'),
    (3, 3, '박민수', '010-3456-7890', '상품권', 40000, '발송 완료', '2024-01-10', '2024-01-11'),
    (4, 4, '정수영', '010-4567-8901', '상품권', 60000, '발송 대기', '2024-01-15', '2024-01-16'),
    (5, 5, '최지훈', '010-5678-9012', '상품권', 45000, '발송 완료', '2024-01-20', '2024-01-21'),
    (6, 6, '김지혜', '010-6789-0123', '상품권', 70000, '발송 대기', '2024-01-25', '2024-01-26'),
    (7, 7, '홍길동', '010-7890-1234', '상품권', 55000, '발송 완료', '2024-02-01', '2024-02-02'),
    (8, 8, '오영식', '010-8901-2345', '상품권', 75000, '발송 대기', '2024-02-05', '2024-02-06'),
    (9, 9, '서미나', '010-9012-3456', '상품권', 65000, '발송 완료', '2024-02-10', '2024-02-11'),
    (10, 10, '이정민', '010-0123-4567', '상품권', 35000, '발송 대기', '2024-02-15', '2024-02-16');


INSERT INTO Satisfactions ("satisfaction_id", "history_id", "overall_satisfaction", "response_time", "friendliness", "compensation_result", "customer_comment") VALUES
(1, 1, 5, NULL, NULL, NULL, 'Excellent service.'),
(2, 2, 3, 4, 2, 5, 'Had a few issues, but resolved well.'),
(3, 3, 2, 3, 2, 5, 'Service could be better.'),
(4, 4, 4, NULL, NULL, NULL, NULL),
(5, 5, 1, 1, 3, 4, 'Not satisfied with the resolution.'),
(6, 6, 5, NULL, NULL, NULL, 'Great experience.'),
(7, 7, 3, 5, 1, 3, 'Mixed feelings about the service.'),
(8, 8, 2, 2, 1, 5, 'Needs improvement.'),
(9, 9, 4, NULL, NULL, NULL, 'Satisfied with the outcome.'),
(10, 10, 1, 2, 4, 2, NULL);


-- chatbots

-- inbound_callbots

-- outbound_callbots