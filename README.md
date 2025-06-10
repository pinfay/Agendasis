# AgendaSis - Sistema de Agendamento para Barbearias

## 📋 Sobre o Projeto

AgendaSis é uma plataforma moderna e intuitiva para gerenciamento de barbearias. O sistema oferece funcionalidades completas para agendamento de serviços, gestão de barbeiros, controle de clientes e muito mais.

### 🌟 Principais Funcionalidades

- **Agendamentos**
  - Marcação de horários online
  - Confirmação automática
  - Lembretes de compromissos
  - Cancelamento flexível

- **Gestão de Barbeiros**
  - Perfil profissional
  - Controle de agenda
  - Especialidades
  - Avaliações de clientes

- **Sistema de Fidelidade**
  - Pontos por visita
  - Programa de recompensas
  - Histórico de pontos
  - Benefícios exclusivos

- **Gestão Administrativa**
  - Dashboard completo
  - Relatórios gerenciais
  - Controle financeiro
  - Gestão de usuários

## 🚀 Tecnologias Utilizadas

### Frontend
- React.js com TypeScript
- Vite
- TailwindCSS
- React Router DOM
- Axios
- React Hot Toast

### Backend
- Node.js com TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- BCrypt

## 📦 Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL (v16)
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/agendasis.git
cd agendasis
```

2. **Instale as dependências do servidor**
```bash
cd server
npm install
```

3. **Configure as variáveis de ambiente do servidor**
```bash
# Crie um arquivo .env na pasta server com:
DATABASE_URL="postgresql://postgres:admin@localhost:5432/agendasis_db"
JWT_SECRET="seu-secret-aqui"
```

4. **Execute as migrações do banco de dados**
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. **Instale as dependências do cliente**
```bash
cd ../client
npm install
```

6. **Configure as variáveis de ambiente do cliente**
```bash
# Crie um arquivo .env na pasta client com:
VITE_API_URL="http://localhost:5000"
```

## 🚀 Executando o Projeto

1. **Inicie o servidor**
```bash
cd server
npm run dev
```

2. **Inicie o cliente**
```bash
cd client
npm run dev
```

O servidor estará rodando em `http://localhost:5000` e o cliente em `http://localhost:5173`

## 👥 Níveis de Acesso

- **ADMIN**: Acesso total ao sistema
- **OWNER**: Proprietário da barbearia
- **BARBER**: Profissionais barbeiros
- **CLIENT**: Clientes da barbearia

## 📱 Funcionalidades por Perfil

### Administrador
- Gestão completa de usuários
- Configurações do sistema
- Relatórios gerenciais
- Gestão de barbearias

### Proprietário
- Gestão de barbeiros
- Relatórios financeiros
- Configurações da barbearia
- Gestão de serviços

### Barbeiro
- Visualização de agenda
- Gestão de horários
- Perfil profissional
- Histórico de atendimentos

### Cliente
- Agendamento de serviços
- Histórico de visitas
- Sistema de pontos
- Avaliações

## 🔄 Atualizações Futuras

- [ ] Integração com WhatsApp
- [ ] Aplicativo mobile
- [ ] Sistema de comissões
- [ ] Módulo de marketing
- [ ] Integração com meios de pagamento
- [ ] Dashboard analítico
- [ ] Sistema de notificações push

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@agendasis.com ou abra uma issue no repositório.

---

Desenvolvido com ❤️ pela equipe AgendaSis 