CREATE TABLE phone_models (
    model_idx SERIAL PRIMARY KEY,
    model_name VARCHAR(100) NOT NULL
);

CREATE TABLE chatbots (
    chatbot_id SERIAL PRIMARY KEY,
    chatbot_content TEXT
);

CREATE TABLE claim_types (
    claim_type_idx SERIAL PRIMARY KEY,
    claim_type VARCHAR(100) NOT NULL
);

CREATE TABLE managers (
    manager_idx SERIAL PRIMARY KEY,
    position_idx INT NOT NULL,
    manager_username VARCHAR(100) NOT NULL,
    birthdate DATE,
    manager_userid VARCHAR(100) NOT NULL,
    manager_password VARCHAR(255) NOT NULL
);

CREATE TABLE positions (
    position_idx SERIAL PRIMARY KEY,
    position_name VARCHAR(100) NOT NULL
);

CREATE TABLE outbound_callbots (
    out_callbot_id SERIAL PRIMARY KEY,
    history_id INT NOT NULL,
    out_callbot_content TEXT,
    user_pn VARCHAR(20)
);

CREATE TABLE satisfactions (
    satisfaction_id SERIAL PRIMARY KEY,
    history_id INT NOT NULL,
    overall_satisfaction INT,
    response_time INT,
    friendliness INT,
    compensation_result INT,
    customer_comment TEXT
);

CREATE TABLE claims (
    claim_id SERIAL PRIMARY KEY,
    claim_type_idx INT NOT NULL,
    user_id INT NOT NULL,
    last_manager INT,
    last_assigned INT,
    delete_approval INT DEFAULT 0
);

CREATE TABLE progresses (
    progress_idx SERIAL PRIMARY KEY,
    progress_status VARCHAR(100) NOT NULL
);

CREATE TABLE document_statuses (
    document_status_id SERIAL PRIMARY KEY,
    claim_id INT NOT NULL,
    required_document_idx INT NOT NULL,
    insurer_idx INT NOT NULL,
    submitted BOOLEAN NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed BOOLEAN NOT NULL,
    reviewed_at TIMESTAMP,
    document_path VARCHAR(255),
    document_manager_comment TEXT,
    document_insurer_comment TEXT
);

CREATE TABLE required_documents (
    required_document_idx SERIAL PRIMARY KEY,
    required_document_type VARCHAR(100) NOT NULL
);

CREATE TABLE call_histories (
    history_id SERIAL PRIMARY KEY,
    claim_id INT NOT NULL,
    manager_idx INT NOT NULL,
    progress_idx INT NOT NULL,
    manager_comment TEXT,
    history_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE insurers (
    insurer_id SERIAL PRIMARY KEY,
    insurer_name VARCHAR(100) NOT NULL,
    insurer_userid VARCHAR(100),
    insurer_password VARCHAR(255)
);

CREATE TABLE conversation_contents (
    content_id SERIAL PRIMARY KEY,
    history_id INT NOT NULL,
    pn VARCHAR(20),
    content_path VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    model_idx INT NOT NULL,
    username VARCHAR(100) NOT NULL,
    user_pn VARCHAR(20) NOT NULL UNIQUE,
    birthdate DATE,
    gender VARCHAR(10),
    insurance_start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    insurance_expiration_date DATE GENERATED ALWAYS AS (insurance_start_date + INTERVAL '2 years') STORED,
    email VARCHAR(100) NOT NULL,
    cancellation_status BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE replacement_devices (
    replacement_id SERIAL PRIMARY KEY,
    compensation_id INT NOT NULL,
    model_idx INT NOT NULL,
    replacement_recipient_name VARCHAR(100) NOT NULL,
    replacement_contact_number VARCHAR(20) NOT NULL,
    recipient_state VARCHAR(100) NOT NULL,
    recipient_city VARCHAR(100) NOT NULL,
    recipient_address1 VARCHAR(255) NOT NULL,
    recipient_address2 VARCHAR(255),
    recipient_post_number VARCHAR(10) NOT NULL,
    tracking_number VARCHAR(50) NOT NULL,
    delivery_satus VARCHAR(50),
    replacement_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    replacement_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE repairment_cash (
    repairment_cash_id SERIAL PRIMARY KEY,
    compensation_id INT NOT NULL,
    repairment_recipient_name VARCHAR(100) NOT NULL,
    repairment_contact_number VARCHAR(20) NOT NULL,
    repairment_amount DECIMAL(10, 2) NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    bank_account VARCHAR(50) NOT NULL,
    transfer_status VARCHAR(50) NOT NULL,
    repairment_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    repairment_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vouchers (
    voucher_id SERIAL PRIMARY KEY,
    compensation_id INT NOT NULL,
    voucher_recipient_name VARCHAR(100) NOT NULL,
    voucher_contact_number VARCHAR(20) NOT NULL,
    voucher_type VARCHAR(50) NOT NULL,
    voucher_value DECIMAL(10, 2) NOT NULL,
    voucher_sent_status VARCHAR(50) NOT NULL,
    voucher_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    voucher_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE compensation_processes (
    compensation_id SERIAL PRIMARY KEY,
    claim_id INT NOT NULL,
    compensation_type_idx INT NOT NULL,
    insurer_id INT NOT NULL,
    compensation_status VARCHAR(50) NOT NULL,
    compensation_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    compensation_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    compensation_insurer_comment TEXT
);

CREATE TABLE compensation_types (
    compensation_type_idx SERIAL PRIMARY KEY,
    compensation_type_name VARCHAR(100) NOT NULL
);

CREATE TABLE inbound_callbots (
    in_callbot_id SERIAL PRIMARY KEY,
    in_callbot_content TEXT,
    pn VARCHAR(20)
);




-- Foreign Key Constraints

ALTER TABLE managers 
ADD CONSTRAINT fk_position_to_managers 
FOREIGN KEY (position_idx) REFERENCES positions (position_idx);

ALTER TABLE claims 
ADD CONSTRAINT fk_claim_type_to_claims 
FOREIGN KEY (claim_type_idx) REFERENCES claim_types (claim_type_idx);

ALTER TABLE claims 
ADD CONSTRAINT fk_users_to_claims 
FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE document_statuses 
ADD CONSTRAINT fk_claims_to_document_statuses 
FOREIGN KEY (claim_id) REFERENCES claims (claim_id);

ALTER TABLE document_statuses 
ADD CONSTRAINT fk_required_documents_to_document_statuses 
FOREIGN KEY (required_document_idx) REFERENCES required_documents (required_document_idx);

ALTER TABLE document_statuses 
ADD CONSTRAINT fk_insurers_to_document_statuses 
FOREIGN KEY (insurer_idx) REFERENCES insurers (insurer_id);

ALTER TABLE call_histories 
ADD CONSTRAINT fk_claims_to_call_histories 
FOREIGN KEY (claim_id) REFERENCES claims (claim_id);

ALTER TABLE call_histories 
ADD CONSTRAINT fk_managers_to_call_histories 
FOREIGN KEY (manager_idx) REFERENCES managers (manager_idx);

ALTER TABLE call_histories 
ADD CONSTRAINT fk_progresses_to_call_histories 
FOREIGN KEY (progress_idx) REFERENCES progresses (progress_idx);

ALTER TABLE conversation_contents 
ADD CONSTRAINT fk_call_histories_to_conversation_contents 
FOREIGN KEY (history_id) REFERENCES call_histories (history_id);

ALTER TABLE users 
ADD CONSTRAINT fk_phone_models_to_users 
FOREIGN KEY (model_idx) REFERENCES phone_models (model_idx);

ALTER TABLE replacement_devices 
ADD CONSTRAINT fk_compensation_processes_to_replacement_devices 
FOREIGN KEY (compensation_id) REFERENCES compensation_processes (compensation_id);

ALTER TABLE replacement_devices 
ADD CONSTRAINT fk_phone_models_to_replacement_devices 
FOREIGN KEY (model_idx) REFERENCES phone_models (model_idx);

ALTER TABLE repairment_cash 
ADD CONSTRAINT fk_compensation_processes_to_repairment_cash 
FOREIGN KEY (compensation_id) REFERENCES compensation_processes (compensation_id);

ALTER TABLE vouchers 
ADD CONSTRAINT fk_compensation_processes_to_vouchers 
FOREIGN KEY (compensation_id) REFERENCES compensation_processes (compensation_id);

ALTER TABLE compensation_processes 
ADD CONSTRAINT fk_claims_to_compensation_processes 
FOREIGN KEY (claim_id) REFERENCES claims (claim_id);

ALTER TABLE compensation_processes 
ADD CONSTRAINT fk_compensation_types_to_compensation_processes 
FOREIGN KEY (compensation_type_idx) REFERENCES compensation_types (compensation_type_idx);

ALTER TABLE compensation_processes 
ADD CONSTRAINT fk_insurers_to_compensation_processes 
FOREIGN KEY (insurer_id) REFERENCES insurers (insurer_id);


