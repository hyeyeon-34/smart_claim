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

INSERT INTO progresses (progress_status) VALUES ('심사접수'), ('서류접수'), ('보상심사'), ('보상완료'), ('반려'), ('통화처리');

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

-- INSERT INTO compensation_types (compensation_type_name) VALUES
-- (),(), ...

-- INSERT INTO compensation_processes (claim_id, compensation_type_idx, insurer_id, compensation_status, compensation_insurer_comment) VALUES
-- (), (), ...



-- satisfactions

-- repairment_cash

-- replacement_devices

-- vouchers



-- chatbots

-- inbound_callbots

-- outbound_callbots