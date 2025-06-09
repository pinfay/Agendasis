# AgendaSis - Sistema de Agendamento para Barbearias

## 📋 Sobre o Projeto

AgendaSis é uma aplicação web moderna para gerenciamento de agendamentos em barbearias. O sistema permite que clientes agendem horários com seus barbeiros preferidos, enquanto oferece ferramentas de gestão para proprietários e profissionais.

### 🚀 Funcionalidades Principais

- Agendamento online de serviços
- Dashboard para diferentes tipos de usuários (Admin, Proprietário, Barbeiro, Cliente)
- Gestão de serviços e preços
- Sistema de avaliações
- Perfis personalizados
- Tutorial de onboarding para novos usuários

## 🛠️ Tecnologias Utilizadas

### Frontend
- React.js com TypeScript
- React Router para navegação
- Tailwind CSS para estilização
- React Hot Toast para notificações

### Backend
- Node.js
- Prisma como ORM
- Sistema de autenticação seguro
- API RESTful

## 📦 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Banco de dados PostgreSQL

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/agendasis.git
cd agendasis
```

2. Instale as dependências do servidor
```bash
cd server
npm install
```

3. Instale as dependências do cliente
```bash
cd client
npm install
```

4. Configure as variáveis de ambiente
- Crie um arquivo .env na raiz do projeto server
- Copie o conteúdo de .env.example e preencha com suas configurações

5. Execute as migrações do banco de dados
```bash
cd server
npx prisma migrate dev
```

## 🚀 Executando o Projeto

1. Inicie o servidor
```bash
cd server
npm run dev
```

2. Inicie o cliente
```bash
cd client
npm run dev
```

## 👥 Tipos de Usuários

- **Admin**: Acesso total ao sistema
- **Proprietário**: Gestão da barbearia
- **Barbeiro**: Gestão de agenda e clientes
- **Cliente**: Agendamento de serviços

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, envie um email para [seu-email@exemplo.com] 