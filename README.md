# Agendasis - Sistema de Agendamentos

Sistema de agendamentos completo desenvolvido com Node.js, Express, Prisma ORM e PostgreSQL.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Docker
- JWT
- Google Calendar API
- MercadoPago API
- Nodemailer
- Web Push
- Swagger

## 📋 Pré-requisitos

- Node.js >= 18
- Docker e Docker Compose
- PostgreSQL (ou usar via Docker)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/agendasis.git
cd agendasis
```

2. Copie o arquivo de exemplo de variáveis de ambiente:
```bash
cp .env.example .env
```

3. Configure as variáveis de ambiente no arquivo `.env`

4. Instale as dependências:
```bash
npm install
```

5. Execute o projeto com Docker:
```bash
docker-compose up -d
```

Ou execute localmente:
```bash
# Gerar cliente Prisma
npm run prisma:generate

# Executar migrações
npm run prisma:migrate

# Iniciar em desenvolvimento
npm run dev
```

## 📚 Documentação

A documentação da API está disponível em:
- Local: http://localhost:3000/api-docs

## 🛠️ Principais Funcionalidades

- Autenticação com JWT
  - Login
  - Registro
  - Recuperação de senha
  - Login com Google

- Usuários
  - CRUD completo
  - Perfis (admin e cliente)
  - Configurações personalizadas

- Agendamentos
  - Criação
  - Consulta
  - Atualização
  - Cancelamento
  - Integração com Google Calendar

- Serviços
  - Cadastro
  - Listagem
  - Atualização
  - Desativação

- Notificações
  - E-mails transacionais
  - Push notifications
  - Lembretes de agendamento

- Pagamentos
  - Integração com MercadoPago
  - Pagamento via PIX
  - Webhook para confirmação

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar testes com coverage
npm run test:coverage
```

## 📦 Deploy

O projeto está configurado para deploy em:
- Heroku
- Render
- Railway

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request 

## Sistema de Pagamento

O Agendasis utiliza um sistema de pagamento via PIX para processar os pagamentos dos agendamentos. O sistema foi projetado para ser simples e seguro, permitindo uma fácil integração com diferentes provedores de pagamento no futuro.

### Funcionalidades

- Geração de código PIX para pagamento
- QR Code para pagamento via PIX
- Confirmação automática de pagamento
- Sistema de reembolso
- Notificações por email
- Modo de simulação para desenvolvimento

### Endpoints da API

#### 1. Criar Pagamento PIX
```http
POST /api/payments/pix
```

**Corpo da Requisição:**
```json
{
  "appointmentId": "uuid",
  "amount": 100.00,
  "description": "Corte de Cabelo"
}
```

**Resposta:**
```json
{
  "paymentId": "uuid",
  "pixQrCode": "base64-qrcode",
  "status": "PENDING",
  "expiresAt": "2024-03-21T10:00:00Z"
}
```

#### 2. Verificar Status do Pagamento
```http
GET /api/payments/:paymentId/status
```

**Resposta:**
```json
{
  "status": "PENDING" | "PAID" | "FAILED" | "REFUNDED"
}
```

#### 3. Processar Reembolso (Apenas Admin)
```http
POST /api/payments/:paymentId/refund
```

**Corpo da Requisição:**
```json
{
  "amount": 100.00,
  "reason": "Cancelamento do agendamento"
}
```

#### 4. Simular Pagamento (Apenas em Desenvolvimento)
```http
POST /api/payments/:paymentId/simulate
```

### Configuração

1. Configure as variáveis de ambiente no arquivo `.env`:
```env
# Email (Gmail)
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASS="sua-senha-de-app"

# PIX Settings
PIX_KEY="sua-chave-pix"
MERCHANT_NAME="Nome do Estabelecimento"
MERCHANT_CITY="Cidade"
```

2. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

### Fluxo de Pagamento

1. Cliente cria um agendamento
2. Sistema gera um código PIX
3. Cliente recebe instruções por email
4. Cliente realiza o pagamento
5. Sistema confirma o pagamento
6. Agendamento é confirmado
7. Cliente e estabelecimento recebem confirmação

### Desenvolvimento

Para testar o sistema de pagamento em ambiente de desenvolvimento:

1. Configure `NODE_ENV=development` no `.env`
2. Use o endpoint de simulação para testar confirmações de pagamento
3. Monitore os logs para debug
4. Verifique os emails enviados

### Segurança

- Todas as rotas requerem autenticação
- Reembolsos só podem ser processados por administradores
- Dados sensíveis são armazenados de forma segura
- Logs detalhados para auditoria

### Próximos Passos

- [ ] Integração com provedores de pagamento
- [ ] Suporte a múltiplas chaves PIX
- [ ] Dashboard de transações
- [ ] Relatórios financeiros
- [ ] Sistema de split de pagamentos 