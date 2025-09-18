CREATE TYPE roles AS ENUM ('admin', 'user');
CREATE TYPE stances AS ENUM ('orthodox', 'southpaw', 'switch');
CREATE TYPE weight_class AS ENUM (
    'flyweight', 'bantamweight', 'featherweight', 'lightweight', 
    'welterweight', 'middleweight', 'light heavyweight', 
    'heavyweight', 'women\ s division'
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name_user VARCHAR(130) NOT NULL,
    email_user VARCHAR(150) NOT NULL UNIQUE,
    password_user VARCHAR(255) NOT NULL,
    username_user VARCHAR(150) NOT NULL UNIQUE,
    rol_user roles DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE session_users (
    id SERIAL PRIMARY KEY,
    user_id INT,
    is_active BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
);

CREATE TABLE fighters (
    id SERIAL PRIMARY KEY,
    name_fighter VARCHAR(145) NOT NULL,
    nickname_fighter VARCHAR(145),
    age_fighter INT,
    weight_fighter DECIMAL(5,2) NOT NULL,
    height_fighter DECIMAL(4,2) NOT NULL,
    stance_fighter stances DEFAULT 'orthodox',
    country_fighter VARCHAR(170),
    is_favorite BOOLEAN DEFAULT FALSE,
    is_blocked BOOLEAN DEFAULT FALSE,
    is_champion BOOLEAN DEFAULT FALSE,
    image_fighter VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla intermedia para la relación muchos a muchos entre users y fighters (favoritos)
CREATE TABLE fighters_users(
	fighter_id INT,
	user_id INT,
	is_favorite BOOLEAN DEFAULT FALSE,
	PRIMARY KEY(fighter_id,user_id),
	FOREIGN KEY(fighter_id) REFERENCES fighters(id) ON DELETE CASCADE,
	FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de equipos
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name_team VARCHAR(165) NOT NULL,
);

-- Tabla intermedia para la relación muchos a muchos entre fighters y teams
CREATE TABLE fighters_teams (
    fighter_id INT,
    team_id INT,
    PRIMARY KEY (fighter_id, team_id),
    FOREIGN KEY (fighter_id) REFERENCES fighters(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Tabla de categorias
CREATE TABLE weight_categories (
    id SERIAL PRIMARY KEY,
    name_category weight_class NOT NULL,
);

-- Tabla intermedia para la relación muchos a muchos entre fighters y weight_categories
CREATE TABLE fighters_weight_categories (
    fighter_id INT,
    category_id INT,
    PRIMARY KEY (fighter_id, category_id),
    FOREIGN KEY (fighter_id) REFERENCES fighters(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES weight_categories(id) ON DELETE CASCADE
);

-- Tabla intermedia para la relación muchos a muchos entre fighters y fights
CREATE TABLE fights (
    event_id INT,
    fighter_red_id INT,
    fighter_blue_id INT,
    fight_order INT NOT NULL,
    PRIMARY KEY(event_id, fighter_red_id, fighter_blue_id),
    is_title_fight BOOLEAN DEFAULT FALSE,
    is_main_event BOOLEAN DEFAULT FALSE,
    is_co_main_event BOOLEAN DEFAULT FALSE,
    winner_fighter VARCHAR(10) CHECK (winner IN ('red', 'blue', 'draw', 'no contest')),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (fighter_red_id) REFERENCES fighters(id) ON DELETE CASCADE,
    FOREIGN KEY (fighter_blue_id) REFERENCES fighters(id) ON DELETE CASCADE
);

-- tabla intermedia para la relación uno a uno entre fighters y estadisticas del luchador
CREATE TABLE stadistics_fighters (
    id SERIAL PRIMARY KEY,
    fighter_id INT,
    streak_fighter VARCHAR(175) NOT NULL,
    ranking_fighter INT NOT NULL,
    precission_strike_fighter DECIMAL(5,2) NOT NULL,
    precission_takedown_fighter DECIMAL(5,2) NOT NULL,
    date_debut_fighter DATE NOT NULL,
    last_fight_fighter DATE,
    knockout_wins_fighter INT DEFAULT 0,
    submission_wins_fighter INT DEFAULT 0,
    decision_wins_fighter INT DEFAULT 0,
    title_wins_fighter INT DEFAULT 0,
    is_winning_ BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (fighter_id) REFERENCES fighters(id) ON DELETE CASCADE
)

-- tabla de eventos
CREATE TABLE events (
    id SERAIL PRIMARY KEY,
    name_event VARCHAR(175) NOT NULL,
    location_event VARCHAR(175) NOT NULL,
    venue_event VARCHAR(175) NOT NULL,
    date_event DATE NOT NULL,
    country_event VARCHAR(170),
    image_event VARCHAR(255),
);

-- tabla de leyendas de UFC
CREATE TABLE legends_fighters (
    id SERIAL PRIMARY KEY,
    name_legend VARCHAR(175) NOT NULL,
    nickname_legend VARCHAR(175),
    image_legend VARCHAR(255),
    weight_legend DECIMAL(5,2) NOT NULL,
    height_legend DECIMAL(4,2) NOT NULL,
    stance_legend stances DEFAULT 'orthodox',
    country_legend VARCHAR(170),
    streak_legend VARCHAR(175) NOT NULL,
    title_win_legend INT DEFAULT 0,
    trophys_legend INT DEFAULT 0,
    description_legend TEXT,
    date_debut_legend DATE NOT NULL,
    date_retirement_legend DATE,
    period_active_legend VARCHAR(100)
);

-- Tabla intermedia para la relación muchos a muchos entre legends_fighters y users
CREATE TABLE legends_users (
    legend_id INT,
    user_id INT,
    is_favorite BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (legend_id, user_id),
    FOREIGN KEY (legend_id) REFERENCES legends_fighters(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- tabla de noticias
CREATE TABLE notices (
    id SERIAL PRIMARY KEY,
    title_notice VARCHAR(200) NOT NULL,
    content_notice TEXT NOT NULL,
    image_notice VARCHAR(255),
    video_notice VARCHAR(255),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);