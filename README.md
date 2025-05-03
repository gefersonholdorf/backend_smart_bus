# 🚍 Sistema de Transporte Escolar Inteligente - SmartBus

Um sistema completo para gestão de transporte escolar, focado em **segurança**, **transparência** e **eficiência**, desenvolvido com NestJS e MySQL.

---

## 📌 Visão Geral

Este projeto visa digitalizar o controle do transporte escolar municipal, permitindo que prefeituras, motoristas, responsáveis e alunos tenham acesso a uma plataforma moderna e intuitiva.

Principais recursos:

- Cadastro e gerenciamento de alunos, rotas, veículos e motoristas
- Rastreamento de ônibus em tempo real
- Check-in e check-out de alunos com QR Code/NFC
- Painel de acompanhamento para pais e secretarias
- Controle de manutenções preventivas

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [MySQL](https://www.mysql.com/)
- [TypeORM](https://typeorm.io/)
- [JWT](https://jwt.io/)
- [Google Maps API](https://developers.google.com/maps) ou [OpenStreetMap](https://www.openstreetmap.org/)
- [Docker](https://www.docker.com/) (opcional)
- [Firebase](https://firebase.google.com/) (para notificações)

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/transporte-escolar-inteligente.git

# Acesse o diretório do projeto
cd transporte-escolar-inteligente

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais do banco e chave JWT

# Inicie o projeto
npm run start:dev
📂 Estrutura do Projeto
bash
Copiar
Editar
src/
├── auth/               # Autenticação e segurança
├── users/              # Cadastro e controle de usuários
├── students/           # Gestão dos alunos
├── drivers/            # Motoristas e veículos
├── routes/             # Rotas e vinculação de alunos
├── checkins/           # Presença, embarque e desembarque
├── maintenance/        # Controle de manutenção dos veículos
└── shared/             # DTOs, guards, interceptors etc.
📋 Funcionalidades
✅ Cadastro de alunos, motoristas e responsáveis

✅ Atribuição de rotas e veículos

✅ Check-in e check-out com geolocalização

✅ Visualização de trajeto em tempo real

✅ Notificações de presença e atraso

✅ Dashboard administrativo completo

🧪 Testes
Para rodar os testes unitários e e2e:

bash
Copiar
Editar
# Testes unitários
npm run test

# Testes end-to-end
npm run test:e2e
💼 Casos de Uso
Pais recebem notificação quando o filho entra no transporte.

Secretaria visualiza em tempo real a localização de todos os ônibus.

Sistema dispara alerta de manutenção programada baseada na quilometragem.

Motorista realiza check-in dos alunos com leitor de QR Code.

