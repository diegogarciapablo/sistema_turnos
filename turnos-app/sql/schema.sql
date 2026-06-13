CREATE TABLE turnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    profesional_id INT NOT NULL,
    servicio_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado ENUM('pendiente','confirmado','cancelado') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (profesional_id) REFERENCES profesionales(id),
    FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);