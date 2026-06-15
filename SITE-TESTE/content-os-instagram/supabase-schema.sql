-- Script SQL para criar as tabelas do NurseLab no Supabase
-- Execute isso no Editor SQL do Supabase (SQL Editor)

-- Habilitar extensão UUID se não estiver habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de posts (nl_posts)
CREATE TABLE IF NOT EXISTS nl_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  caption TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('Carrossel', 'Reel', 'Story', 'Post único')),
  status VARCHAR(50) NOT NULL CHECK (status IN ('Publicado', 'Agendado', 'Rascunho', 'Backlog')),
  date DATE NOT NULL,
  img VARCHAR(50) NOT NULL CHECK (img IN ('none', 'freepik', 'ai')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de concorrentes (nl_comps)
CREATE TABLE IF NOT EXISTS nl_comps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  handle VARCHAR(100) NOT NULL UNIQUE,
  seg VARCHAR(255),
  eng VARCHAR(255),
  freq INTEGER DEFAULT 0,
  trend VARCHAR(50),
  nicho VARCHAR(255),
  cor VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_nl_posts_date ON nl_posts(date);
CREATE INDEX IF NOT EXISTS idx_nl_posts_status ON nl_posts(status);
CREATE INDEX IF NOT EXISTS idx_nl_comps_handle ON nl_comps(handle);

-- Row Level Security (RLS) - Políticas
ALTER TABLE nl_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE nl_comps ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir todas as operações (ajuste conforme sua segurança)
CREATE POLICY "Allow all operations for authenticated users" ON nl_posts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON nl_comps
  FOR ALL USING (auth.role() = 'authenticated');

-- Políticas alternativas se quiser acesso público (para demo):
-- CREATE POLICY "Allow all operations for anon users" ON nl_posts
--   FOR ALL USING (true);
-- CREATE POLICY "Allow all operations for anon users" ON nl_comps
--   FOR ALL USING (true);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_nl_posts_updated_at
  BEFORE UPDATE ON nl_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nl_comps_updated_at
  BEFORE UPDATE ON nl_comps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comentários nas tabelas
COMMENT ON TABLE nl_posts IS 'Posts do Content OS Instagram - NurseLab';
COMMENT ON TABLE nl_comps IS 'Concorrentes monitorados - NurseLab';